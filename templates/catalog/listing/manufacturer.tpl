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

{extends file='catalog/listing/product-list.tpl'}

{block name='content'}

  {*<h1>{l s='List of products by brand %brand_name%' sprintf=['%brand_name%' => $manufacturer.name] d='Shop.Theme.Catalog'}</h1>
  <div id="manufacturer-short_description">{$manufacturer.short_description nofilter}</div>
  <div id="manufacturer-description">{$manufacturer.description nofilter}</div>*}
  <div class="container_category_manufacturer">

    {foreach from=$manufacturer_categories key=key item=sub}
{*        {$sub|dump}*}
      <div class="subcategory-container {$sub.name} {if $key > 11}hidden{/if}" itemprop="itemListElement">
        {*<a href="{$product_brand_url}">*}
        <a href="{$sub.url}">
          <img class="subcategory-image" alt="subcategory-image" src="{$sub.image.bySize["subcategory-image"].url}">
        </a>

        <div class="floating-container">
          <div class="floating-content">
            <h2 class="title-floating">{$sub.name}</h2>
            <a href="{$sub.url}">{l s='VER' d='Shop.Theme.Actions'}</a>
          </div>
        </div>
        {*showing extra info category*}
        {if isset($sub.id_category)}
          <div class="extra-info-cats">
            {if isset($sub.extra_info.acabadofabrica) && !empty($sub.extra_info.acabadofabrica)}
              <span class="extra_acabados extra_acabados_val">{$sub.extra_info.acabadofabrica}</span>
              <span class="extra_acabados extra_acabados_txt" data-singular="{l s='acabado' d='Shop.Theme.Actions'}" data-plural="{l s='acabados' d='Shop.Theme.Actions'}">{if $sub.extra_info.acabadofabrica > 1}{l s='acabados' d='Shop.Theme.Actions'}{else}{l s='acabado' d='Shop.Theme.Actions'}{/if}</span>
              <span class="extra_acabados sep">|</span>
              <span class="extra_formatos extra_formatos_val">{$sub.extra_info.formatos}</span>
              <span class="extra_formatos extra_formatos_txt" data-singular="{l s='formato' d='Shop.Theme.Actions'}" data-plural="{l s='formatos' d='Shop.Theme.Actions'}">{if $sub.extra_info.formatos > 1}{l s='formatos' d='Shop.Theme.Actions'}{else}{l s='formato' d='Shop.Theme.Actions'}{/if}</span>
              <span class="extra_formatos sep">|</span>
              <span class="extra_colores extra_colores_val">{$sub.extra_info.colfabrica}</span>
              <span class="extra_colores" data-singular="{l s='color' d='Shop.Theme.Actions'}" data-plural="{l s='colores' d='Shop.Theme.Actions'}">{if $sub.extra_info.colfabrica > 1}{l s='colores' d='Shop.Theme.Actions'}{else}{l s='color' d='Shop.Theme.Actions'}{/if}</span>
              {*                {else}*}
              {*                  <span class="extra_acabados extra_acabados_val" style="display:none;"></span>*}
              {*                  <span class="extra_acabados extra_acabados_txt" style="display:none;" data-singular="{l s='acabado' d='Shop.Theme.Actions'}" data-plural="{l s='acabados' d='Shop.Theme.Actions'}"></span>*}
              {*                  <span class="extra_acabados sep" style="display:none;">|</span>*}
              {*                  <span class="extra_formatos extra_formatos_val" style="display:none;"></span>*}
              {*                  <span class="extra_formatos extra_formatos_txt" style="display:none;" data-singular="{l s='formato' d='Shop.Theme.Actions'}" data-plural="{l s='formatos' d='Shop.Theme.Actions'}"></span>*}
              {*                  <span class="extra_formatos sep" style="display:none;">|</span>*}
              {*                  <span class="extra_colores extra_colores_val" style="display:none;"></span>*}
              {*                  <span class="extra_colores extra_colores_txt" style="display:none;" data-singular="{l s='color' d='Shop.Theme.Actions'}" data-plural="{l s='colores' d='Shop.Theme.Actions'}"></span>*}
            {/if}
          </div>
        {/if}
      </div>
    {/foreach}
  </div>
    {if $manufacturer_categories|count > 10}
  <div id="categories_manufacturer-loadmore" data-total="{$categoriesNb}">
    <span>{l s='Cargar más' d='Shop.Theme.Manufacturer'}</span>
  </div>
    {/if}



    {if $manufacturer_categories|count == 0}
    {block name='product_list'}
        {include file='catalog/_partials/products.tpl' listing=$listing productClass="col-xs-6 col-xl-3"}
    {/block}

    {/if}



    <div id="manufacturer-description" class="{if $manufacturer.description|count_characters > 100}long{/if}">
        {$manufacturer.description nofilter}
    </div>
    {if $manufacturer.description|count_characters > 100}
        <div class="manufacturer-description-see-more text-center">
            <img alt="more" src="{$urls.img_url}arrow_up.svg">
        </div>
    {/if}
{/block}
