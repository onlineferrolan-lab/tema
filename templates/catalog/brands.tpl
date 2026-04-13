{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 *}
{extends file=$layout}

{block name='head_seo_title'}Nuestras marcas{/block}

{block name='content'}
<style>
/* ===== ESTILOS PÁGINA DE MARCAS FERROLAN ===== */

/* Contenedor principal */
.brands-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

/* Título principal */
.brands-page h1 {
    font-size: 35px;
    font-weight: 500;
    color: black;
    margin-bottom: 10px;
    text-align: center;
}

.brands-subtitle {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 30px;
}

/* ===== ÍNDICE ALFABÉTICO ===== */
.alphabet-index {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding: 25px 20px;
    background: #f8f9fa;
    border-radius: 12px;
    margin-bottom: 40px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.alphabet-index a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 2px solid #333;
    border-radius: 50%;
    text-decoration: none;
    color: #333;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.alphabet-index a:hover,
.alphabet-index a.active {
    background-color: #c40731;
    border-color: #c40731;
    color: #fff;
    transform: scale(1.1);
}

.alphabet-index a.disabled {
    border-color: #ddd;
    color: #ccc;
    pointer-events: none;
    cursor: default;
}

/* ===== SECCIONES POR LETRA ===== */
.brand-section {
    margin-bottom: 50px;
    scroll-margin-top: 120px;
}

.brand-section-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 3px solid #c40731;
}

.brand-section-letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: #c40731;
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
    border-radius: 50%;
    margin-right: 20px;
    flex-shrink: 0;
}

.brand-section-count {
    color: #666;
    font-size: 1rem;
}

/* ===== GRID DE MARCAS ===== */
.brands-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
}

