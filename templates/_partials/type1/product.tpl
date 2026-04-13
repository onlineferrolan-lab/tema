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

{block name='head' append}
    <meta property="og:type" content="product">
    {if $product.cover}
        <meta property="og:image" content="{$product.cover.large.url}">
    {/if}

    {if $product.show_price}
        <meta property="product:pretax_price:amount" content="{$product.price_tax_exc}">
        <meta property="product:pretax_price:currency" content="{$currency.iso_code}">
        <meta property="product:price:amount" content="{$product.price_amount}">
        <meta property="product:price:currency" content="{$currency.iso_code}">
    {/if}
    {if isset($product.weight) && ($product.weight != 0)}
        <meta property="product:weight:value" content="{$product.weight}">
        <meta property="product:weight:units" content="{$product.weight_unit}">
    {/if}
{/block}

{block name='head_microdata_special'}
    {include file='_partials/microdata/product-jsonld.tpl'}
{/block}

{block name='content'}
    <section id="main">
        <meta content="{$product.url}">

        <div class="row product-container js-product-container">
            <div class="col-md-7 leftcolumn">
                {block name='page_content_container'}
                    <section class="page-content" id="content">
                        {block name='page_content'}
                            {include file='catalog/_partials/product-flags.tpl'}

                            {block name='product_cover_thumbnails'}
                                {include file='catalog/_partials/product-cover-thumbnails.tpl'}
                            {/block}
                            <div class="scroll-box-arrows">
                                <i class="material-icons left">&#xE314;</i>
                                <i class="material-icons right">&#xE315;</i>
                            </div>

                        {/block}
                    </section>
                {/block}








            </div>
            <div class="col-md-5 rightcolumn">
                <div class="contentbg">


