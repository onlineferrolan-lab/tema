{if isset($ecommaddtocart)}
    <div class="ecommaddtocart_productlist" attr-id-product="{$ecommaddtocart.id_product}" attr-id_product_attribute="{$ecommaddtocart.id_product_attribute}">
            {if Product::isMegaproduct($ecommaddtocart.id_product)}
            	<a class="add-to-cart-productlist-more btn btn-primary" href="{$ecommaddtocart.url}">{l s='Configurar' mod='ecommaddtocart'}</a>
            {else if $ecommaddtocart.button == 1}
                <div class="add-to-cart-productlist {if $ecommaddtocart.cart_qty > 0}hide{/if}" >
                    <span>{l s='Añadir'  mod='ecommaddtocart'}</span>
                </div>

                <div class="product-quantity {if $ecommaddtocart.cart_qty > 0}show{/if}">
                    
                    {if $ecommaddtocart.cart_qty > 0}
                        <input type="number" class="p-quantity" value="{$ecommaddtocart.cart_qty}">
                    {else}
                        <input type="number" class="p-quantity" value="{$ecommaddtocart.minimal_qty}">
                        
                    {/if}
                    {*<p class="p-quantity">{$ecommaddtocart.cart_qty}</p>*}
                    <div class="minus-prod">-</div>
                    <div class="plus-prod">+</div>
                </div>

            {elseif $ecommaddtocart.button == 0}
               <a class="add-to-cart-productlist-more btn btn-primary" href="{$ecommaddtocart.url}">{l s='Ver más' mod='ecommaddtocart'}</a>
            {elseif $ecommaddtocart.button == 2}
                {if $ecommaddtocart.type != "product"}
                    <a class="add-to-cart-productlist-more btn btn-primary" href="{$ecommaddtocart.url}">{l s='Ver más' mod='ecommaddtocart'}</a>
               {/if}

            {else}

{*                {include file='module:ecommaddtocart/views/templates/hook/button_popupnostock.tpl'}*}
                <a class="add-to-cart-productlist-more btn btn-primary" href="{$ecommaddtocart.url}">{l s='Ver más' mod='ecommaddtocart'}</a>
            {/if}
        {*
        hay que hacer caso de megaproduct, esperando a jorge que termine la programacion
        *}
    </div>
{/if}