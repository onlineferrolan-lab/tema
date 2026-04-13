{*{extends file='checkout/_partials/cart-summary.tpl'}*}

{*{block name='cart_summary_products'}*}
{*    {include file='module:ecomm_pscheckout/views/templates/front/_partials/cart-summary-products.tpl' cart=$cart}*}
{*{/block}*}


{*{include file='module:ecomm_pscheckout/views/templates/front/_partials/cart-voucher.tpl' cart=$cart}*}

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
<section id="js-checkout-summary" class="card js-cart" data-refresh-url="{$urls.pages.cart}?ajax=1&action=refresh">
    {block name='hook_checkout_summary_top'}
        {include file='checkout/_partials/cart-summary-top.tpl' cart=$cart}
    {/block}

  <div class="card-block cart-element products">
    <div class="title">
      <i></i>
      <span>{l s='Tu compra actual' d='Shop.Theme.Global'}</span>
    </div>

      {block name='cart_summary_products'}
          {*            {include file='checkout/_partials/cart-summary-products.tpl' cart=$cart}*}
          {include file='module:ecomm_pscheckout/views/templates/front/_partials/cart-summary-products.tpl' cart=$cart}
      {/block}

      {block name='cart_summary_subtotals'}
          {include file='module:ecomm_pscheckout/views/templates/front/_partials/cart-summary-subtotals.tpl' cart=$cart}
      {/block}
  </div>

    {assign var='shipping' value=false}
    {assign var='fee' value=false}
    {assign var='special_products_palet' value=false}
    {assign var='special_products_manipulacion' value=false}
    {foreach from=$cart.subtotals item="subtotal"}
        {if isset($subtotal.type) && $subtotal.type == 'shipping'}
            {assign var='shipping' value=$subtotal}
        {/if}
        {if isset($subtotal.type) && $subtotal.type == 'fee'}
            {assign var='fee' value=$subtotal}
        {/if}
        {if isset($subtotal.type) && $subtotal.type == 'special_products_palet'}
            {assign var='special_products_palet' value=$subtotal}
        {/if}
        {if isset($subtotal.type) && $subtotal.type == 'special_products_manipulacion'}
            {assign var='special_products_manipulacion' value=$subtotal}
        {/if}
    {/foreach}

  <div class="cart-element cart_summary_shipping">
    <div class="title">
      <i></i>
      <span>{l s='Logística' d='Shop.Theme.Global'}</span>
    </div>
    <div class="cart-summary-line cart-summary-subtotals" id="cart-subtotal-{$shipping.type}">

        <span class="label">
            {$shipping.label}
        </span>

      <span class="value">
          {$shipping.value}
        </span>
    </div>

      {if $special_products_palet != false && $special_products_palet.amount != 0}
          <div class="cart-summary-line cart-summary-subtotals" id="cart-subtotal-{$shipping.type}">

            <span class="label">
                {$special_products_palet.label}
            </span>

              <span class="value">
              {$special_products_palet.value}
            </span>
          </div>
      {/if}

      {if $special_products_manipulacion != false  && $special_products_manipulacion.amount != 0}
          <div class="cart-summary-line cart-summary-subtotals" id="cart-subtotal-{$shipping.type}">

            <span class="label">
                {$special_products_manipulacion.label}
            </span>

              <span class="value">
              {$special_products_manipulacion.value}
            </span>
          </div>
      {/if}

  </div>

  {if $fee != false}
    <div class="cart-element cart_summary_fee">
      <div class="title">
        <span class="material-icons">payments</span>
        <span>{l s='Recargo' d='Shop.Theme.Global'}</span>
      </div>
      <div class="cart-summary-line cart-summary-subtotals" id="cart-subtotal-{$fee.type}">

        <span class="label">
            {$fee.label}
        </span>

        <span class="value">
          {$fee.value}
        </span>
      </div>
    </div>
  {/if}


  <div class="cart-element cart_summary_voucher">
    <div class="title">
      <i></i>
      <span>{l s='Descuentos' d='Shop.Theme.Global'}</span>
    </div>
      {block name='cart_summary_voucher'}
          {include file='checkout/_partials/cart-voucher.tpl'}
      {/block}
  </div>


  <div class="cart-element cart_summary_totals">
      {block name='cart_summary_totals'}
          {include file='module:ecomm_pscheckout/views/templates/front/_partials/cart-summary-totals.tpl' cart=$cart}
      {/block}
  </div>


</section>
