{if !isset($savedcart) || $savedcart===false}
 <a name="awsc_button_blockcart_savecart" id="awsc_button_blockcart"  class="btn btn-primary"  title="{l s='Save cart' mod='awsavecart' }">
 	<span>
 	<i class="icon-save"></i>
 	{l s='Save cart' mod='awsavecart'}
 	</span>
 </a>
{else}
<div class="alert alert-success" style="float: left;width: 100%;line-height: 0px;">
	<p style="float:right">{l s='Saved cart' mod='awsavecart'}: {$savedcart->name}</p>
</div>
{/if}