{extends file='customer/page.tpl'}

{block name='page_title'}
        <h1>
                {l s='My stored carts' mod='awsavecart'}
        </h1>
{/block}

{block name="page_content"}
<p class="info-title">
    {l s='Here you will find your stored trolleys, you can retrieve them when you want' mod='awsavecart'}.
</p>

<div class="block-center" id="block-history">
{if $savedCarts && count($savedCarts)}
        <table id="saved-carts" class="table table-bordered footab">
                <thead>
                        <tr>
                                <th class="first_item" data-sort-ignore="true" style="width:10%">{l s='Cart ID' mod='awsavecart'}</th>
                                <th class="item"  style="width:60%">{l s='Name' mod='awsavecart'}</th>
                                <th data-hide="phone" class="item" style="width:30%">{l s='Actions' mod='awsavecart'}</th>
                                
                        </tr>
                </thead>
                <tbody>
                        {foreach from=$savedCarts item=cart name=myLoop}
                                <tr class="{if $smarty.foreach.myLoop.first}first_item{elseif $smarty.foreach.myLoop.last}last_item{else}item{/if} {if $smarty.foreach.myLoop.index % 2}alternate_item{/if}">
                                        <td class="history_link bold">

                                                {$cart->id_cart}
                                        </td>
                                        <td class="history_date bold">
                                                {$cart->name}
                                        </td>
                                        <td class="history_price">
                                               {if $showConfirm && $cart->confirm eq 0}
                                                 <a  class="btn btn-success btn-awsc-confirm-cart" id="btn-awsc-confirm-cart_{$cart->id_cart}" href="{$link->getModuleLink("awsavecart","savedcart")}?action=confirm&id_saved_cart={$cart->id_saved_cart}&file={$cart->file}&reload=1">
                                                	<i class="icon-edit"></i>
                                                	{l s='Confirm' mod='awsavecart'}
                                                </a>
                                                {else}
                                                <a class="btn btn-primary btn-awsc-load-cart" id="btn-awsc-load-cart_{$cart->id_cart}" style="margin-right:20px;" cartid="{$cart->id_cart}" href="{$link->getModuleLink("awsavecart","savedcart")}?action=loadAWCart&id_saved_cart={$cart->id_saved_cart}&file={$cart->file}&key={$key}&process=descartar&id_shop={$id_shop}">
                                                	<i class="icon-shopping-cart"></i>
                                                	{l s='Load' mod='awsavecart'}
                                                </a>
                                                {/if}
                                                {if $showPdf}
                                               
                                                 <a target="blank" class="btn btn-info btn-awsc-pdf-cart" id="btn-awsc-pdf-cart_{$cart->id_saved_cart}" href="{$link->getModuleLink("awsavecart","pdf")}?id_cart={$cart->cart->id}&id_saved_cart={$cart->id_saved_cart}">
                                                	<i class="icon-print"></i>
                                                	{l s='Pdf' mod='awsavecart'}
                                                </a>
                                                {/if}
                                                
                                                <a class="btn btn-danger btn-awsc-delete-cart" id="btn-awsc-delete-cart_{$cart->id_saved_cart}" href="{$link->getModuleLink("awsavecart","savedcart")}?action=deleteAWCart&id_saved_cart={$cart->id_saved_cart}">
                                                	<i class="icon-trash"></i>
                                                	{l s='Delete' mod='awsavecart'}
                                                </a>
                                               
                                        </td>
                                     
                                </tr>
                        {/foreach}
                </tbody>
        </table>
        <div id="block-order-detail" class="unvisible">&nbsp;</div>
{else}

 <p class="alert alert-warning">{l s='You have not saved any cart yet' mod='awsavecart'}</p>
{/if}
</div>


{/block}