{*                <div class="manufacturer_content row">*}
{*                    {block name='product_reference'}*}
{*                        {if isset($product_manufacturer->id)}*}
{*                            <div class="product-manufacturer col-6">*}
{*                                *}{*                                {if isset($manufacturer_image_url)}*}
{*                                *}{*                                    <a href="{$product_brand_url}">*}
{*                                *}{*                                        <img src="{$manufacturer_image_url}" class="img img-fluid manufacturer-logo" alt="{$product_manufacturer->name}" loading="lazy">*}
{*                                *}{*                                    </a>*}
{*                                *}{*                                {else}*}
{*                                <label class="label">{l s='Brand' d='Shop.Theme.Catalog'}:</label>*}
{*                                <span>*}
{*                                        <a href="{$product_brand_url}">{$product_manufacturer->name}</a>*}
{*                                    </span>*}
{*                                *}{*                                {/if}*}
{*                            </div>*}
{*                        {/if}*}
{*                        {if isset($product.reference_to_display) && $product.reference_to_display neq ''}*}
{*                            <div class="product-reference col-6 {if isset($product_manufacturer->id)}text-end{/if}">*}
{*                                <label class="label">{l s='Ref:' d='Shop.Theme.Catalog'} </label>*}
{*                                <span>{$product.reference_to_display}</span>*}
{*                            </div>*}
{*                        {/if}*}
{*                    {/block}*}
{*                </div>*}

                    <div class="row topproduct">
                        <div class="col-12 col-sm-12">
                            {block name='page_header_container'}
                                {block name='page_header'}
                                    <h1 class="h1">{block name='page_title'}{$product.name}{/block}</h1>
                                {/block}
                            {/block}
                        </div>

                        <div id="_desktop_commentsblock">
                            <div class="col-12 col-sm-7 comments">
                                {hook h='productcommentsstars' product=$product}
                            </div>
                        </div>
                        <div class="col-8 reference">
                            {if isset($product.reference_to_display) && $product.reference_to_display neq ''}
                                <div class="product-reference">
                                    <label class="label">{l s='Referencia:' d='Shop.Theme.Catalog'} </label>
                                    <span>{$product.reference_to_display}</span>
                                </div>
                            {/if}
                            <div class="page-category-container">
                                {if $product["category_name"] == "Cerámica" || $product["category_name"] == "Grifería" || $product["category_name"] == "Azulejos"}
                                    {assign var="lastsubcategory" value=Product::getProductLastCategoryFull($product.id_product)}
                                    {*                            <a href="{$urls.base_url}{$lastsubcategory.id_category}-{$lastsubcategory.link_rewrite}"*}
                                    <a href="{$link->getCategoryLink($lastsubcategory.id_category)}"
                                       class="page-subcategory-link mb-0 mt-1">
                                <span class="view-more-colection">
                                    {l s='Descubre más de la colección' d='Shop.Theme.Catalog'}
                                    {$lastsubcategory.name}
                                </span>
                                    </a>
                                {/if}
                            </div>
                        </div>
                        <div class="col-4 manufacturer">
                            {if isset($manufacturer_image_url)}
                                <a href="{$product_brand_url}">
                                    <img src="{$manufacturer_image_url}" class="img img-fluid manufacturer-logo" alt="{$product_manufacturer->name}" loading="lazy">
                                </a>
                            {else}
                                <span>
                                    <a href="{$product_brand_url}">{$product_manufacturer->name}</a>
                                </span>
                            {/if}
                        </div>
                        <div id="_mobile_commentsblock"></div>
                    </div>



                {block name='product_prices'}
                    {include file='catalog/_partials/product-prices.tpl'}
                {/block}
                    {hook h='displayLateralList' product=$product}

                    <div class="product-information">
                    {block name='product_description_short'}
                        <div id="product-description-short-{$product.id}" class="product-description">{$product.description_short nofilter}</div>
                    {/block}

                    {if $product.is_customizable && count($product.customizations.fields)}
                        {block name='product_customization'}
                            {include file="catalog/_partials/product-customization.tpl" customizations=$product.customizations}
                        {/block}
                    {/if}
                    
                    {hook h='displayMegaproduct' product=$product}

                    <div class="product-actions js-product-actions">
                        {block name='product_buy'}
                            <form action="{$urls.pages.cart}" method="post" id="add-to-cart-or-refresh">
                                <input type="hidden" name="token" value="{$static_token}">
                                <input type="hidden" name="id_product" value="{$product.id}" id="product_page_product_id">
                                <input type="hidden" name="id_customization" value="{$product.id_customization}" id="product_customization_id" class="js-product-customization-id">

                                {block name='product_variants'}
                                    {include file='catalog/_partials/product-variants.tpl'}
                                {/block}

                                {block name='product_pack'}
                                    {if $packItems}
                                        <section class="product-pack">
                                            <p class="h4">{l s='This pack contains' d='Shop.Theme.Catalog'}</p>
                                            {foreach from=$packItems item="product_pack"}
                                                {block name='product_miniature'}
                                                    {include file='catalog/_partials/miniatures/pack-product.tpl' product=$product_pack showPackProductsPrice=$product.show_price}
                                                {/block}
                                            {/foreach}
                                        </section>
                                    {/if}
                                {/block}

                                {block name='product_discounts'}
                                    {include file='catalog/_partials/product-discounts.tpl'}
                                {/block}

                                {hook h='displayecommsynccolors'}

                                {block name='product_add_to_cart'}
                                    {include file='catalog/_partials/product-add-to-cart.tpl'}
                                {/block}

                                <div class="blockwishlistdownloadcontent">
                                    {*Hook wishlist product*}
                                    <div class="wishlistcontent">
                                        {hook h='displayProductWishList' product=$product}
                                    </div>
                                    {block name='product_attachments'}
                                        {if $product.attachments}
                                                {foreach from=$product.attachments item=attachment}
                                                           <div class="attachmentbtn">
                                                                <a href="{url entity='attachment' params=['id_attachment' => $attachment.id_attachment]}" title="{l s='Descargar la ficha técnica' d='Shop.Theme.Actions'}">
                                                                    <img src="{$urls.img_url}download.svg" class="download" title="{l s='Descargar la ficha técnica' d='Shop.Theme.Actions'}">
                                                                    <span class="txt">
                                                                        {l s='Descargar la ficha técnica' d='Shop.Theme.Actions'}
                                                                    </span>
                                                                </a>
                                                            </div>
                                                    {/foreach}
                                        {/if}
                                    {/block}
                                </div>

                                {hook h='displayWarehouse' product=$product}

                                {block name='product_additional_info'}
                                    {include file='catalog/_partials/product-additional-info.tpl'}
                                {/block}

                                {* Input to refresh product HTML removed, block kept for compatibility with themes *}
                                {block name='product_refresh'}{/block}
                            </form>
                        {/block}

                    </div>

                    {block name='hook_display_reassurance'}
                        {hook h='displayReassurance'}
                    {/block}



                </div>
            </div>
        </div>
        </div>




        {block name='product_tabs'}
            <div class="tabs" role="tablist">
                <ul class="nav nav-tabs">
                    {if $product.description}
                        <li class="nav-item">
                            <a
                                    class="nav-link{if $product.description} active js-product-nav-active{/if}"
                                    data-toggle="tab"
                                    href="#description"
                                    role="tab"
                                    aria-controls="description"
                                    {if $product.description} aria-selected="true"{/if}>{l s='Description' d='Shop.Theme.Catalog'}</a>
                        </li>
                    {/if}
                    <li class="nav-item">
                        <a
                                class="nav-link{if !$product.description} active js-product-nav-active{/if}"
                                data-toggle="tab"
                                href="#product-details"
                                role="tab"
                                aria-controls="product-details"
                                {if !$product.description} aria-selected="true"{/if}>{l s='Ficha técnica' d='Shop.Theme.Catalog'}</a>
{*                    </li>*}
{*                    {if $product.attachments}*}
{*                        <li class="nav-item">*}
{*                            <a*}
{*                                    class="nav-link"*}
{*                                    data-toggle="tab"*}
{*                                    href="#attachments"*}
{*                                    role="tab"*}
{*                                    aria-controls="attachments">{l s='Attachments' d='Shop.Theme.Catalog'}</a>*}
{*                        </li>*}
{*                    {/if}*}
                    {foreach from=$product.extraContent item=extra key=extraKey}
                        <li class="nav-item">
                            <a
                                    class="nav-link"
                                    data-toggle="tab"
                                    href="#extra-{$extraKey}"
                                    role="tab"
                                    aria-controls="extra-{$extraKey}">{$extra.title}</a>
                        </li>
                    {/foreach}
                </ul>

                <div class="tab-content" id="tab-content">
                	  <div class="tab-pane fade in{if $product.description} active js-product-tab-active{/if}" id="description" role="tabpanel">
                    		
                        {block name='product_description'}
                            <div class="product-description">{$product.description nofilter}</div>
                        {/block}
                        <div id="mpProductDescriptions"></div>
                    </div>

                    {block name='product_details'}

                        {include file='catalog/_partials/product-details.tpl'}
                    {/block}



                    {foreach from=$product.extraContent item=extra key=extraKey}
                    <div class="tab-pane fade in {$extra.attr.class}" id="extra-{$extraKey}" role="tabpanel" {foreach $extra.attr as $key => $val} {$key}="{$val}"{/foreach}>
                    {$extra.content nofilter}
                		</div>
                {/foreach}
            </div>
            </div>
        {/block}


        <div id="_mobile_tabs"></div>

        {block name='product_accessories'}
            {if $accessories}
                <section class="product-accessories clearfix">
                    <p class="h5 text-uppercase">{l s='You might also like' d='Shop.Theme.Catalog'}</p>
                    <div class="products owl-carousel" dots="false" nav="true">
                        {foreach from=$accessories item="product_accessory" key="position"}
                            {block name='product_miniature'}
                                {include file='catalog/_partials/miniatures/product.tpl' product=$product_accessory position=$position}
                            {/block}
                        {/foreach}
                    </div>
                </section>
            {/if}
        {/block}


          <div id="_mobile_description">

        </div>


            {block name='product_footer'}
                {hook h='displayFooterProduct' product=$product category=$category}
            {/block}

        {block name="tiendas_productos"}
            <div class="shopsproduct_content">
                <span class="tiendas_title">{l s='Tiendas Ferrolan donde ver este producto' d='Shop.Theme.Product'}</span>
                <ul class="container_tiendas owl-carousel owl-theme" items="3-3-2-2" dots="true" nav="false" margin="15">

                    {foreach from=$product.features item=tiendas}

                        {if $tiendas.name == "Tiendas"}
                            <li>
                            {if $tiendas.value == "Magatzem Central" || $tiendas.value == 1}
                                <a href="{$link->getCMSLink('6')}" title="{l s='Santa Coloma Gramenet' d='Shop.Theme.Product'}">
                                    <img class="tiendas_img"
                                         src="/img/st/1-stores_default.jpg" title="{l s='Santa Coloma Gramenet' d='Shop.Theme.Product'}" />
                                    <span>{l s='Santa Coloma Gramenet' d='Shop.Theme.Product'}</span>
                                </a>
                            {/if}

                            {if $tiendas.value == "Delegació Badalona" || $tiendas.value == 4}
                                <a href="{$link->getCMSLink('7')}" title="{l s='Badalona' d='Shop.Theme.Product'}">
                                    <img class="tiendas_img"
                                         src="/img/st/2-stores_default.jpg" title="{l s='Badalona' d='Shop.Theme.Product'}" />
                                    <span>{l s='Badalona' d='Shop.Theme.Product'}</span>
                                </a>
                            {/if}

                            {if $tiendas.value == "Delegació Rubí" || $tiendas.value == 2}
                                <a href="{$link->getCMSLink('8')}" title="{l s='Rubí' d='Shop.Theme.Product'}">
                                    <img class="tiendas_img"
                                         src="/img/st/3-stores_default.jpg" title="{l s='Rubí' d='Shop.Theme.Product'}" />
                                    <span>{l s='Rubí' d='Shop.Theme.Product'}</span>
                                </a>
                            {/if}

                            {if $tiendas.value == "Delegació Barcelona" || $tiendas.value == 3}
                                <a href="{$link->getCMSLink('9')}" title="{l s='Barcelona' d='Shop.Theme.Product'}">
                                    <img class="tiendas_img"
                                         src="/img/st/4-stores_default.jpg" title="{l s='Barcelona' d='Shop.Theme.Product'}" />
                                    <span>{l s='Barcelona' d='Shop.Theme.Product'}</span>
                                </a>
                            {/if}

                            {if $tiendas.value == "Grame Gres Central" || $tiendas.value == 61}
                                <a href="{$link->getCMSLink('10')}" title="{l s='Outlet Central' d='Shop.Theme.Product'}">
                                    <img class="tiendas_img"
                                         src="/img/st/5-stores_default.jpg" title="{l s='Outlet Central' d='Shop.Theme.Product'}" />
                                    <span>{l s='Outlet Central' d='Shop.Theme.Product'}</span>
                                </a>
                            {/if}

                            {if $tiendas.value == "Grame Gres Fondo" || $tiendas.value == 62}
                                <a href="{$link->getCMSLink('11')}" title="{l s='Outlet Fondo' d='Shop.Theme.Product'}">
                                    <img class="tiendas_img"
                                         src="/img/st/6-stores_default.jpg" title="{l s='Outlet Fondo' d='Shop.Theme.Product'}" />
                                    <span>{l s='Outlet Fondo' d='Shop.Theme.Product'}</span>
                                </a>
                            {/if}

                            {if $tiendas.value == "Urgell Barcelona Eixample" || $tiendas.value == 5}
                                <a href="{$link->getCMSLink('81')}" title="{l s='Barcelona - Eixample' d='Shop.Theme.Product'}">
                                    <img class="tiendas_img"
                                         src="/img/st/7-stores_default.jpg" title="{l s='Barcelona - Eixample' d='Shop.Theme.Product'}" />
                                    <span>{l s='Barcelona - Eixample' d='Shop.Theme.Product'}</span>
                                </a>
                            {/if}

                            {*if $tiendas.value == "Grame Gres"}
                               <a href="https://ferrolan.es/content/10-outlet-central">
                                    <img class="tiendas_img" src="https://ferrolan17.ecomm360.net/img/st/1-stores_default.jpg"/>
                                </a>
                            {/if*}
                            </li>
                        {/if}

                    {/foreach}
                </ul>
            </div>
        {/block}
    </section>
{/block}