<div class="ecommaddtocart_productlist">

    {if $ecommaddtocart.button == 1}
        <form action="{$urls.pages.cart}" method="post">
            <input type="hidden" name="token" value="{$static_token}"/>

            <input type="hidden" value="{$ecommaddtocart.id_product}" name="id_product"/>
            <div class="contentbuttons">
                <div class="product-quantity">

                    <input
                            type="text"
                            name="qty"
                            value="{$ecommaddtocart.minimal_qty}"
                            class="input-group ecommaddtocart-quantity"
                            min="{$ecommaddtocart.minimal_qty}"
                            aria-label="{l s='Quantity' mod='hiaddtocartbutton'}"
                            available-qty="{$ecommaddtocart.available_qty}"
                    >
                </div>


                <button class="add-to-cart-productlist btn-primary" {if $ecommaddtocart.button == -1}disabled="disabled"{/if} type="submit" data-button-action="add-to-cart">
                    <span>{l s='Añadir' mod='ecommaddtocart'}</span>
                </button>
            </div>
        </form>
    {elseif $ecommaddtocart.button == -1}
        {if $ecommaddtocart.ecommaddtocart_popupnostock == true}
            {include file='module:ecommaddtocart/views/templates/hook/button_popupnostock.tpl'}
        {else}
            <button class="add-to-cart-productlist btn-primary" disabled="disabled" type="submit" data-button-action="add-to-cart">
               <span>{l s='Añadir' mod='ecommaddtocart'}</span>
            </button>
        {/if}
    {elseif $ecommaddtocart.button == 2}
        <div class="oos btn btn-secondary">{l s='No disponible' mod='ecommaddtocart'}</div>
    {else}
        <a class="add-to-cart-productlist-more" href="{$ecommaddtocart.url}">{l s='Ver más' mod='ecommaddtocart'}</a>
    {/if}
</div>