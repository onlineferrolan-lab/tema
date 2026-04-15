# Ferrolan Theme — Workflow Frontend

Runbook para tocar estilos del theme sin atascarse.

---

## 1. Qué archivo tocar

**Regla de oro**: todo CSS custom va en `assets/css/custom.css`.

**Por qué**: el tema carga `custom.css` automáticamente (convención del tema padre `ecommbase` / módulo ecomm), pero **ignora archivos nuevos declarados en `theme.yml`** aunque estén bien registrados.

- ✅ **SÍ se carga**: `assets/css/custom.css`
- ❌ **NO se carga** (aunque esté en theme.yml): `assets/css/_partials/myaccount-custom.css` y similares

**Conclusión**: olvídate de crear archivos CSS nuevos. Edita `custom.css` directamente.

---

## 2. Flujo de iteración

### Paso 1 — Trabajar en local con preview en vivo

Usa **Stylus** (extensión Chrome) para ver los cambios sin subir nada:

1. Clic en icono Stylus → **Administrar estilos** → estilo "Mi cuenta" (ya creado)
2. Pega/edita el CSS en el editor
3. Guarda (Ctrl+S) → recarga la página
4. Itera hasta que te guste

**Configuración Stylus:**
- Nombre: `Ferrolan Mi Cuenta`
- Sitios incluidos: `*://ferrolan.es/*`
- El editor debe contener SOLO el CSS (sin metadatos `@-moz-document`)

### Paso 2 — Desactivar Stylus y probar en producción real

Para verificar que el CSS del servidor es correcto:
1. Clic icono Stylus → desactiva el estilo "Mi cuenta"
2. Abre ferrolan.es en **incógnito** (Ctrl+Shift+N)
3. Verifica cómo se ve SIN Stylus

### Paso 3 — Deploy a producción

1. Plesk → File Manager → `/httpdocs/web/themes/ferrolan/assets/css/`
2. Backup: renombra `custom.css` a `custom.css.backup-YYYYMMDD`
3. Sube el nuevo `custom.css` desde local
4. Purga cachés (ver sección 3)

---

## 3. Purga de cachés (orden estricto)

El orden importa. Si algo no se aplica, suele ser cache.

### 3.1 Bundle del theme (el importante)
Plesk File Manager → `/httpdocs/web/themes/ferrolan/assets/cache/` → borra todos los `theme-*.css`

### 3.2 PrestaShop cache
BO → **Parámetros avanzados** → **Rendimiento** → botón "Borrar la caché" (arriba derecha)

### 3.3 Cloudflare
Panel CF → **Caching** → **Configuration** → **Purge Everything**

Para iteraciones rápidas activa **Development Mode** (3h de bypass):
Panel CF → Overview → toggle Development Mode = ON

### 3.4 Navegador
Incógnito + Ctrl+F5

---

## 4. Diagnóstico cuando nada funciona

Si tras subir y purgar no ves cambios, ejecuta esto en consola (F12) en incógnito **sin Stylus**:

```js
(async () => {
  const link = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map(l => l.href).filter(h => h.includes('theme-'))[0];
  const r = await fetch(link);
  const t = await r.text();
  console.log('Bundle:', link);
  console.log('Tamaño:', t.length);
  console.log('Contiene mi regla clave?:', t.includes('MI_SELECTOR_UNICO'));
})();
```

Reemplaza `MI_SELECTOR_UNICO` por algo muy específico de tu CSS nuevo (ej: `#history .order_history`, o una clase que hayas introducido).

**Interpretación:**
- **Bundle no cambia de hash** → PrestaShop no ha regenerado. Borra `/themes/ferrolan/assets/cache/*` y `var/cache/prod/*`
- **Bundle cambia pero no contiene tu regla** → editaste el archivo equivocado (no era `custom.css`)
- **Bundle contiene tu regla pero no se aplica visualmente** → batalla de especificidad. Añade `!important` o prefija con más selectores (`body#history .order_history`)

---

## 5. Batalla de especificidad

PrestaShop 8 + Bootstrap 5 + módulos ecomm = mucho CSS con `!important` que hay que vencer.

**Tácticas de especificidad (de menos a más):**

