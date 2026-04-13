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
<div id="_desktop_cart">
    <div class="blockcart cart-preview {if $cart.products_count > 0}active{else}inactive{/if}" data-refresh-url="{$refresh_url}">
        <div class="header">
            {if $cart.products_count > 0}
            <a rel="nofollow" aria-label="{l s='Shopping cart link containing %nbProducts% product(s)' sprintf=['%nbProducts%' => $cart.products_count] d='Shop.Theme.Checkout'}" href="{$cart_url}" title="{l s='Carrito' d='Shop.Theme.Actions'}" class="cartcont">
                {else}
                <div class="cartcont">
                {/if}
                <span class="icon-cart"></span>
{*                 <span class="hidden-md-down">{l s='Mi compra' d='Shop.Theme.Checkout'}</span>*}
                <span class="cart-products-count">{$cart.products_count}</span>
{*                 {if Configuration::get('ecommbaseconfiguration_header_type', true) == 2}*}
                    <span class="subtitle_link cart_total">{$cart.totals.total.value}</span>
{*                 {/if}*}
                {if $cart.products_count > 0}
            </a>
            {else}
        </div>
            {/if}
        </div>
    </div>

    <section class="lateral-popup cart-lateral-popup">
        <span class="close-popup"></span>
        {if $cart.products_count > 0}
            <span class="title-popup">{l s='Carrito' d='Shop.Theme.Actions'}</span>

            {hook h="feeshipping"}

            {foreach from=$cart.products item=product}
{*                {$product|dump}*}
                {if isset($product.productmega)}
                    {foreach from=$product.productmega item=mega name=productMegas}
                        <div class="product-item product-{$product.id_product}">
                            <div class="product-image">
                                <a href="{$product.url}" alt="{$product.name}">
                                    {if $product.default_image}
                                        <img src="{$product.default_image.bySize.small_default.url}" title="{$product.name}" >
                                    {else}
                                        <img src="{$urls.no_picture_image.bySize.large_default.url}" title="{$product.name}">
                                    {/if}
                                </a>
                            </div>
                            <div class="name_price_cart">
                                {*Modificar cantidad desactivado/activado*}

                                <a href="{$product.url}" alt="{$product.name}" class="product-name">{$product.name}</a>
                                <div class="attributes_content">
                                    {foreach from=$product.attributes item="property_value" key="property"}
                                        <span><strong>{$property}</strong>: {$property_value}</span><br>
                                    {/foreach}
                                    {if isset($mega.extraAttrLong)}{$mega.extraAttrSmall nofilter}{/if}
                                    <br/><i>{$mega.measure}</i>
                                    {if isset($mega.personalization) && $mega.personalization neq ''}
                                        <br/><div class="mp-personalization">{$mega.personalization nofilter}</div>
                                    {/if}
                                </div>

                                <div class='quantity-controls'>
                                {if $mega.boxes}
                                {else}
                                <span class="quantity">
                                  <button class="btn btn-subtract-cart" data-product-id='{$product.id_product}' data-product-combination-id='{$product.id_product_attribute}' data-mega="{$mega.id_megacart}" data-product-qty='{$product.quantity_wanted}' type="button">-</button>

                                  <span class="quantity">{$product.quantity_wanted}</span>
                                  <button class="btn btn-add-cart" data-product-id='{$product.id_product}' data-product-combination-id='{$product.id_product_attribute}' data-mega="{$mega.id_megacart}" data-product-qty='{$product.quantity_wanted}' type="button">+</button>
                                </span>
                                {/if}

                                    <div class="remove_product_cart">
                                        {assign var=data_product value='?'|explode:$product.remove_from_cart_url}
                                        <a href="#" alt="{l s='Eliminar' d='Modules.Ps_shoppincart.Shop'} {$product.name}" class="product-delete-cart" data-mega="{$mega.id_megacart}"  data-id-product="{$product.id_product}" data-product-combination-id='{$product.id_product_attribute}'>
                                            <i class="icon-trash"></i> {*l s='Eliminar' d='Modules.Ps_shoppincart.Shop'*}
                                        </a>
                                    </div>

                                    <div class="product-price">
                                        <span itemprop="price" class="price">
                                            {if $configuration.display_prices_tax_incl == 1}
                                                {$mega.spricewt}
                                            {else}
                                                {$mega.sprice}
                                            {/if}

                                        </span>

                                    </div>
                                </div>

                            </div>


                        </div>
                    {/foreach}
                {else}

                    <div class="product-item product-{$product.id_product}">
                        <div class="product-image">
                            <a href="{$product.url}" alt="{$product.name}">
                                {if $product.cover}
                                    <img src="{$product.cover.bySize.small_default.url}" title="{$product.name}" >
                                {else}
                                    <img src="{$urls.no_picture_image.bySize.large_default.url}" title="{$product.name}">
                                {/if}
                            </a>
                        </div>
                        <div class="name_price_cart">
                            {*Modificar cantidad desactivado/activado*}
                            {if false}
                                <a href="{$product.url}" alt="{$product.name}" class="product-name"><span class="quantity">{$product.quantity_wanted}</span> x {$product.name}</a>
                                <div class="attributes_content">
                                    {foreach from=$product.attributes item="property_value" key="property"}
                                        <span><strong>{$property}</strong>: {$property_value}</span><br>
                                    {/foreach}
                                </div>
                                <div class="product-price">
                                    <span itemprop="price" class="price">{$product.total}</span>
                                </div>
                            {else}
                                <a href="{$product.url}" alt="{$product.name}" class="product-name">{$product.name}</a>
                                <div class="attributes_content">
                                    {foreach from=$product.attributes item="property_value" key="property"}
                                        <span><strong>{$property}</strong>: {$property_value}</span><br>
                                    {/foreach}
                                </div>

                                <div class='quantity-controls'>
                                <span class="quantity">
                                  <button class="btn btn-subtract-cart event-remove-cart" data-product-id='{$product.id_product}' data-product-combination-id='{$product.id_product_attribute}' data-product-qty='{$product.quantity_wanted}' type="button">-</button>

                                  <span class="quantity">{$product.quantity_wanted}</span>
                                  <button class="btn btn-add-cart event-add-cart" data-product-id='{$product.id_product}' data-product-combination-id='{$product.id_product_attribute}' data-product-qty='{$product.quantity_wanted}' type="button">+</button>
                                </span>

                                    <div class="remove_product_cart">
                                        {assign var=data_product value='?'|explode:$product.remove_from_cart_url}
                                        <a href="#" alt="{l s='Eliminar' d='Modules.Ps_shoppincart.Shop'} {$product.name}" class="product-delete-cart event-remove-cart"  data-product-id="{$product.id_product}" data-product-combination-id='{$product.id_product_attribute}'>
                                            <i class="icon-trash"></i> {*l s='Eliminar' d='Modules.Ps_shoppincart.Shop'*}
                                        </a>
                                    </div>

                                    <div class="product-price">
                                        <span itemprop="price" class="price">{$product.total}</span>
                                        {if $product.has_discount}
                                            <span class="oldprice">{$product.regular_price}</span>
                                        {/if}
                                    </div>
                                </div>
                            {/if}
                        </div>


                    </div>
                {/if}
            {/foreach}


            <div class="cart-bottom">
                <div class="desglose">
                    <div class="subtotal">
                        <span class="name">{l s='Subtotal' d='Modules.Ps_shoppincart.Shop'}</span>
                        <span class="value">{$cart.subtotals.products.value}</span>
                    </div>
                    {if isset($cart.subtotals.discounts.value) && $cart.subtotals.discounts.value >0}
                        <div class="discount">
                            <span class="name">{l s='Descuento' d='Modules.Ps_shoppincart.Shop'}</span>
                            <span class="value">{$cart.subtotals.discounts.value}</span>
                        </div>
                    {/if}
                    <div class="shipping">
                        <span class="name">{l s='Envío' d='Modules.Ps_shoppincart.Shop'}</span>
                        <span class="value">{$cart.subtotals.shipping.value}</span>
                    </div>
                    <div class="total">
                        <span class="name">
                            {l s='Total' d='Modules.Ps_shoppincart.Shop'}
{*                            x{$configuration.display_prices_tax_incl}x*}
{*                            {if $configuration.display_prices_tax_incl == 1}*}
{*                                {l s='(IVA incl.)' d='Shop.Theme.Actions'}*}
{*                            {else}*}
                                {l s='(IVA excl.)' d='Shop.Theme.Actions'}
{*                            {/if}*}
                        </span>
                        <span class="value">{$cart.totals.total_excluding_tax.value}</span>
                    </div>
                    <div class="total">
                        <span class="name">
                            {l s='Total' d='Modules.Ps_shoppincart.Shop'}
                            {l s='(IVA incl.)' d='Shop.Theme.Actions'}
                            {*                            x{$configuration.display_prices_tax_incl}x*}

                        </span>
                        <span class="value">{$cart.totals.total_including_tax.value}</span>
                    </div>
                </div>
                <div class="buy">
                    <a href="{$cart_url}{*$urls.pages.order*}" alt="{l s='Pasar por caja' d='Modules.Ps_shoppincart.Shop'}" class="btn btn-primary">{l s='Pasar por caja' d='Modules.Ps_shoppincart.Shop'}</a>
                    <a href="#" onclick="$('.close-popup').click(); return false;" alt="{l s='Seguir comprando' d='Modules.Ps_shoppincart.Shop'}" class="btn btn-secondary">{l s='Seguir comprando' d='Modules.Ps_shoppincart.Shop'}</a>
                </div>
            </div>
        {else}
            <div class="empty_cart mt-5">
                <span>{l s='Carrito vacío' d='Shop.Theme.Actions'}</span>
            </div>
        {/if}


    </section>
</div>
<div class="overlay-lateral-popup" onclick="$('.close-popup').click(); return false;"></div>