/* ===== TARJETA DE MARCA ===== */
.brand-card {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 30px 20px;
    text-align: center;
    transition: all 0.3s ease;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.brand-card:hover {
    border-color: #c40731;
    box-shadow: 0 8px 25px rgba(196, 7, 49, 0.15);
    transform: translateY(-5px);
}

/* LOGO - Tamaño fijo del contenedor */
.brand-card-logo {
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.brand-card-logo img {
    max-width: 90%;
    max-height: 160px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: grayscale(30%);
    transition: all 0.3s ease;
}

.brand-card:hover .brand-card-logo img {
    filter: grayscale(0%);
    transform: scale(1.05);
}

.brand-card-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    transition: color 0.3s ease;
}

.brand-card:hover .brand-card-name {
    color: #c40731;
}

.brand-card-products {
    font-size: 0.95rem;
    color: #888;
}

/* ===== PLACEHOLDER SIN LOGO ===== */
.brand-card-logo-placeholder {
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
    border-radius: 8px;
    margin-bottom: 20px;
}

.brand-card-logo-placeholder span {
    font-size: 4rem;
    font-weight: 700;
    color: #c40731;
    opacity: 0.6;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
    .brands-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 900px) {
    .brands-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .alphabet-index {
        gap: 8px;
        padding: 15px;
    }
    
    .alphabet-index a {
        width: 34px;
        height: 34px;
        font-size: 0.85rem;
    }
    
    .brand-section-letter {
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
    }
    
    .brand-card {
        padding: 20px 15px;
    }
    
    .brand-card-logo {
        height: 140px;
    }
    
    .brand-card-logo img {
        max-height: 120px;
    }
}

@media (max-width: 480px) {
    .brands-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
    
    .brand-card {
        padding: 15px 10px;
    }
    
    .brand-card-logo {
        height: 120px;
    }
    
    .brand-card-logo img {
        max-height: 100px;
    }
    
    .brand-card-name {
        font-size: 1rem;
    }
}

/* ===== BOTÓN VOLVER ARRIBA ===== */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #c40731;
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 15px rgba(196, 7, 49, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
}

.back-to-top:hover {
    background: #a00628;
    transform: translateY(-3px);
}

.back-to-top.visible {
    display: flex;
}
</style>

<section id="main" class="brands-page">

    {block name='brand_header'}
        <h1>Nuestras marcas</h1>
        <p class="brands-subtitle">Descubre las mejores marcas para tu proyecto de reforma y construcción</p>
    {/block}

    {* Preparar array de marcas por letra *}
    {assign var='brandsByLetter' value=[]}
    {assign var='availableLetters' value=[]}
    
    {foreach from=$brands item=brand}
        {assign var='firstLetter' value=$brand.name|upper|substr:0:1}
        {* Normalizar caracteres especiales *}
        {if $firstLetter == 'Á' || $firstLetter == 'À' || $firstLetter == 'Ä'}
            {assign var='firstLetter' value='A'}
        {elseif $firstLetter == 'É' || $firstLetter == 'È' || $firstLetter == 'Ë'}
            {assign var='firstLetter' value='E'}
        {elseif $firstLetter == 'Í' || $firstLetter == 'Ì' || $firstLetter == 'Ï'}
            {assign var='firstLetter' value='I'}
        {elseif $firstLetter == 'Ó' || $firstLetter == 'Ò' || $firstLetter == 'Ö'}
            {assign var='firstLetter' value='O'}
        {elseif $firstLetter == 'Ú' || $firstLetter == 'Ù' || $firstLetter == 'Ü'}
            {assign var='firstLetter' value='U'}
        {elseif $firstLetter == 'Ñ'}
            {assign var='firstLetter' value='N'}
        {/if}
        
        {if !isset($brandsByLetter[$firstLetter])}
            {$brandsByLetter[$firstLetter] = []}
            {$availableLetters[] = $firstLetter}
        {/if}
        {$brandsByLetter[$firstLetter][] = $brand}
    {/foreach}

    {* Índice alfabético *}
    {block name='alphabet_index'}
    <nav class="alphabet-index" aria-label="Índice alfabético">
        {foreach ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] as $letter}
            {if in_array($letter, $availableLetters)}
                <a href="#letter-{$letter}" title="Ver marcas que empiezan por {$letter}">{$letter}</a>
            {else}
                <a class="disabled" aria-disabled="true">{$letter}</a>
            {/if}
        {/foreach}
    </nav>
    {/block}

    {* Listado de marcas por letra *}
    {block name='brand_miniature'}
    {foreach ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] as $letter}
        {if isset($brandsByLetter[$letter]) && count($brandsByLetter[$letter]) > 0}
        <section class="brand-section" id="letter-{$letter}">
            <header class="brand-section-header">
                <span class="brand-section-letter">{$letter}</span>
                <div>
                    <span class="brand-section-count">
                        {count($brandsByLetter[$letter])} {if count($brandsByLetter[$letter]) == 1}marca{else}marcas{/if}
                    </span>
                </div>
            </header>
            
            <div class="brands-grid">
                {foreach from=$brandsByLetter[$letter] item=brand}
                <a href="{$brand.url}" class="brand-card" title="Ver productos de {$brand.name}">
                    {if $brand.image}
                    <div class="brand-card-logo">
                        {* Convertir small_default a imagen original (sin sufijo) *}
                        {assign var='brandImageLarge' value=$brand.image|replace:'-small_default':''|replace:'-medium_default':''|replace:'-large_default':''}
                        <img src="{$brandImageLarge}" 
                             alt="{$brand.name}" 
                             loading="lazy"
                             onerror="this.src='{$brand.image}'">
                    </div>
                    {else}
                    <div class="brand-card-logo-placeholder">
                        <span>{$brand.name|substr:0:1|upper}</span>
                    </div>
                    {/if}
                    <span class="brand-card-name">{$brand.name}</span>
                </a>
                {/foreach}
            </div>
        </section>
        {/if}
    {/foreach}
    {/block}

</section>

{* Botón volver arriba *}
<button class="back-to-top" id="backToTop" title="Volver arriba">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
</button>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave para el índice alfabético
    document.querySelectorAll('.alphabet-index a:not(.disabled)').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Actualizar clase activa
                document.querySelectorAll('.alphabet-index a').forEach(function(a) {
                    a.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Botón volver arriba
    var backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Actualizar letra activa según scroll
        var sections = document.querySelectorAll('.brand-section');
        var currentLetter = '';
        
        sections.forEach(function(section) {
            var rect = section.getBoundingClientRect();
            if (rect.top <= 150) {
                currentLetter = section.id.replace('letter-', '');
            }
        });
        
        if (currentLetter) {
            document.querySelectorAll('.alphabet-index a').forEach(function(a) {
                a.classList.remove('active');
                if (a.textContent === currentLetter) {
                    a.classList.add('active');
                }
            });
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
</script>

{/block}
