
 {*//mpinstall*}
<div class="product-line-grid">
  <!--  product left content: image-->
  <div class="product-line-grid-left col-md-3 col-xs-4">
  
    <span class="product-image media-middle">
      				
      				{assign var="path_img_design" value="{$smarty.const._PS_MODULE_DIR_}megadesigner/images/cart/{Context::getContext()->cart->id|intval}-{$product.id_product|intval}-{$product.id_product_attribute|intval}-{$mega.id_megacart|intval}.jpg"}
							{assign var="path_img" value="{$smarty.const._PS_MODULE_DIR_}/megaproduct/images/cart/{$mega.id_megacart|intval}.jpg"}
							{if file_exists($path_img_design)}
							
							<img src="{$urls.base_url}modules/megadesigner/images/cart/{Context::getContext()->cart->id|intval}-{$product.id_product|intval}-{$product.id_product_attribute|intval}-{$mega.id_megacart|intval}.jpg" alt="{$product.name|escape:'htmlall':'UTF-8'}" {if isset($smallSize)}width="{$smallSize.width}" height="{$smallSize.height}" {/if} />
						
							{else if file_exists($path_img)}
								<img src="{$modules_dir}megaproduct/images/cart/{$mega.id_megacart|intval}.jpg" alt="{$product.name|escape:'htmlall':'UTF-8'}" {if isset($smallSize)}width="{$smallSize.width}" height="{$smallSize.height}" {/if} />
							{else}
								{if $product.default_image}
					        <img src="{$product.default_image.bySize.cart_default.url}" alt="{$product.name|escape:'quotes'}" loading="lazy">
					      {else}
					        <img src="{$urls.no_picture_image.bySize.cart_default.url}" loading="lazy" />
					      {/if}
							{/if}
							
      
    </span>
  </div>

  <!--  product left body: description -->
  <div class="product-line-grid-body col-md-4 col-xs-8">
    <div class="product-line-info">
      <a class="label" data-mega={$mega.id_megacart}  href="{$product.url}">{$product.name}</a>
    </div>
    {if isset($mega.extraAttrLong)}{$mega.extraAttrLong nofilter}{/if}
    {if !$mega.boxes}
    <br/><i>{$mega.measure}</i>
    {else}
    Cajas: {$mega.boxes}
    {/if}
							{if isset($mega.personalization) && $mega.personalization neq ''}
								<br/><div class="mp-personalization">{$mega.personalization nofilter}</div>
							{/if}


    <div class="product-line-info">
      <span class="value">
         {if $configuration.display_prices_tax_incl == 1}
           {$mega.spricewt}
         {else}
           {$mega.sprice}
         {/if}

      </span>
     
    </div>

    <br/>

    {foreach from=$product.attributes key="attribute" item="value"}
      <div class="product-line-info">
        <span class="label">{$attribute}:</span>
        <span class="value">{$value}</span>
      </div>
    {/foreach}
    
     {if is_array($product.customizations) && $product.customizations|count}
      <br>
      {block name='cart_detailed_product_line_customization'}
        {foreach from=$product.customizations item="customization"}
          <a href="#" data-toggle="modal" data-target="#product-customizations-modal-{$customization.id_customization}">{l s='Product customization' d='Shop.Theme.Catalog'}</a>
          <div class="modal fade customization-modal js-customization-modal" id="product-customizations-modal-{$customization.id_customization}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="{l s='Close' d='Shop.Theme.Global'}">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 class="modal-title">{l s='Product customization' d='Shop.Theme.Catalog'}</h4>
                </div>
                <div class="modal-body">
                  {foreach from=$customization.fields item="field"}
                    <div class="product-customization-line row">
                      <div class="col-sm-3 col-xs-4 label">
                        {$field.label}
                      </div>
                      <div class="col-sm-9 col-xs-8 value">
                        {if $field.type == 'text'}
                          {if (int)$field.id_module}
                            {$field.text nofilter}
                          {else}
                            {$field.text}
                          {/if}
                        {elseif $field.type == 'image'}
                          <img src="{$field.image.small.url}" loading="lazy">
                        {/if}
                      </div>
                    </div>
                  {/foreach}
                </div>
              </div>
            </div>
          </div>
          
        {/foreach}
      {/block}
    {/if}

   </div>

  <!--  product left body: description -->
  <div class="product-line-grid-right product-line-actions col-md-5 col-xs-12">
    <div class="row">
      <div class="col-xs-4 hidden-md-up"></div>
      <div class="col-md-10 col-xs-6">
        <div class="row">
          <div class="col-md-6 col-xs-6 qty">
            {if $mega.boxes} 
            	<input
                class="js-cart-line-product-quantityX js-cart-line-megaproduct-measure"
                data-down-url="{$product.down_quantity_url}&id_megacart={$mega.id_megacart}&updateMeasure=1"
                data-up-url="{$product.up_quantity_url}&id_megacart={$mega.id_megacart}&updateMeasure=1"
                data-update-url="{$product.update_quantity_url}&id_megacart={$mega.id_megacart}&updateMeasure=1"
                data-product-id="{$product.id_product}"
                data-mega-id="{$mega.id_megacart}"
                data-measure="long" 
                type="text"
                data-value="{$mega.long|string_format:"%.2f"}"
                data-boxes="{$mega.boxes}"
                value="{$mega.long|string_format:"%.2f"}"
                name="product-quantity"
                min="{$mega.config.long_min}" 
                max="{$mega.config.long_max}" 
                step="{$mega.config.long_sections}" 
              />
            
            {else if isset($product.is_gift) && $product.is_gift}
              <span class="gift-quantity">{$mega.quantity}</span>
            {else}
              <input
                class="js-cart-line-product-quantity"
                data-down-url="{$product.down_quantity_url}&id_megacart={$mega.id_megacart}"
                data-up-url="{$product.up_quantity_url}&id_megacart={$mega.id_megacart}"
                data-update-url="{$product.update_quantity_url}&id_megacart={$mega.id_megacart}"
                data-product-id="{$product.id_product}"
                data-mega-id="{$mega.id_megacart}"
                type="text"
                value="{$mega.quantity}"
                name="product-quantity-spin"
                min="{$product.minimal_quantity}"
              />
            {/if}
          </div>
          <div class="col-md-6 col-xs-2 price">
            <span class="product-price">
              <strong>
                {if isset($product.is_gift) && $product.is_gift}
                  <span class="gift">{l s='Gift' d='Shop.Theme.Checkout'}</span>
                {else}
                  {if $configuration.display_prices_tax_incl == 1}
                    {$mega.stotalwt}
                  {else}
                    {$mega.stotal}
                  {/if}
{*                  {$mega.stotalwt}*}
                {/if}
              </strong>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-xs-2 text-xs-right">
        <div class="cart-line-product-actions ">
          <a
              class                       = "remove-from-cart"
              rel                         = "nofollow"
              href                        = "{$product.remove_from_cart_url}&id_megacart={$mega.id_megacart}"
              data-link-action            = "delete-from-cart"
              data-id-product             = "{$product.id_product|escape:'javascript'}"
              data-id-product-attribute   = "{$product.id_product_attribute|escape:'javascript'}"
              data-id-customization   	  = "{$product.id_customization|escape:'javascript'}"
          >
            {if !isset($product.is_gift) || !$product.is_gift}
            <i class="material-icons pull-xs-left">delete</i>
            {/if}
          </a>
          {hook h='displayCartExtraProductActions' product=$product}
        </div>
      </div>
    </div>
  </div>

  <div class="clearfix"></div>
</div>
