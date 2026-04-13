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

{block name='product_miniature_item'}
    {*    {dump($product)}*}
    <div class="product{*if !empty($productClasses)} {$productClasses}{/if*} {if ($product.product_type === 'combinations')}combined-product{/if} {if $page.page_name == "index"}col-xs-6 col-sm-3 col-lg-20{else}col-xs-6 col-sm-4{/if}">
        <article class="product-miniature js-product-miniature" data-id-product="{$product.id_product}"
                 data-id-product-attribute="{$product.id_product_attribute}">

            <div class="thumbnail-container">
                {block name='product_thumbnail'}
                    {if $product.cover}
                        <a {*data-toggle="modal" data-target="#exampleModal{$product.id}"*} href="{$product.url}"
                                                                                            class="thumbnail product-thumbnail d-flex"
                                                                                            title="{$product.name}">
                            <img
                                    class="img-fluid"
                                    src="{$product.cover.bySize.home_default.url}"
                                    alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
                                    loading="lazy"
                                    data-full-size-image-url="{$product.cover.large.url}"
                                    width="{$product.cover.bySize.home_default.width}"
                                    height="{$product.cover.bySize.home_default.height}"
                                    productId="{$product.id_product}"
                            />
                        </a>
                    {else}
                        <a href="{$product.url}" class="thumbnail product-thumbnail" title="{$product.name}">
                            <img
                                    src="{$urls.no_picture_image.bySize.home_default.url}"
                                    loading="lazy"
                                    width="{$product.cover.bySize.home_default.width}"
                                    height="{$product.cover.bySize.home_default.height}"
                            />
                        </a>
                    {/if}
                {/block}
                {include file='catalog/_partials/product-flags.tpl'}
            </div>
            
            <div class="product-description d-flex">
                <div class="product_name d-flex">
                    {block name='product_name'}
                        {if $page.page_name == 'index'}
                            <h3 class="h3 product-title" productId="{$product.id_product}"><a href="{$product.url}"
                                                            content="{$product.url}">{$product.name}</a>
                            </h3>
                        {else}
                            <h2 class="h3 product-title" productId="{$product.id_product}"><a href="{$product.url}"
                                                            content="{$product.url}">{$product.name}</a>
                            </h2>
                        {/if}
                    {/block}
                   
                </div>
            
            
                
                <div class="left_product_description">
                     {if $product.reference || $product.manufacturer_name}
                       <div class="ref_manufacturer_box d-flex">
                            {if $product.reference}
                                <span><strong>{l s='ref' d='Shop.Theme.Catalog'}</strong> {$product.reference}</span>
                            {/if}
                            {if $product.manufacturer_name}
                                {assign var=manufacturer value=" "|explode:$product.manufacturer_name}
                                
                                <span><strong>{l s='marca' d='Shop.Theme.Catalog'}</strong> {$manufacturer[0]}</span>
                            {/if}
                       </div>
                    {/if}
                    {block name='product_price_and_shipping'}
                        {if $product.show_price}
                            <div class="product-price-and-shipping">
                                {if $product.has_discount}
                                    {hook h='displayProductPriceBlock' product=$product type="old_price"}
                                    <span class="regular-price"
                                          aria-label="{l s='Regular price' d='Shop.Theme.Catalog'}">{$product.regular_price}</span>
                                    {if $product.discount_type === 'percentage'}
                                        <span class="discount-percentage discount-product">{$product.discount_percentage}</span>
                                    {elseif $product.discount_type === 'amount'}
                                        <span class="discount-amount discount-product">{$product.discount_amount_to_display}</span>
                                    {/if}
                                {/if}
    
                                {hook h='displayProductPriceBlock' product=$product type="before_price"}
    
                                <span class="price" aria-label="{l s='Price' d='Shop.Theme.Catalog'}">
                    {capture name='custom_price'}{hook h='displayProductPriceBlock' product=$product type='custom_price' hook_origin='products_list'}{/capture}
                                    {if '' !== $smarty.capture.custom_price}
                                        {$smarty.capture.custom_price nofilter}
                                    {else}
                                        {$product.price}
                                    {/if}
                  </span>
    
                                {hook h='displayProductPriceBlock' product=$product type='unit_price'}
                                
                                {hook h='displayProductPriceBlock' product=$product type='weight'}
                                
                                {*Hook del wishlist*}
                                {hook h='displayProductPriceBlockList' product=$product type='weight'}
    
    
                            </div>
                        {/if}
                    {/block}
                </div>
                <div class="right_product_description">
                   {widget name='ecommaddtocart' hook='productlist' params=$product}  
                </div>
                 {block name='product_availability'}
               
                    <span id="product-availability" class="js-product-availability {if $product.availability == 'available'} available {elseif $product.availability == 'last_remaining_items'} last_remaining_itemslast_remaining_items {else} nostock {/if}">
                            {if $product.show_availability}
                                {if $product.availability == 'available'}
                                    {l s='Disponible' d='Shop.Theme.Catalog'}
                                {elseif $product.availability == 'last_remaining_items'}
                                    {l s='Pocas unidades' d='Shop.Theme.Catalog'}
                                {else}
                                    {l s='Sin stock' d='Shop.Theme.Catalog'}
                                {/if}
                                {*$product.availability_message*}
                            {/if}
                        </span>
                {/block}
                <!-- The Modal -->
                <div id="myModal{$product.id_product}" class="table-modal-container" productId="{$product.id_product}">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close modal-header">&times;</span>

                        <div class="row modal-top-content">
                            <div class="col">
                                <img
                                        class="img-fluid"
                                        src="{$product.cover.bySize.home_default.url}"
                                        alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
                                        loading="lazy"
                                        data-full-size-image-url="{$product.cover.large.url}"
                                        width="{$product.cover.bySize.home_default.width}"
                                        height="{$product.cover.bySize.home_default.height}"
                                        productId="{$product.id_product}"
                                />
                            </div>

                            <div class="col-10">
                                <div class="row">
                                    <span class="h1 col-10">
                                        {$product.name|truncate:30:'...'}</a>
                                    </span>
                                    <a href="{$product.url}" class="col-1">
                                        <button class="btn">Ver más</button>
                                    </a>

                                </div>

                                <div class="row ms-1">
                                    <span class="my-1">Marca: {$product.manufacturer_name}</span>
                                    <span>{$product.description_short nofilter}</span>

                                </div>
                            </div>

                        </div>

                        {block name='product_reviews'}
                            {hook h='displayProductListReviews' product=$product}
                        {/block}
                    </div>
                </div>
            </div>


            {*<div class="highlighted-informations{if !$product.main_variants} no-variants{/if} hidden-sm-down">
              {block name='quick_view'}
                <a class="quick-view js-quick-view" href="#" data-link-action="quickview">
                  <i class="material-icons search">&#xE8B6;</i> {l s='Quick view' d='Shop.Theme.Actions'}
                </a>
              {/block}

              {block name='product_variants'}
                {if $product.main_variants}
                  {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
                {/if}
              {/block}
            </div>*}

        </article>
        {hook h='ecommercehiddenfeatures' product=$product}
    </div>
{/block}
