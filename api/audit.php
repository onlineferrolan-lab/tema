<?php
/**
 * audit.php — Endpoint de auditoría del catálogo y pedidos de Ferrolan.
 *
 * Patrón: PHP plano + PDO readonly, mismo estilo que catalog_api.php y api/encimeras.php.
 *
 * Despliegue:
 *   Subir a /api/audit.php en la raíz de Prestashop (junto a encimeras.php).
 *   Requiere config.php con credenciales BD (mismo que usa encimeras.php).
 *
 * Auth:
 *   Header obligatorio "Authorization: Bearer <token>".
 *
 * Acciones:
 *   GET ?action=list_checks
 *   GET ?action=audit&check=<nombre>
 *   GET ?action=inventory&item=<nombre>
 *   GET ?action=image_urls&shop=<id>
 *
 * El endpoint NUNCA ejecuta DELETE/UPDATE. Solo SELECT readonly.
 */

declare(strict_types=1);

// ============================================================
//  CONFIGURACIÓN
// ============================================================

/** Token compartido. Mismo que catalog_api.php. */
const AUDIT_TOKEN = 'frl_cat_2026_xK9mP';

/** Prefijo de tabla Prestashop. */
const DB_PREFIX = 'ps_';

/** Idioma principal (castellano). */
const ID_LANG = 1;

/** Shops a auditar de forma cruzada. */
const SHOPS = [1, 2];

/** Fichero de log (ruta absoluta). Si no es escribible, se cae a sys_get_temp_dir(). */
const LOG_FILE = '/var/log/ferrolan_audit.log';

/**
 * IDs descubiertos por inventory que las queries usan como placeholder.
 *
 * RELLENAR tras ejecutar GET ?action=inventory&item=...
 *
 * Mientras estén vacíos, los checks que dependan de ellos devolverán
 * 503 con un mensaje claro indicando qué inventory ejecutar.
 */
$AUDIT_CONFIG = [
    // ID de la feature "Colección" (ps_feature). Inventory: feature_coleccion.
    'feature_coleccion_id' => null,

    // IDs de categorías cerámicas (porcelánico, gres, mosaico, revestimiento, pavimento).
    // Inventory: ceramic_categories.
    'ceramic_category_ids' => [],

    // IDs de estados de pedido considerados finales (entregado, cancelado, devuelto)
    // — los excluimos del check de "stuck_orders". Inventory: order_states.
    'final_order_state_ids' => [],

    // ID del tax_rules_group del IVA reducido (10%). 21% se asume id=1.
    // Inventory: tax_rules_groups.
    'iva_reducido_id' => null,

    // ID del carrier de "recogida en tienda" (excluido de oversize_no_carrier_compatible).
    // Inventory: carriers.
    'recogida_carrier_id' => 38,

    // Política de out_of_stock_orderable: qué valores de ps_stock_available.out_of_stock
    // se consideran riesgo. 0 = denegar, 1 = aceptar, 2 = config global.
    'out_of_stock_riesgo' => [1, 2],

    // Categorías de "Ofertas" para el check specific_price_not_in_offers.
    'ofertas_category_ids' => [3555, 7380],
];

// ============================================================
//  CARGA DE CONFIG.PHP (credenciales BD)
// ============================================================

/**
 * Espera que config.php defina las constantes/variables de conexión.
 * Adaptar este bloque al formato real de vuestro config.php.
 */
$config_paths = [
    __DIR__ . '/config.php',
    __DIR__ . '/../config.php',
    dirname(__DIR__) . '/config.php',
];
$config_loaded = false;
foreach ($config_paths as $cp) {
    if (is_file($cp)) {
        require_once $cp;
        $config_loaded = true;
        break;
    }
}
if (!$config_loaded) {
    audit_fail(500, 'config.php no encontrado en rutas esperadas');
}

// Resolver credenciales con tolerancia a varios nombres habituales.
$db_host = $GLOBALS['db_host'] ?? $GLOBALS['DB_HOST'] ?? (defined('DB_HOST') ? DB_HOST : null);
$db_name = $GLOBALS['db_name'] ?? $GLOBALS['DB_NAME'] ?? (defined('DB_NAME') ? DB_NAME : null);
$db_user = $GLOBALS['db_user'] ?? $GLOBALS['DB_USER'] ?? (defined('DB_USER') ? DB_USER : null);
$db_pass = $GLOBALS['db_pass'] ?? $GLOBALS['DB_PASS'] ?? (defined('DB_PASS') ? DB_PASS : null);

