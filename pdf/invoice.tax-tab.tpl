{**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
<!--  TAX DETAILS -->
{if $tax_exempt}

	{l s='Exempt of VAT according to section 259B of the General Tax Code.' d='Shop.Pdf' pdf='true'}

{elseif (isset($tax_breakdowns) && $tax_breakdowns)}
	<table id="tax-tab" width="100%">
		<thead>
			<tr>
				<th class="header small">{l s='Tax Detail' d='Shop.Pdf' pdf='true'}</th>
				<th class="header small">{l s='Tax Rate' d='Shop.Pdf' pdf='true'}</th>
				{if $display_tax_bases_in_breakdowns}
					<th class="header small">{l s='Base price' d='Shop.Pdf' pdf='true'}</th>
				{/if}
				<th class="header-right small">{l s='Total Tax' d='Shop.Pdf' pdf='true'}</th>
			</tr>
		</thead>
		<tbody>
		{assign var=has_line value=false}

		{foreach $tax_breakdowns as $label => $bd}
			{assign var=label_printed value=false}

			{foreach $bd as $line}
				{if $line.rate == 0}
					{continue}
				{/if}
				{assign var=has_line value=true}
				<tr>
					<td class="white">
						{if !$label_printed}
							{if $label == 'product_tax'}
								{l s='Products' d='Shop.Pdf' pdf='true'}
							{elseif $label == 'shipping_tax'}
								{l s='Shipping' d='Shop.Pdf' pdf='true'}
							{elseif $label == 'ecotax_tax'}
								{l s='Ecotax' d='Shop.Pdf' pdf='true'}
							{elseif $label == 'wrapping_tax'}
								{l s='Wrapping' d='Shop.Pdf' pdf='true'}
							{/if}
							{assign var=label_printed value=true}
						{/if}
					</td>

					<td class="center white">
						{if $normal_shipping_tax && $extra_shipping_tax}{$normal_shipping_tax}%, {$extra_shipping_tax}%{else}{$line.rate} %{/if}
					</td>

					{if $display_tax_bases_in_breakdowns}
						<td class="right white">
							{if isset($is_order_slip) && $is_order_slip}- {/if}
							{displayPrice currency=$order->id_currency price=$line.total_tax_excl}
						</td>
					{/if}

					<td class="right white">
						{if isset($is_order_slip) && $is_order_slip}- {/if}
						{displayPrice currency=$order->id_currency price=$line.total_amount}
					</td>
					
					{if isset($product_tax_infos.extra_tax1)}
					<tr style="line-height:4px;font-size:0.7em;background-color:#fefefe">
					 <td style="width: 30%">{l s='Productos' pdf='true'}</td>
					 <td style="width: 20%; text-align: right;">{$product_tax_infos.extra_tax1.tax} %</td>
					{if !$use_one_after_another_method}
					 <td style="width: 20%; text-align: right;">
						{* {if isset($is_order_slip) && $is_order_slip}- {/if}{displayPrice currency=$order->id_currency price=$product_tax_infos.total_price_tax_excl}*}
					 </td>
					{/if}
					 <td style="width: 20%; text-align: right;">{if isset($is_order_slip) && $is_order_slip}- {/if}{displayPrice currency=$order->id_currency price=$product_tax_infos.extra_tax1.total_amount}</td>
					</tr>
					{/if}
					{if isset($product_tax_infos.extra_tax2)}
					<tr style="line-height:4px;font-size:0.7em;background-color:#fefefe">
					 <td style="width: 30%">{l s='Recargos' pdf='true'}</td>
					 <td style="width: 20%; text-align: right;">{$product_tax_infos.extra_tax2.tax} %</td>
					{if !$use_one_after_another_method}
					 <td style="width: 20%; text-align: right;">
						{* {if isset($is_order_slip) && $is_order_slip}- {/if}{displayPrice currency=$order->id_currency price=$product_tax_infos.total_price_tax_excl}*}
					 </td>
					{/if}
					 <td style="width: 20%; text-align: right;">{if isset($is_order_slip) && $is_order_slip}- {/if}{displayPrice currency=$order->id_currency price=$product_tax_infos.extra_tax2.total_amount}</td>
					</tr>
					{/if}
				</tr>
			{/foreach}
		{/foreach}

		{if !$has_line}
		<tr>
			<td class="white center" colspan="{if $display_tax_bases_in_breakdowns}4{else}3{/if}">
				{l s='No taxes' d='Shop.Pdf' pdf='true'}
			</td>
		</tr>
		{/if}

		</tbody>
	</table>

{/if}
<!--  / TAX DETAILS -->
