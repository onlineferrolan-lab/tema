<div class="checkout cart-detailed-actions card-block" id="awsavecart-card-block">
	<div class="text-sm-center awsavecart_button_cart">
	{if !isset($savedcart) || $savedcart===false}
		  <a name="awsc_button_savecart" id="awsc_button"  class="btn btn-primary"  title="{l s='Save cart' mod='awsavecart' }">
		  	<span>
		  	<i class="material-icons">save</i>
		  	{l s='Save cart' mod='awsavecart'}
		  	</span>
		  </a>
	{else}
	<div class="alert alert-success">
		<p>{l s='Saved cart' mod='awsavecart'}: {$savedcart->name}</p>
	</div>
	{/if}
	</div>
</div>