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
        <meta property="og:width" content="{$product.cover.large.width}">
        <meta property="og:height" content="{$product.cover.large.height}">
    {/if}
    <meta property="og:alt" content="{$product.name}">
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
            
            {block name='page_header_container'}
                    {block name='page_header'}
                        <div id="_desktop_product_name">
                            <h1 class="h1">{block name='page_title'}{$product.name}{/block}</h1>
                        </div>
                    {/block}
                {/block}               
            <div class="col-md-6 leftcolumn">
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
            <div class="col-md-6 rightcolumn">

                <div id="_mobile_product_name">
                </div>
                 <div class="container_info_product">
                    <div class="manufacturer_content d-flex">
                        {block name='product_reference'}
                            {if isset($product.reference_to_display) && $product.reference_to_display neq ''}
                                <div class="product-reference col-7">
                                    <label class="label">{l s='Ref:' d='Shop.Theme.Catalog'} </label>
                                    <span>{$product.reference_to_display}</span>
                                </div>
                            {/if}
                            {if isset($product_manufacturer->id)}
                                <div class="product-manufacturer col-5  {if isset($product.reference_to_display)}text-end{/if}">
                                    {*                                {if isset($manufacturer_image_url)}*}
                                    {*                                    <a href="{$product_brand_url}">*}
                                    {*                                        <img src="{$manufacturer_image_url}" class="img img-fluid manufacturer-logo" alt="{$product_manufacturer->name}" loading="lazy">*}
                                    {*                                    </a>*}
                                    {*                                {else}*}
                                    <label class="label">{l s='Autor' d='Shop.Theme.Catalog'}:</label>
                                    <span>
                                            <a href="{$product_brand_url}">{$product_manufacturer->name}</a>
                                        </span>
                                    {*                                {/if}*}
                                </div>
                            {/if}
                            
                        {/block}
                    </div>
                    <div class="product_assets">
                        <div class="comment_share_container">
                            {block name='hook_display_reassurance'}
                                {hook h='displayReassurance'}
                            {/block}
                        </div>
                        
                        {block name='product_description_short'}
                            <div id="product-description-short-{$product.id}" class="product-description">{$product.description_short nofilter}</div>
                        {/block}
                        
                        <div id="_mobile_price_block"></div>
                    </div>
                   
    
                    <div class="product-information">
                        
    
                        {if $product.is_customizable && count($product.customizations.fields)}
                            {block name='product_customization'}
                                {include file="catalog/_partials/product-customization.tpl" customizations=$product.customizations}
                            {/block}
                        {/if}
    
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
                                    <div class="price_wishlist d-flex">
                                        {block name='product_prices'}
                                            {include file='catalog/_partials/product-prices.tpl'}
                                        {/block}
                                        {*Hook wishlist product*}
                                        {*<div id="_desktop_wishlist">
                                            {hook h='displayProductWishList' product=$product}
                                        </div>*}
                                    </div>
                                    
                                    {hook h='displayecommsynccolors'}
    
                                    {block name='product_add_to_cart'}
                                        {include file='catalog/_partials/product-add-to-cart.tpl'}
                                    {/block}
    
    
    
    
                                    {block name='product_additional_info'}
                                        {include file='catalog/_partials/product-additional-info.tpl'}
                                    {/block}
    
                                    {* Input to refresh product HTML removed, block kept for compatibility with themes *}
                                    {block name='product_refresh'}{/block}
                                </form>
                            {/block}
    
                        </div>
    
                        
    
    
                    </div>
                    <div id="_mobile_share_product"></div>
                </div>

                {block name='product_tabs'}
                <div id="_desktop_tabs">
                <div class="tabs">
                    <ul class="nav nav-tabs" role="tablist">
                        {if $product.description}
                            <li class="nav-item">
                                <a
                                        class="nav-link{if $product.description} active js-product-nav-active{/if}"
                                        data-toggle="tab"
                                        href="#description"
                                        role="tab"
                                        aria-controls="description"
                                        {if $product.description} aria-selected="true"{/if}>{l s='Información' d='Shop.Theme.Catalog'}</a>
                                <div class="content_mobile" rel="description"></div>
                            </li>
                        {/if}
                        <li class="nav-item">
                            <a
                                    class="nav-link{if !$product.description} active js-product-nav-active{/if}"
                                    data-toggle="tab"
                                    href="#product-details"
                                    role="tab"
                                    aria-controls="product-details"
                                    {if !$product.description} aria-selected="true"{/if}>{l s='Product Details' d='Shop.Theme.Catalog'}</a>
                            <div class="content_mobile" rel="product-details">

                            </div>
                        </li>
                        {if $product.attachments}
                            <li class="nav-item">
                                <a
                                        class="nav-link"
                                        data-toggle="tab"
                                        href="#attachments"
                                        role="tab"
                                        aria-controls="attachments">{l s='Attachments' d='Shop.Theme.Catalog'}</a>
                            </li>
                        {/if}
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

                    <div class="tab-content hidden-sm-down" id="tab-content">
                        <div class="tab-pane fade in{if $product.description} active js-product-tab-active{/if}" id="description" role="tabpanel">
                             
                            <span class="title_tab">{l s='Información' d='Shop.Theme.Catalog'}</span>
                            
                            {block name='product_description'}
                                <div class="product-description">{$product.description nofilter}</div>
                            {/block}
                        </div>

                        {block name='product_details'}
                            {include file='catalog/_partials/product-details.tpl'}
                        {/block}

                        {block name='product_attachments'}
                            {if $product.attachments}
                                <div class="tab-pane fade in" id="attachments" role="tabpanel">
                                    <section class="product-attachments">
                                        <p class="h5 text-uppercase">{l s='Download' d='Shop.Theme.Actions'}</p>
                                        {foreach from=$product.attachments item=attachment}
                                            <div class="attachment">
                                                <h4><a href="{url entity='attachment' params=['id_attachment' => $attachment.id_attachment]}">{$attachment.name}</a></h4>
                                                <p>{$attachment.description}</p>
                                                <a href="{url entity='attachment' params=['id_attachment' => $attachment.id_attachment]}">
                                                    {l s='Download' d='Shop.Theme.Actions'} ({$attachment.file_size_formatted})
                                                </a>
                                            </div>
                                        {/foreach}
                                    </section>
                                </div>
                            {/if}
                        {/block}

                        {foreach from=$product.extraContent item=extra key=extraKey}
                        <div class="tab-pane fade in {$extra.attr.class}" id="extra-{$extraKey}" role="tabpanel" {foreach $extra.attr as $key => $val} {$key}="{$val}"{/foreach}>
                        {$extra.content nofilter}
                    </div>
                    {/foreach}
                </div>
                </div>
                </div>
                {/block}

            </div>
        </div>


        <div id="_mobile_tabs"></div>

        {*block name='product_accessories'}
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
        {/block*}

        <div id="_mobile_description">

        </div>
        <div class="footer_page_product">
            <div class="spinner" style="display:none;"></div>
        
            {block name='product_footer'}
                {hook h='displayCustomProductFooter' product=$product category=$category}
            {/block}
            
            {block name='product_footer'}
                {hook h='displayFooterProduct' product=$product category=$category}
            {/block}
        </div>
        {block name='product_images_modal'}
            {include file='catalog/_partials/product-images-modal.tpl'}
        {/block}

        {block name='page_footer_container'}
            <footer class="page-footer">
                {block name='page_footer'}
                    <!-- Footer content -->
                {/block}
            </footer>
        {/block}
    </section>

{/block}
