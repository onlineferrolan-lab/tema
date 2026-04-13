{extends file='customer/page.tpl'}

{block name='page_title'}
    <h1>
        {l s='My Wishlist' mod='prestasmartwishlist'}
    </h1>
{/block}

{block name='page_content'}

    {if $productswishList}
        <section id="products">
            <div id="js-product-list">
                <div class="forcewidthproduct">
                    <div class="container">
                        <div class="products">
                            {foreach from=$productswishList item=product name=i}
                                {include file="catalog/_partials/miniatures/product.tpl" product=$product}
                            {/foreach}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    {else}
        <p class="warning">{l s='No products' mod='prestasmartwishlist'}</p>
    {/if}




{/block}