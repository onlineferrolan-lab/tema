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

{block name='content'}
    <section id="main">

        {if $page.page_name == 'manufacturer'}
            <div class="product-manufacturer brand_img">
                {if isset($manufacturer_image_url)}
                    <a href="{$product_brand_url}">
                        <img src="{$manufacturer_image_url}" class="img img-thumbnail manufacturer-logo" alt="{$product_manufacturer->name}">
                    </a>
                {else}
                    <img src="{$link->getManufacturerImageLink($manufacturer.id, 'home_default')}" alt = "{$manufacturer.name|escape:html:'UTF-8'}" class="logo_brand" />
                {/if}
            </div>
            {block name='product_list_header'}
                <h2 id="js-product-list-header" class="h2">{$listing.label}</h2>
            {/block}
        {/if}

        {*        CATEGORIAS EN LA QUE MOSTRAR PRODUCTOS *}
        {*assign value='2746,2747,2748,2749,2750,2751,2752,2753,2754,3555, 4287, 7380, 8380' var='categories_show_prod'}
        {assign var='show_categories_prod' value=','|explode:$categories_show_prod*}

        {*assign value='2736' var='subcategories_show_prod'}
        {assign var='show_subcategories_prod' value=','|explode:$subcategories_show_prod*}

        {assign value='16,17,18,19,20,2665' var='categories_notshow_prod'}
        {assign var='notsow_categories_parent_prod' value=','|explode:$categories_notshow_prod}

        {assign value='16,2665,2704' var='categories_notshow_prod'} {* ceramica, baños *}
        {assign var='notsow_categories_prod' value=','|explode:$categories_notshow_prod}

        {if isset($category.level_depth) && $category.level_depth == 4 && ($category.id_parent == 17 || $category.id_parent == 18 ||$category.id_parent == 19 || $category.id_parent == 20) || $category.id == 2745}
            <div class="subcategories-level-4 products">
                {foreach from=$subcategories item=sub}
                    <div class="subcategory-container {$sub.name}" itemprop="itemListElement">

                        <a href="{$sub.url}">

                            <img class="subcategory-image" alt="subcategory-image"
                                                  src="{$sub.image_link|replace:"ferrolan8.ecomm360.net":"ferrolan.es"}">

                        </a>

                        {*showing extra info category*}
                        {if isset($sub.id_category)}
                            <div class="extra-info-cats">
                                {if isset($sub.extra_info.acabadofabrica) && !empty($sub.extra_info.acabadofabrica)}
                                    <span class="extra_acabados extra_acabados_val">{$sub.extra_info.acabadofabrica}</span>
                                    <span class="extra_acabados extra_acabados_txt"
                                          data-singular="{l s='acabado' d='Shop.Theme.Actions'}"
                                          data-plural="{l s='acabados' d='Shop.Theme.Actions'}">{if $sub.extra_info.acabadofabrica > 1}{l s='acabados' d='Shop.Theme.Actions'}{else}{l s='acabado' d='Shop.Theme.Actions'}{/if}</span>
                                    <span class="extra_acabados sep">|</span>
                                    <span class="extra_formatos extra_formatos_val">{$sub.extra_info.formatos}</span>
                                    <span class="extra_formatos extra_formatos_txt"
                                          data-singular="{l s='formato' d='Shop.Theme.Actions'}"
                                          data-plural="{l s='formatos' d='Shop.Theme.Actions'}">{if $sub.extra_info.formatos > 1}{l s='formatos' d='Shop.Theme.Actions'}{else}{l s='formato' d='Shop.Theme.Actions'}{/if}</span>
                                    <span class="extra_formatos sep">|</span>
                                    <span class="extra_colores extra_colores_val">{$sub.extra_info.colfabrica}</span>
                                    <span class="extra_colores" data-singular="{l s='color' d='Shop.Theme.Actions'}"
                                          data-plural="{l s='colores' d='Shop.Theme.Actions'}">{if $sub.extra_info.colfabrica > 1}{l s='colores' d='Shop.Theme.Actions'}{else}{l s='color' d='Shop.Theme.Actions'}{/if}</span>
                                    {*                                {else}*}
                                    {*                                    <span class="extra_acabados extra_acabados_val" style="display:none;"></span>*}
                                    {*                                    <span class="extra_acabados extra_acabados_txt" style="display:none;"*}
                                    {*                                          data-singular="{l s='acabado' d='Shop.Theme.Actions'}"*}
                                    {*                                          data-plural="{l s='acabados' d='Shop.Theme.Actions'}"></span>*}
                                    {*                                    <span class="extra_acabados sep" style="display:none;">|</span>*}
                                    {*                                    <span class="extra_formatos extra_formatos_val" style="display:none;"></span>*}
                                    {*                                    <span class="extra_formatos extra_formatos_txt" style="display:none;"*}
                                    {*                                          data-singular="{l s='formato' d='Shop.Theme.Actions'}"*}
                                    {*                                          data-plural="{l s='formatos' d='Shop.Theme.Actions'}"></span>*}
                                    {*                                    <span class="extra_formatos sep" style="display:none;">|</span>*}
                                    {*                                    <span class="extra_colores extra_colores_val" style="display:none;"></span>*}
                                    {*                                    <span class="extra_colores extra_colores_txt" style="display:none;"*}
                                    {*                                          data-singular="{l s='color' d='Shop.Theme.Actions'}"*}
                                    {*                                          data-plural="{l s='colores' d='Shop.Theme.Actions'}"></span>*}
                                {/if}
                            </div>
                        {/if}
                        <div class="floating-container">
                            <div class="floating-content">
                                <h2 class="title-floating">{$sub.name}</h2>
                                <a href="{$sub.url}">{l s='VER' d='Shop.Theme.Actions'}</a>
                            </div>
                        </div>
                    </div>
                {/foreach}

            </div>
            {if isset($subcategoriesNb) && ($subcategories|@count < $subcategoriesNb)}
                <div id="subcategories-loadmore" data-total="{$subcategoriesNb}">
                    <span>{l s='Cargar más' d='Shop.Theme.Actions'}</span>
                </div>
            {/if}

            {*if category level is 4 and it's only for ceramic subcategories*}
        {elseif isset($category.level_depth) && $category.level_depth == 4 && ($category.id_parent == 17 || $category.id_parent == 18 ||$category.id_parent == 19 || $category.id_parent == 20)}
            <div class="subcategories-level-4 products">
                {foreach from=$subcategories item=sub}
                    <div class="subcategory-container {$sub.name}" itemprop="itemListElement">
                        <img class="subcategory-image" alt="subcategory-image"
                             src="{$sub.image.bySize["subcategory-image"].url}">
                        <div class="floating-container">
                            <div class="floating-content">
                                <h2>{$sub.name}</h2>
                                <a href="{$sub.url}">{l s='VER' d='Shop.Theme.Actions'}</a>
                            </div>
                        </div>
                        {*showing extra info category*}
                        {if isset($sub.id_category)}
                            <div class="extra-info-cats">
                                {if isset($sub.extra_info.acabadofabrica)}
                                    <span class="extra_acabados extra_acabados_val">{$sub.extra_info.acabadofabrica}</span>
                                    <span class="extra_acabados extra_acabados_txt"
                                          data-singular="{l s='acabado' d='Shop.Theme.Actions'}"
                                          data-plural="{l s='acabados' d='Shop.Theme.Actions'}">{if $sub.extra_info.acabadofabrica > 1}{l s='acabados' d='Shop.Theme.Actions'}{else}{l s='acabado' d='Shop.Theme.Actions'}{/if}</span>
                                    <span class="extra_acabados sep">|</span>
                                    <span class="extra_formatos extra_formatos_val">{$sub.extra_info.formatos}</span>
                                    <span class="extra_formatos extra_formatos_txt"
                                          data-singular="{l s='formato' d='Shop.Theme.Actions'}"
                                          data-plural="{l s='formatos' d='Shop.Theme.Actions'}">{if $sub.extra_info.formatos > 1}{l s='formatos' d='Shop.Theme.Actions'}{else}{l s='formato' d='Shop.Theme.Actions'}{/if}</span>
                                    <span class="extra_formatos sep">|</span>
                                    <span class="extra_colores extra_colores_val">{$sub.extra_info.colfabrica}</span>
                                    <span class="extra_colores" data-singular="{l s='color' d='Shop.Theme.Actions'}"
                                          data-plural="{l s='colores' d='Shop.Theme.Actions'}">{if $sub.extra_info.colfabrica > 1}{l s='colores' d='Shop.Theme.Actions'}{else}{l s='color' d='Shop.Theme.Actions'}{/if}</span>
                                {else}
                                    <span class="extra_acabados extra_acabados_val" style="display:none;"></span>
                                    <span class="extra_acabados extra_acabados_txt" style="display:none;"
                                          data-singular="{l s='acabado' d='Shop.Theme.Actions'}"
                                          data-plural="{l s='acabados' d='Shop.Theme.Actions'}"></span>
                                    <span class="extra_acabados sep" style="display:none;">|</span>
                                    <span class="extra_formatos extra_formatos_val" style="display:none;"></span>
                                    <span class="extra_formatos extra_formatos_txt" style="display:none;"
                                          data-singular="{l s='formato' d='Shop.Theme.Actions'}"
                                          data-plural="{l s='formatos' d='Shop.Theme.Actions'}"></span>
                                    <span class="extra_formatos sep" style="display:none;">|</span>
                                    <span class="extra_colores extra_colores_val" style="display:none;"></span>
                                    <span class="extra_colores extra_colores_txt" style="display:none;"
                                          data-singular="{l s='color' d='Shop.Theme.Actions'}"
                                          data-plural="{l s='colores' d='Shop.Theme.Actions'}"></span>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/foreach}

                {if isset($subcategoriesNb) && $subcategories|@count < $subcategoriesNb}
                    <div id="subcategories-loadmore" data-total="{$subcategoriesNb}">
                        <span>{l s='Cargar más' d='Shop.Theme.Actions'}</span>
                    </div>
                {/if}
            </div>
        {elseif (isset($category) && $category.level_depth > 2 && !in_array($category.id, $notsow_categories_prod) && !in_array($category.id_parent, $notsow_categories_parent_prod))
        || $page.page_name == "module-pm_advancedsearch4-searchresults" || ($page.page_name == 'manufacturer' && (!isset($manufacturer_categories) || empty($manufacturer_categories)))}
            <section id="products">
                {if $listing.products|count}
                    <div>
                        {block name='product_list_top'}
                            {include file='catalog/_partials/products-top.tpl' listing=$listing}
                        {/block}
                    </div>
                    {block name='product_list_active_filters'}
                        <div id="" class="hidden-sm-down">
                            {$listing.rendered_active_filters nofilter}
                        </div>
                    {/block}
                    <div>
                        {block name='product_list'}
                            {include file='catalog/_partials/products.tpl' listing=$listing}
                        {/block}
                    </div>
                    <div id="js-product-list-bottom">
                        {block name='product_list_bottom'}
                            {include file='catalog/_partials/products-bottom.tpl' listing=$listing}
                        {/block}
                    </div>
                {else}
                    {*<div id="js-product-list-top"></div>*}
                    <div id="js-product-list">
                        {include file='errors/not-found.tpl'}
                    </div>
                    <div id="js-product-list-bottom"></div>
                {/if}
            </section>
            {*if category level is 4 and it's only for ceramic subcategories*}

        {elseif $page.page_name == 'search'}
            <section id="products" class="222">
                {if $listing.products|count}
                    <div>
                        {block name='product_list_top'}
                            {include file='catalog/_partials/products-top.tpl' listing=$listing}
                        {/block}
                    </div>
                    {block name='product_list_active_filters'}
                        <div id="" class="hidden-sm-down">
                            {$listing.rendered_active_filters nofilter}
                        </div>
                    {/block}
                    <div>
                        {block name='product_list'}
                            {include file='catalog/_partials/products.tpl' listing=$listing}
                        {/block}
                    </div>
                    <div id="js-product-list-bottom">
                        {block name='product_list_bottom'}
                            {include file='catalog/_partials/products-bottom.tpl' listing=$listing}
                        {/block}
                    </div>
                {else}
                    {*<div id="js-product-list-top"></div>*}
                    <div id="js-product-list">
                        {include file='errors/not-found.tpl'}
                    </div>
                    <div id="js-product-list-bottom"></div>
                {/if}
            </section>
        {/if}

        {hook h="displayFooterCategory"}

        <div id="js-product-list-footer">
            {if isset($category) && $category.additional_description && $listing.pagination.items_shown_from == 1}
                <div class="card">
                    <div class="card-block category-additional-description">
                        {$category.additional_description nofilter}
                    </div>
                </div>
            {/if}
        </div>



          {*compatibilidad elementor*}
        {if isset($smarty.get.ctx)}
            {block name='product_list_header'}
                <h1 id="js-product-list-header" class="h2">{$listing.label}</h1>
            {/block}
        {/if}

        {*block name='subcategory_list'}
          {if isset($subcategories) && $subcategories|@count > 0}
            {include file='catalog/_partials/subcategories.tpl' subcategories=$subcategories}
          {/if}
        {/block*}





{*        {if isset($category) && isset($category.seo_description)}*}
{*            <div class="seo-description">{$category.seo_description nofilter}</div>*}
{*        {/if}*}
    </section>
{/block}
