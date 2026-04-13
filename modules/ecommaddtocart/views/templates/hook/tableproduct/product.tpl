{extends file='catalog/product.tpl'}
{block name='product_variants'}
    <div id="ecommaddtocart_tableproduct">
        <div class="title">{$combinations|count} {l s='opciones de producto' mod='ecommaddtocart'}</div>
        <ul>
            {foreach from=$combinations key=id_combination item=combination}
                <li id_product_attribute="{$id_combination}" id_product="{$product.id}">
                    <div class="name">
                        {assign var=keyarray value=0}
                        {foreach from=$combination.attributes_values key=id_attribute item=attributevalue}
                            {if $groups[$id_attribute].group_type == "color"}
                                {assign var="idattributecolor" value=$combination.attributes[$keyarray]}
                                <span class="attribute_name color">
                                    <span style="background: {$colors[$idattributecolor].value}" title="{$colors[$idattributecolor].name}">
                                    </span>
                                </span>
                            {else}
                                <span class="attribute_name">{$attributevalue}</span>
                            {/if}
                            {assign var=keyarray value=$keyarray+1}
                        {/foreach}
                    </div>
                    <div class="stock">
                        {assign var=availableorder value=1}
                        {if $combination.date_formatted != ""}
                            {l s='Disponible el %date%' sprintf=['%date%' => $combination.date_formatted] mod='ecommaddtocart'}
                        {elseif $combination.quantity <= 0}
                            {assign var=availableorder value=0}
                            {l s='Sin Stock' mod='ecommaddtocart'} - <span class="popupnostock">{l s='Avísame' mod='ecommaddtocart'}</span>
                        {else}
                            {l s='Disponible' mod='ecommaddtocart'}
                        {/if}

                    </div>
                    <div class="quantity">
                        {if $availableorder == 1}
                            <div class="qtycontent">
                                <span class="buttonsqty">
                                    <span class="down">-</span>
                                    <input type="text" name="qty" id_product="{$product.id}" id_product_attribute="{$id_combination}" class="qty" value="0" />
                                    <span class="up">+</span>
                                </span>
                            </div>
                        {/if}
                    </div>
                </li>
            {/foreach}
        </ul>
        <div id="ecommaddtocart_tp_add" class="btn btn-primary">
            {l s='Añadir a la cesta' mod='ecommaddtocart'}
        </div>
    </div>
{*    {$combinations|dump}*}
{*    {$colors|dump}*}
{*     {$groups|dump}*}
{/block}
{block name='product_add_to_cart'}
{/block}