if (!$db_host || !$db_name || !$db_user || $db_pass === null) {
    audit_fail(500, 'Credenciales BD no resueltas desde config.php — ajustar bloque de carga');
}

// ============================================================
//  AUTH + CABECERAS
// ============================================================

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

$auth_header = $_SERVER['HTTP_AUTHORIZATION']
    ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
    ?? '';
if (!preg_match('/^Bearer\s+(.+)$/i', trim($auth_header), $m) || !hash_equals(AUDIT_TOKEN, $m[1])) {
    audit_fail(403, 'Forbidden');
}

// ============================================================
//  CONEXIÓN PDO
// ============================================================

try {
    $pdo = new PDO(
        "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (Throwable $e) {
    audit_fail(500, 'Error de conexión BD');
}

// ============================================================
//  CATÁLOGO DE CHECKS
//
//  Cada entrada:
//    severity:    critical | warning | info
//    frequency:   daily | weekly | monthly
//    description: para list_checks y para el informe
//    sql:         SELECT readonly. Puede contener placeholders {{KEY}}
//                 que se sustituyen desde $AUDIT_CONFIG con cast estricto.
//    requires:    array de claves de $AUDIT_CONFIG que deben estar pobladas
//                 antes de poder ejecutar el check.
// ============================================================

$P = DB_PREFIX;
$L = ID_LANG;
$SHOPS_CSV = implode(',', SHOPS);

$CHECKS = [

    // ---------- DIARIOS ----------

    'zero_price' => [
        'severity' => 'critical',
        'frequency' => 'daily',
        'description' => 'Productos activos a 0€ con show_price=1',
        'sql' => "
            SELECT
              ps.id_shop, p.id_product, p.reference, pl.name, ps.price
            FROM {$P}product p
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop IN ({$SHOPS_CSV})
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_shop = ps.id_shop AND pl.id_lang = {$L}
            WHERE ps.price = 0 AND ps.show_price = 1 AND ps.active = 1
            ORDER BY ps.id_shop, p.id_product
        ",
    ],

    'margin_loss' => [
        'severity' => 'critical',
        'frequency' => 'daily',
        'description' => 'Productos donde el precio de venta no cubre el coste (wholesale_price >= price)',
        'sql' => "
            SELECT
              ps.id_shop, p.id_product, p.reference, pl.name,
              p.wholesale_price, ps.price,
              ROUND((ps.price - p.wholesale_price), 2) AS margen_eur
            FROM {$P}product p
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop IN ({$SHOPS_CSV})
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_shop = ps.id_shop AND pl.id_lang = {$L}
            WHERE p.wholesale_price > 0
              AND ps.price > 0
              AND p.wholesale_price >= ps.price
              AND ps.active = 1
            ORDER BY ps.id_shop, (ps.price - p.wholesale_price) ASC
        ",
    ],

    'negative_stock' => [
        'severity' => 'critical',
        'frequency' => 'daily',
        'description' => 'Stock negativo en cualquier shop',
        'sql' => "
            SELECT
              sa.id_shop, p.id_product, p.reference, pl.name, sa.quantity
            FROM {$P}product p
            JOIN {$P}stock_available sa ON p.id_product = sa.id_product AND sa.id_shop IN ({$SHOPS_CSV})
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_shop = sa.id_shop AND pl.id_lang = {$L}
            WHERE sa.quantity < 0
            ORDER BY sa.id_shop, sa.quantity ASC
        ",
    ],

    'out_of_stock_orderable' => [
        'severity' => 'critical',
        'frequency' => 'daily',
        'description' => 'Productos sin stock que aún aceptan pedidos (out_of_stock IN (1,2))',
        'sql' => "
            SELECT
              sa.id_shop, p.id_product, p.reference, pl.name,
              sa.quantity, sa.out_of_stock
            FROM {$P}product p
            JOIN {$P}stock_available sa ON p.id_product = sa.id_product AND sa.id_shop IN ({$SHOPS_CSV})
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = sa.id_shop
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_shop = sa.id_shop AND pl.id_lang = {$L}
            WHERE sa.quantity <= 0
              AND sa.out_of_stock IN ({{OUT_OF_STOCK_RIESGO}})
              AND ps.active = 1
            ORDER BY sa.id_shop, p.id_product
        ",
        'requires' => ['out_of_stock_riesgo'],
    ],

    'missing_reference' => [
        'severity' => 'critical',
        'frequency' => 'daily',
        'description' => 'Productos activos sin referencia',
        'sql' => "
            SELECT
              ps.id_shop, p.id_product, pl.name, ps.active
            FROM {$P}product p
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop IN ({$SHOPS_CSV})
            WHERE (p.reference IS NULL OR p.reference = '')
              AND ps.active = 1
            ORDER BY p.id_product
        ",
    ],

    'duplicate_reference' => [
        'severity' => 'critical',
        'frequency' => 'daily',
        'description' => 'Mismo reference en varios id_product',
        'sql' => "
            SELECT
              p.id_product, p.reference, pl.name, ps.active
            FROM {$P}product p
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = 1
            WHERE p.reference IN (
              SELECT reference
              FROM {$P}product
              WHERE reference IS NOT NULL AND reference != ''
              GROUP BY reference
              HAVING COUNT(*) > 1
            )
            ORDER BY p.reference, p.id_product
        ",
    ],

    'ceramic_no_collection' => [
        'severity' => 'critical',
        'frequency' => 'daily',
        'description' => 'Productos cerámicos sin feature "Colección"',
        'sql' => "
            SELECT
              p.id_product, p.reference, pl.name
            FROM {$P}product p
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = 1
            WHERE ps.active = 1
              AND EXISTS (
                SELECT 1 FROM {$P}category_product cp
                WHERE cp.id_product = p.id_product
                  AND cp.id_category IN ({{CERAMIC_CATEGORY_IDS}})
              )
              AND NOT EXISTS (
                SELECT 1 FROM {$P}feature_product fp
                WHERE fp.id_product = p.id_product
                  AND fp.id_feature = {{FEATURE_COLECCION_ID}}
              )
            GROUP BY p.id_product
            ORDER BY p.id_product
        ",
        'requires' => ['feature_coleccion_id', 'ceramic_category_ids'],
    ],

    'zero_weight' => [
        'severity' => 'critical',
        'frequency' => 'daily',
        'description' => 'Productos activos con peso 0 o NULL — rompe cálculo de portes',
        'sql' => "
            SELECT
              p.id_product, p.reference, pl.name, p.weight
            FROM {$P}product p
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = 1
            WHERE (p.weight = 0 OR p.weight IS NULL)
              AND ps.active = 1
            ORDER BY p.id_product
        ",
    ],

    'stuck_orders' => [
        'severity' => 'warning',
        'frequency' => 'daily',
        'description' => 'Pedidos sin avanzar en >7 días (excluye estados finales)',
        'sql' => "
            SELECT
              o.id_order, o.reference,
              osl.name AS estado,
              o.date_upd,
              DATEDIFF(NOW(), o.date_upd) AS dias_en_estado,
              o.total_paid_tax_incl,
              c.firstname, c.lastname, c.email
            FROM {$P}orders o
            JOIN {$P}order_state os ON o.current_state = os.id_order_state
            JOIN {$P}order_state_lang osl ON os.id_order_state = osl.id_order_state
              AND osl.id_lang = {$L}
            JOIN {$P}customer c ON o.id_customer = c.id_customer
            WHERE o.current_state NOT IN ({{FINAL_ORDER_STATE_IDS}})
              AND DATEDIFF(NOW(), o.date_upd) > 7
            ORDER BY o.date_upd ASC
        ",
        'requires' => ['final_order_state_ids'],
    ],

    'cod_unconfirmed' => [
        'severity' => 'warning',
        'frequency' => 'daily',
        'description' => 'Pedidos contra reembolso sin validar tras 48h',
        'sql' => "
            SELECT
              o.id_order, o.reference, o.date_add,
              o.payment, o.module,
              o.total_paid_tax_incl,
              c.firstname, c.lastname, c.email, a.phone, a.phone_mobile
            FROM {$P}orders o
            JOIN {$P}customer c ON o.id_customer = c.id_customer
            LEFT JOIN {$P}address a ON o.id_address_delivery = a.id_address
            WHERE (
                o.module = 'ps_cashondelivery'
                OR o.payment LIKE '%reembolso%'
                OR o.payment LIKE '%cash on delivery%'
              )
              AND o.valid = 0
              AND TIMESTAMPDIFF(HOUR, o.date_add, NOW()) > 48
            ORDER BY o.date_add ASC
        ",
    ],

    // ---------- SEMANALES ----------

    'specific_price_not_in_offers' => [
        'severity' => 'warning',
        'frequency' => 'weekly',
        'description' => 'Precios especiales en productos no listados en categorías de Ofertas',
        'sql' => "
            SELECT DISTINCT
              p.id_product, p.reference, pl.name AS product_name,
              sp.reduction, sp.price AS specific_price,
              sp.`from` AS valid_from, sp.`to` AS valid_to
            FROM {$P}product p
            INNER JOIN {$P}product_shop pshop ON p.id_product = pshop.id_product
              AND pshop.id_shop = 1 AND pshop.active = 1
            INNER JOIN {$P}specific_price sp ON p.id_product = sp.id_product
            INNER JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            WHERE p.id_product NOT IN (
              SELECT cp.id_product FROM {$P}category_product cp
              WHERE cp.id_category IN ({{OFERTAS_CATEGORY_IDS}})
            )
            AND (sp.`to` = '0000-00-00 00:00:00' OR sp.`to` > NOW())
            ORDER BY sp.reduction DESC
        ",
        'requires' => ['ofertas_category_ids'],
    ],

    'specific_price_high_discount' => [
        'severity' => 'info',
        'frequency' => 'weekly',
        'description' => 'Descuentos >50% potencialmente erróneos',
        'sql' => "
            SELECT
              sp.id_product, pl.name AS product_name,
              sp.id_shop, sp.id_shop_group,
              CONCAT(ROUND(sp.reduction * 100, 2), '%') AS discount_percent,
              sp.from_quantity,
              sp.`from` AS valid_from, sp.`to` AS valid_to
            FROM {$P}specific_price sp
            JOIN {$P}product_lang pl ON pl.id_product = sp.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            WHERE sp.reduction_type = 'percentage'
              AND sp.reduction > 0.5
              AND (sp.`to` = '0000-00-00 00:00:00' OR sp.`to` > NOW())
            ORDER BY sp.reduction DESC
        ",
    ],

    'unexpected_tax_rules' => [
        'severity' => 'info',
        'frequency' => 'weekly',
        'description' => 'Productos con regla de IVA distinta de las esperadas (21% y 10%)',
        'sql' => "
            SELECT
              p.id_product, p.id_tax_rules_group, p.reference, pl.name,
              trgl.name AS regla_iva
            FROM {$P}product p
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = 1
            LEFT JOIN {$P}tax_rules_group trgl ON p.id_tax_rules_group = trgl.id_tax_rules_group
            WHERE ps.active = 1
              AND (
                p.id_tax_rules_group NOT IN (1, {{IVA_REDUCIDO_ID}})
                OR p.id_tax_rules_group IS NULL
                OR p.id_tax_rules_group = 0
              )
            ORDER BY p.id_tax_rules_group, p.id_product
        ",
        'requires' => ['iva_reducido_id'],
    ],

    'no_image' => [
        'severity' => 'warning',
        'frequency' => 'weekly',
        'description' => 'Productos activos sin ninguna imagen',
        'sql' => "
            SELECT
              p.id_product, p.reference, pl.name AS product_name
            FROM {$P}product p
            LEFT JOIN {$P}image i ON p.id_product = i.id_product
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = 1
            WHERE i.id_image IS NULL AND ps.active = 1
            ORDER BY p.id_product
        ",
    ],

    'no_category' => [
        'severity' => 'warning',
        'frequency' => 'weekly',
        'description' => 'Productos activos sin categoría real (solo en Inicio/Home)',
        'sql' => "
            SELECT
              p.id_product, p.reference, pl.name
            FROM {$P}product p
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = 1
            WHERE ps.active = 1
              AND NOT EXISTS (
                SELECT 1 FROM {$P}category_product cp
                WHERE cp.id_product = p.id_product
                  AND cp.id_category NOT IN (1, 2)
              )
            ORDER BY p.id_product
        ",
    ],

    'inactive_category' => [
        'severity' => 'warning',
        'frequency' => 'weekly',
        'description' => 'Productos activos en al menos una categoría desactivada',
        'sql' => "
            SELECT DISTINCT
              p.id_product, p.reference, pl.name,
              c.id_category, cl.name AS category_name
            FROM {$P}product p
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = 1
            JOIN {$P}category_product cp ON p.id_product = cp.id_product
            JOIN {$P}category c ON cp.id_category = c.id_category
            JOIN {$P}category_lang cl ON c.id_category = cl.id_category
              AND cl.id_lang = {$L} AND cl.id_shop = 1
            WHERE ps.active = 1 AND c.active = 0
            ORDER BY p.id_product
        ",
    ],

    'active_not_orderable' => [
        'severity' => 'warning',
        'frequency' => 'weekly',
        'description' => 'Productos activos visibles pero con available_for_order=0',
        'sql' => "
            SELECT
              ps.id_shop, p.id_product, p.reference, pl.name,
              ps.active, ps.available_for_order, ps.visibility
            FROM {$P}product p
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop IN ({$SHOPS_CSV})
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_shop = ps.id_shop AND pl.id_lang = {$L}
            WHERE ps.active = 1
              AND ps.available_for_order = 0
              AND ps.visibility IN ('both', 'catalog')
            ORDER BY ps.id_shop, p.id_product
        ",
    ],

    'price_inconsistency' => [
        'severity' => 'info',
        'frequency' => 'weekly',
        'description' => 'Productos con show_price=0 pero con precio >0',
        'sql' => "
            SELECT
              ps.id_shop, p.id_product, p.reference, pl.name, ps.price, ps.show_price
            FROM {$P}product p
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop IN ({$SHOPS_CSV})
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_shop = ps.id_shop AND pl.id_lang = {$L}
            WHERE ps.show_price = 0 AND ps.price > 0 AND ps.active = 1
            ORDER BY ps.id_shop, p.id_product
        ",
    ],

    'no_carrier' => [
        'severity' => 'warning',
        'frequency' => 'weekly',
        'description' => 'Productos activos sin entradas en ps_product_carrier (todos los carriers permitidos)',
        'sql' => "
            SELECT
              p.id_product, p.reference, pl.name
            FROM {$P}product p
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = 1
            WHERE ps.active = 1
              AND NOT EXISTS (
                SELECT 1 FROM {$P}product_carrier pc
                WHERE pc.id_product = p.id_product
              )
            ORDER BY p.id_product
        ",
    ],

    'oversize_no_carrier_compatible' => [
        'severity' => 'warning',
        'frequency' => 'weekly',
        'description' => 'Productos con dimensión >150cm con carrier de envío domiciliario asignado',
        'sql' => "
            SELECT
              p.id_product, p.reference, pl.name,
              p.width, p.height, p.depth,
              GREATEST(p.width, p.height, p.depth) AS dim_max
            FROM {$P}product p
            JOIN {$P}product_lang pl ON p.id_product = pl.id_product
              AND pl.id_lang = {$L} AND pl.id_shop = 1
            JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = 1
            WHERE ps.active = 1
              AND (p.width > 150 OR p.height > 150 OR p.depth > 150)
              AND EXISTS (
                SELECT 1 FROM {$P}product_carrier pc
                WHERE pc.id_product = p.id_product
                  AND pc.id_carrier_reference != {{RECOGIDA_CARRIER_ID}}
              )
            ORDER BY dim_max DESC
        ",
        'requires' => ['recogida_carrier_id'],
    ],

    // ---------- MENSUALES ----------
    //
    // image_404, heavy_images y low_resolution_images NO son checks SQL puros.
    // El agente Python los implementa contra ?action=image_urls + HEAD/GET asíncrono.
    // No los listamos aquí porque audit.php solo expone checks ejecutables vía SQL.
];

// ============================================================
//  INVENTORY QUERIES
// ============================================================

$INVENTORY = [

    'feature_coleccion' => "
        SELECT id_feature, fl.name
        FROM {$P}feature f
        JOIN {$P}feature_lang fl ON f.id_feature = fl.id_feature AND fl.id_lang = {$L}
        WHERE fl.name LIKE '%olección%' OR fl.name LIKE '%oleccion%'
    ",

    'tax_rules_groups' => "
        SELECT id_tax_rules_group, name, active
        FROM {$P}tax_rules_group
        WHERE deleted = 0
        ORDER BY id_tax_rules_group
    ",

    'order_states' => "
        SELECT
          os.id_order_state, osl.name, os.paid, os.shipped,
          os.delivery, os.invoice, os.unremovable, os.hidden
        FROM {$P}order_state os
        JOIN {$P}order_state_lang osl ON os.id_order_state = osl.id_order_state
          AND osl.id_lang = {$L}
        WHERE os.deleted = 0
        ORDER BY os.id_order_state
    ",

    'carriers' => "
        SELECT id_carrier, name, active, deleted, is_module, external_module_name
        FROM {$P}carrier
        ORDER BY id_carrier
    ",

    'ceramic_categories' => "
        SELECT c.id_category, cl.name, c.id_parent, c.active
        FROM {$P}category c
        JOIN {$P}category_lang cl ON c.id_category = cl.id_category
          AND cl.id_lang = {$L} AND cl.id_shop = 1
        WHERE cl.name LIKE '%orcelánic%'
           OR cl.name LIKE '%res%'
           OR cl.name LIKE '%osaico%'
           OR cl.name LIKE '%evestimient%'
           OR cl.name LIKE '%avimento%'
           OR cl.name LIKE '%erámic%'
        ORDER BY c.id_parent, cl.name
    ",

    'dimension_unit' => "
        SELECT name, value
        FROM {$P}configuration
        WHERE name IN ('PS_DIMENSION_UNIT', 'PS_WEIGHT_UNIT')
    ",
];

// ============================================================
//  ROUTING
// ============================================================

$action = $_GET['action'] ?? '';
$started_at = microtime(true);

try {
    switch ($action) {
        case 'list_checks':
            handle_list_checks($CHECKS);
            break;

        case 'audit':
            $check = $_GET['check'] ?? '';
            handle_audit($pdo, $CHECKS, $AUDIT_CONFIG, $check, $started_at);
            break;

        case 'inventory':
            $item = $_GET['item'] ?? '';
            handle_inventory($pdo, $INVENTORY, $item, $started_at);
            break;

        case 'image_urls':
            $shop = (int)($_GET['shop'] ?? 1);
            handle_image_urls($pdo, $shop, $started_at);
            break;

        default:
            audit_fail(400, 'Acción no soportada. Usar: list_checks | audit | inventory | image_urls');
    }
} catch (Throwable $e) {
    audit_log('error', $action, 0, $started_at, $e->getMessage());
    audit_fail(500, 'Error interno');
}

// ============================================================
//  HANDLERS
// ============================================================

function handle_list_checks(array $CHECKS): void
{
    $out = [];
    foreach ($CHECKS as $name => $c) {
        $out[] = [
            'name' => $name,
            'severity' => $c['severity'],
            'frequency' => $c['frequency'],
            'description' => $c['description'],
            'requires' => $c['requires'] ?? [],
        ];
    }
    echo json_encode(['checks' => $out], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function handle_audit(PDO $pdo, array $CHECKS, array $cfg, string $check, float $started_at): void
{
    if (!isset($CHECKS[$check])) {
        audit_fail(404, "Check '{$check}' no existe");
    }
    $c = $CHECKS[$check];

    // Validar que las claves requeridas de $AUDIT_CONFIG estén pobladas.
    foreach ($c['requires'] ?? [] as $key) {
        $v = $cfg[$key] ?? null;
        $empty = ($v === null) || ($v === '') || (is_array($v) && count($v) === 0);
        if ($empty) {
            audit_fail(503, "Falta configurar \$AUDIT_CONFIG['{$key}']. Ejecutar acción inventory correspondiente y editar audit.php.");
        }
    }

    $sql = render_sql($c['sql'], $cfg);
    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll();

    audit_log('audit', $check, count($rows), $started_at);

    echo json_encode([
        'check' => $check,
        'severity' => $c['severity'],
        'frequency' => $c['frequency'],
        'description' => $c['description'],
        'count' => count($rows),
        'rows' => $rows,
        'sql_used' => trim_sql($sql),
        'delete_sql_proposed' => null,
        'elapsed_ms' => (int)round((microtime(true) - $started_at) * 1000),
    ], JSON_UNESCAPED_UNICODE);
}

function handle_inventory(PDO $pdo, array $INVENTORY, string $item, float $started_at): void
{
    if (!isset($INVENTORY[$item])) {
        audit_fail(404, "Inventory '{$item}' no existe. Disponibles: " . implode(', ', array_keys($INVENTORY)));
    }
    $sql = $INVENTORY[$item];
    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll();

    audit_log('inventory', $item, count($rows), $started_at);

    echo json_encode([
        'item' => $item,
        'count' => count($rows),
        'rows' => $rows,
        'sql_used' => trim_sql($sql),
        'elapsed_ms' => (int)round((microtime(true) - $started_at) * 1000),
    ], JSON_UNESCAPED_UNICODE);
}

function handle_image_urls(PDO $pdo, int $shop, float $started_at): void
{
    $P = DB_PREFIX;
    $L = ID_LANG;
    if (!in_array($shop, SHOPS, true)) {
        audit_fail(400, "Shop {$shop} fuera de SHOPS configurado");
    }
    // Formato URL: ajustar si la URL real de Prestashop usa otra estructura
    // (típicamente Prestashop separa id_image en dígitos: /1/2/3/123-rewrite.jpg).
    // Mantenemos el formato del briefing; si no resuelve, cambiar el CONCAT.
    $sql = "
        SELECT
          p.id_product, p.reference, i.id_image, i.position,
          CONCAT('https://ferrolan.es/', i.id_image, '/', pl.link_rewrite, '.jpg') AS url
        FROM {$P}image i
        JOIN {$P}product p ON i.id_product = p.id_product
        JOIN {$P}product_shop ps ON p.id_product = ps.id_product AND ps.id_shop = {$shop}
        JOIN {$P}product_lang pl ON p.id_product = pl.id_product
          AND pl.id_lang = {$L} AND pl.id_shop = {$shop}
        WHERE ps.active = 1
        ORDER BY p.id_product, i.position
    ";
    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll();

    audit_log('image_urls', "shop={$shop}", count($rows), $started_at);

    echo json_encode([
        'shop' => $shop,
        'count' => count($rows),
        'rows' => $rows,
        'elapsed_ms' => (int)round((microtime(true) - $started_at) * 1000),
    ], JSON_UNESCAPED_UNICODE);
}

// ============================================================
//  HELPERS
// ============================================================

/**
 * Sustituye placeholders {{KEY}} en la SQL con valores de $AUDIT_CONFIG.
 * Cast estricto a int para evitar inyección (los valores son IDs numéricos).
 */
function render_sql(string $sql, array $cfg): string
{
    $map = [
        '{{FEATURE_COLECCION_ID}}'     => (int)($cfg['feature_coleccion_id'] ?? 0),
        '{{IVA_REDUCIDO_ID}}'          => (int)($cfg['iva_reducido_id'] ?? 0),
        '{{RECOGIDA_CARRIER_ID}}'      => (int)($cfg['recogida_carrier_id'] ?? 0),
        '{{CERAMIC_CATEGORY_IDS}}'     => csv_int_list($cfg['ceramic_category_ids'] ?? []),
        '{{FINAL_ORDER_STATE_IDS}}'    => csv_int_list($cfg['final_order_state_ids'] ?? []),
        '{{OFERTAS_CATEGORY_IDS}}'     => csv_int_list($cfg['ofertas_category_ids'] ?? []),
        '{{OUT_OF_STOCK_RIESGO}}'      => csv_int_list($cfg['out_of_stock_riesgo'] ?? []),
    ];
    return strtr($sql, $map);
}

/** Convierte array de ints a CSV "1,2,3". Devuelve "0" si el array está vacío (IN (0) = vacío seguro). */
function csv_int_list(array $list): string
{
    if (count($list) === 0) {
        return '0';
    }
    return implode(',', array_map('intval', $list));
}

/** Recorta whitespace excesivo de la SQL antes de devolverla en la respuesta. */
function trim_sql(string $sql): string
{
    return trim(preg_replace('/\s+/', ' ', $sql));
}

/** Log de invocaciones a fichero plano. Falla silenciosamente si no puede escribir. */
function audit_log(string $kind, string $target, int $rows, float $started_at, string $extra = ''): void
{
    $line = sprintf(
        "[%s] %s target=%s rows=%d elapsed_ms=%d%s\n",
        gmdate('c'),
        $kind,
        $target,
        $rows,
        (int)round((microtime(true) - $started_at) * 1000),
        $extra ? " extra=" . str_replace("\n", ' ', $extra) : ''
    );
    $path = LOG_FILE;
    if (!@file_put_contents($path, $line, FILE_APPEND | LOCK_EX)) {
        @file_put_contents(sys_get_temp_dir() . '/ferrolan_audit.log', $line, FILE_APPEND | LOCK_EX);
    }
}

/** Termina la ejecución con un error JSON consistente. */
function audit_fail(int $code, string $msg): void
{
    http_response_code($code);
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode(['error' => $msg, 'code' => $code], JSON_UNESCAPED_UNICODE);
    exit;
}
