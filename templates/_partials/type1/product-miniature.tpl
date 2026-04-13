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
    <div class="product{*if !empty($productClasses)} {$productClasses}{/if*} {if $page.page_name == "index"}col-xs-6 col-sm-4 col-md-3 col-lg-20{else}col-xs-6 col-sm-4 col-md-3 {/if}">
        <article class="product-miniature js-product-miniature" data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}">

            <div class="thumbnail-container {if Configuration::get('ecommbaseconfiguration_secondimage') != 0} secondimage type{Configuration::get('ecommbaseconfiguration_secondimage')}{/if}">
                {block name='product_thumbnail'}
                    {if $product.cover}
                        <a href="{$product.url}" class="thumbnail product-thumbnail" title="{$product.name}">
                            <picture>
                                {if !empty($product.default_image.bySize.home_default.sources.avif)}
                                    <source srcset="{$product.default_image.bySize.home_default.sources.avif}" type="image/avif">
                                {/if}
                                {if !empty($product.default_image.bySize.home_default.sources.webp)}
                                    <source srcset="{$product.default_image.bySize.home_default.sources.webp}" type="image/webp">
                                {/if}
                                <img
                                        class="img-fluid"
                                        src="{$product.cover.bySize.home_default.url}"
                                        alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
                                        loading="lazy"
                                        data-full-size-image-url="{$product.cover.large.url}"
                                        width="{$product.cover.bySize.home_default.width}"
                                        height="{$product.cover.bySize.home_default.height}"
                                />
                            </picture>
                            {if Configuration::get('ecommbaseconfiguration_secondimage') != 0}
                                {assign var='ecommbaseconfigurationInstance' value=Module::getInstanceByName('ecommbaseconfiguration')}
                                {assign var="img_second_image" value=$ecommbaseconfigurationInstance->getSecondImage($product, Configuration::get('ecommbaseconfiguration_secondimage'))}
                                <picture class="secondimage">
                                    <img
                                            class="img-fluid"
                                            src="{if $img_second_image == false}{$product.cover.bySize.home_default.url}{else}{$img_second_image.home_default.url}{/if}"
                                            alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
                                            loading="lazy"
                                            width="{$img_second_image.home_default.width}"
                                            height="{$img_second_image.home_default.height}"
                                    />
                                </picture>
                            {/if}

                        </a>
                    {else}
                        <a href="{$product.url}" class="thumbnail product-thumbnail" title="{$product.name}">
                            <picture>
                                {if !empty($urls.no_picture_image.bySize.home_default.sources.avif)}<source srcset="{$urls.no_picture_image.bySize.home_default.sources.avif}" type="image/avif">{/if}
                                {if !empty($urls.no_picture_image.bySize.home_default.sources.webp)}<source srcset="{$urls.no_picture_image.bySize.home_default.sources.webp}" type="image/webp">{/if}
                                <img
                                        src="{$urls.no_picture_image.bySize.home_default.url}"
                                        loading="lazy"
                                        width="{$product.cover.bySize.home_default.width}"
                                        height="{$product.cover.bySize.home_default.height}"
                                />
                            </picture>
                        </a>
                    {/if}
                {/block}
                {include file='catalog/_partials/product-flags.tpl'}
                {hook h='displayecommzoom'  product=$product}
            </div>

            <div class="product-description">
                {block name='product_name'}
                    {if $page.page_name == 'index'}
                        <h3 class="h3 product-title"><a href="{$product.url}" content="{$product.url}">{$product.name|truncate:300:'...'}</a></h3>
                    {else}
                        <h2 class="h3 product-title"><a href="{$product.url}" content="{$product.url}">{$product.name|truncate:300:'...'}</a></h2>
                    {/if}
                {/block}

                <div class="reference_brand_content">
                    <div class="reference">
                        <span class="label">{l s='ref' d='Shop.Theme.Actions'}</span>
                        <span class="text">{$product.reference}</span>
                    </div>
                    <div class="brand">
{*                        <span class="label">{l s='marca' d='Shop.Theme.Actions'}</span>*}
                        <span class="label">{$product.manufacturer_name}</span>
                    </div>
                </div>

                {block name='product_price_and_shipping'}
                    {if $product.show_price}
                        <div class="product-price-and-shipping">
                            {if $product.has_discount}
                                {hook h='displayProductPriceBlock' product=$product type="old_price"}

                                <span class="regular-price" aria-label="{l s='Regular price' d='Shop.Theme.Catalog'}">{$product.regular_price}</span>
                                {if $product.discount_type === 'percentage'}
                                    <span class="discount-percentage discount-product">{$product.discount_percentage}</span>
                                {elseif $product.discount_type === 'amount'}
                                    <span class="discount-amount discount-product">{$product.discount_amount_to_display}</span>
                                {/if}
                            {/if}

                            {hook h='displayProductPriceBlock' product=$product type="before_price"}

                            <span class="price" aria-label="{l s='Price' d='Shop.Theme.Catalog'}">
                                {if Product::isMegaPack($product.id_product)}
                                	{l s='Desde' d='Shop.Theme.Actions'}
                                {else}
                                <span class="pvp">{l s='PVP' d='Shop.Theme.Actions'}</span>
                                {/if}
                                
                {capture name='custom_price'}{hook h='displayProductPriceBlock' product=$product type='custom_price' hook_origin='products_list'}{/capture}
                                {if '' !== $smarty.capture.custom_price}
                                    {$smarty.capture.custom_price nofilter}
                                {else}
                                    {$product.price}
                                {/if}
                                {assign var="m2" value=false}
                                {foreach from=$product.features item="feature"}
                                    {if $feature.id_feature == 24}
                                        {if $feature.id_feature_value != 718}
                                            {assign var="m2" value=true}
                                            <span>/{$feature.value}</span>
                                        {/if}
                                    {/if}
                                {/foreach}
                                <span class="taxinclabel">
                                {if $configuration.display_prices_tax_incl == false}
                                    {l s='(IVA excl.)' d='Shop.Theme.Actions'}
                                {else}
                                    {l s='(IVA incl.)' d='Shop.Theme.Actions'}
                                {/if}
                                </span>
                             </span>

                            {hook h='displayProductPriceBlock' product=$product type='unit_price'}

                            {hook h='displayProductPriceBlock' product=$product type='weight'}
                            
                            {*Hook del wishlist*}
                            {hook h='displayProductPriceBlockList' product=$product type='weight'}
                        </div>
                    {/if}
                {/block}

                {widget name='ecommaddtocart' hook='productlist' params=$product}

                {block name='product_reviews'}
                    {hook h='displayProductListReviews' product=$product}
                {/block}

{*                <div class="availability">*}
{*                    {if Product::isAvailableWhenOutOfStock($product.out_of_stock) || $product.quantity_all_versions > 0}*}
{*                        {if $product.quantity_all_versions <= 5}*}
{*                            <span class="unavailable">*}
{*                                {l s='Entrega inmediata' d='Shop.Theme.Actions'}*}
{*                            </span>*}
{*                        {else}*}
{*                            <span class="available">*}
{*                                {l s='Disponible' d='Shop.Theme.Actions'}*}
{*                            </span>*}
{*                        {/if}*}
{*                    {else}*}
{*                        <span class="unavailable">*}
{*                            {l s='Sin Stock' d='Shop.Theme.Actions'}*}
{*                        </span>*}
{*                    {/if}*}

{*                </div>*}
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
