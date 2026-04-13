{*
* Do not edit the file if you want to upgrade in future.
*
* @author    Globo Software Solution JSC <contact@globosoftware.net>
* @copyright 2018 Globo., Jsc
* @license   please read license in file license.txt
* @link	     http://www.globosoftware.net
*/
*}

{if $gproducts}
    <section class="page-product-box grelated_products  {if isset($ajaxcal) && $ajaxcal} grelated_products_ajax{/if}">
	   <h2 class="products-section-title text-uppercase">
        {if $title !=''}
            {$title|escape:'html':'UTF-8'}
        {else}
            {l s='Related Products' mod='g_relatedcrosssellingproducts'}
        {/if}
        {if isset($freeshipping) && $freeshipping}
            <span class="crossseling_extra_label">
                {if isset($freeshipping) && $freeshipping}
                    <span class="freeshipping_tag label label-success">{l s='Free Shipping' mod='g_relatedcrosssellingproducts'}</span>
                {/if}
                {if isset($discountval) && $discountval !=''}
                    <span class="discountval_tag price-percent-reduction">{$discountval|escape:'html':'UTF-8'}</span>
                {/if}
            </span>
        {/if}
      </h2>
        <div class="grelated_products_list products">
           {foreach from=$gproducts item='product' name=product}
    			<div class="item {cycle values="odd,even"}">
                    <div class="grelated_products_image">
                        {block name='product_thumbnail'}
                            {if isset($product.cover) && $product.cover}
                              <a href="{$product.url|escape:'html':'UTF-8'}" class="thumbnail product-thumbnail">
                                <img
                                  src = "{$product.cover.bySize.home_default.url|escape:'html':'UTF-8'}"
                                  alt = "{if !empty($product.cover.legend)}{$product.cover.legend|escape:'html':'UTF-8'}{else}{$product.name|truncate:30:'...'|escape:'html':'UTF-8'}{/if}"
                                  data-full-size-image-url = "{$product.cover.large.url|escape:'html':'UTF-8'}"
                                />
                              </a>
                            {else}
                              <a href="{$product.url|escape:'html':'UTF-8'}" class="thumbnail product-thumbnail">
                                <img
                                  src = "{$urls.no_picture_image.bySize.home_default.url|escape:'html':'UTF-8'}"
                                />
                              </a>
                            {/if}
                          {/block}
                    </div>
                    <div class="grelated_products_des">
                        <h3 itemprop="name" class="h3 product-title">
        					<a href="{$product.url|escape:'html':'UTF-8'}" class="thumbnail product-thumbnail">
                            {$product.name|truncate:30:'...'|escape:'html':'UTF-8'}
                          </a>
                        </h3>
        				{block name='product_reviews'}
                          {hook h='displayProductListReviews' product=$product}
                        {/block}
    					<p class="product-desc" itemprop="description">
    						{$product.description_short|strip_tags:'UTF-8'|truncate:360:'...'|escape:'html':'UTF-8'}
    					</p>
                    </div>
                    <div class="grelated_products_price">
                        {block name='product_price_and_shipping'}
                          {if $product.show_price}
                            <div class="product-price-and-shipping">
                              {if $product.has_discount}
                                {hook h='displayProductPriceBlock' product=$product type="old_price"}

                                <span class="sr-only">{l s='Regular price' d='Shop.Theme.Catalog'}</span>
                                <span class="regular-price">{$product.regular_price|escape:'html':'UTF-8'}</span>
                                {if $product.discount_type === 'percentage'}
                                  <span class="discount-percentage discount-product">{$product.discount_percentage|escape:'html':'UTF-8'}</span>
                                {elseif $product.discount_type === 'amount'}
                                  <span class="discount-amount discount-product">{$product.discount_amount_to_display|escape:'html':'UTF-8'}</span>
                                {/if}
                              {/if}

                              {hook h='displayProductPriceBlock' product=$product type="before_price"}

                              <span class="sr-only">{l s='Price' d='Shop.Theme.Catalog'}</span>
                              <span itemprop="price" class="price">{$product.price|escape:'html':'UTF-8'}</span>

                              {hook h='displayProductPriceBlock' product=$product type='unit_price'}

                              {hook h='displayProductPriceBlock' product=$product type='weight'}
                            </div>
                          {/if}
                        {/block}
                    </div>
                    <div class="grelated_products_submit_bt">
                        <form action="{$link->getPageLink('cart', true)|escape:'html':'UTF-8'}" method="post" class="hiaddtocart">
                            <input type="hidden" name="token" value="{$token|escape:'html':'UTF-8'}" />
                            <input type="hidden" name="id_product" value="{$product.id_product|intval}" class="product_page_product_id" />
                            <input type="hidden" name="id_customization" value="0" class="product_customization_id" />
                            {if isset($discountactive) && $discountactive}
                                <input type="hidden" name="dc" value="{$discountactive|intval}" class="dc" />
                            {/if}
                                <div class="product-quantity">
                                  <input type="hidden" name="qty" value="1" min="1" class="input-group hi-quantity"/>
                                </div>
                            <button class="btn btn-primary add-to-cart" data-button-action="add-to-cart" type="submit">
                                {l s='Add To Cart' mod='g_relatedcrosssellingproducts'}
                            </button>
                        </form>
                    </div>
    			</div>
    		{/foreach}
        </div>
    </section>
    <div class="clear"></div>
    {if isset($ajaxcal) && $ajaxcal}
    <script type="text/javascript">
        if($('#blockcart-modal').length > 0){
            $('#blockcart-modal').addClass('hascros');
            $('.grelated_products_ajax').appendTo($('#blockcart-modal .modal-body'));
        }
    </script>
    {/if}
{/if}
