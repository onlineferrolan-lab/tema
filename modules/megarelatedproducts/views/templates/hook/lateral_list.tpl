{if $products_assoc_by_color|count > 0}
    <div class="megarelatedproducts_lateral_list_title">
        <b>
            {$title_related}
            {*l s='Productos en el mismo formato y acabado' mod='megarelatedproducts'*}
        </b>
    </div>

    <div class="megarelatedproducts_lateral_list">
        {assign var="aux" value=0}
        {foreach from=$products_assoc_by_color item=image}

            {if $aux < 5}
            <div class="img_cover" style="
                    background: url({$image.image});
                    background-position: center;
                    background-size: 130px;">

            </div>
            {/if}
            {assign var="aux" value=$aux+1}
{*            <img src="{$image.image}" class="select_product_image" data-product-id="{$image.id_product}" width="74" height="44">*}
        {/foreach}
    </div>

    <div class="megarelatedproducts_lateral_list_lateral">
        <div class="close">
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.333008 15.96C0.333008 7.67569 7.04874 0.959961 15.333 0.959961C23.6173 0.959961 30.333 7.67569 30.333 15.96C30.333 24.2442 23.6173 30.96 15.333 30.96C7.04874 30.96 0.333008 24.2442 0.333008 15.96Z" fill="#EBE7E2"/>
                <path d="M20.333 11.9671L19.3259 10.96L15.333 14.9528L11.3402 10.96L10.333 11.9671L14.3259 15.96L10.333 19.9528L11.3402 20.96L15.333 16.9671L19.3259 20.96L20.333 19.9528L16.3402 15.96L20.333 11.9671Z" fill="#232526"/>
            </svg>
        </div>
        <div class="title">
            {$title_related}
            {*l s='Productos en el mismo formato y acabado' mod='megarelatedproducts'*}
        </div>

            {foreach from=$products_assoc_by_color item=image}
{*                {$image|dump}*}
                <div class="inside">
        {*                <img src="{$image.image}" class="select_product_image" data-product-id="{$image.id_product}" width="74" height="44">*}
                    <a href="{$image.link_rewrite}">
                        <div class="img_cover" style="
                                background: url({$image.image});
                                background-position: center;
                                background-size: 130px;">

                        </div>

                        <div class="item">
        {*                    <input type="radio" class="form-check-input" onclick="window.location.href='{$image.link_rewrite}';">*}
                            <span>{$image.name}</span>
                        </div>
                </div>
                </a>
            {/foreach}

    </div>
    <div class="megarelatedproducts_lateral_list_bg"></div>

{/if}