```css
/* Nivel 1: selector simple */
.my-class { ... }

/* Nivel 2: !important */
.my-class { color: red !important; }

/* Nivel 3: body prefix */
body .my-class { color: red !important; }

/* Nivel 4: page-specific body */
body#history .my-class { color: red !important; }

/* Nivel 5: cadena completa (última opción) */
body .contact_block .form-fields .form-group .sub-form-group .js-input-column input.form-control { ... }
```

**Cuándo usar body prefix vs selector global:**
- Estilos **compartidos entre páginas** (sidebar, contacto, formularios): selector global sin prefijo
- Estilos **específicos de una página**: `body#<pageId>` como prefijo
  - Dashboard: `body#my-account`
  - Historial: `body#history`
  - Info personal: `body#identity`
  - Direcciones: `body#addresses`
  - Detalle pedido: `body#order-detail`
  - Cupones: `body#discount`
  - Facturas: `body#order-slip`
  - Carritos: `body#savedcarts` (aprox)

---

## 6. Estructura del CSS custom.css

Mantén el CSS organizado en secciones:

```
A. Variables (colores, radius, etc.)
A1. Sidebar desktop (global)
A2. Bloque "Necesitas ayuda?" (global)
A2b. Popup lateral cuenta (global)
A3. Sidebar móvil (global)
B. Dashboard (body#my-account)
C. Historial (body#history)
C2. Formularios identity/address
C3. Direcciones
C4. Tablas (cupones, facturas)
C5. Detalle de pedido
C6. Productos comprados
C7. Carritos guardados
D. Responsive (@media queries al final)
```

---

## 7. Variables de diseño

Definidas en `.page-customer-account, .dashboard_account`:

```css
--fl-red: #C40731;            /* rojo Ferrolan */
--fl-red-soft: rgba(196,7,49,0.08);  /* rojo diluido para hovers */
--fl-text: #2D2D2D;           /* texto principal */
--fl-text-muted: #6C757D;     /* texto secundario */
--fl-border: #ECECEC;         /* borde fino */
--fl-border-hard: #D9D9D9;    /* borde más visible */
--fl-bg: #FFFFFF;             /* fondo principal */
--fl-bg-soft: #FAFAFA;        /* fondo sutil */
--fl-radius: 8px;             /* radius estándar */
```

**Uso**: `color: var(--fl-red)` o con fallback `color: var(--fl-red, #C40731)` para contextos donde las variables no se heredan (ej: popups fuera de `.page-customer-account`).

---

## 8. Identificación rápida de problemas frecuentes

| Síntoma | Causa probable | Solución |
|---|---|---|
| Bundle tiene mismo hash tras subir | PrestaShop cacheado | Borrar `var/cache/prod/*` + theme cache |
| Variables CSS definidas pero reglas no aplican | Bundle tiene versión vieja | Purgar theme cache + CCC off/on |
| Estilos aplican en dashboard pero no en otras páginas | Selector con prefijo `body#my-account` | Usar selector global o añadir más body IDs |
| Iconos siguen visibles tras `display:none` | Selector no ataca el elemento correcto | Inspeccionar con F12, ver qué clase exacta tiene |
| Cloudflare sirve versión vieja | Cache CF | Purge Everything + Development Mode ON |

---

## 9. Contactos y rutas clave

- **Servidor SSH**: `ssh ecommsistema@ferrolanalanta`
- **Ruta theme en prod**: `/var/www/vhosts/ferrolan.es/httpdocs/web/themes/ferrolan/`
- **Ruta local**: `C:\Users\PIM\Desktop\Claude\Theme\`
- **Repo GitHub**: `onlineferrolan-lab/tema` (rama `main`)
- **Panel Cloudflare**: dominio `ferrolan.es`
- **Panel Plesk**: el habitual del hosting

---

## Historial del proyecto "Rediseño Mi Cuenta" (abril 2026)

11 páginas rediseñadas con estética minimalista, rojo Ferrolan #C40731, bordes finos #ECECEC, radius 8px. Desplegado en `custom.css` tras descubrir que el archivo nuevo `myaccount-custom.css` declarado en `theme.yml` era ignorado por el tema.
