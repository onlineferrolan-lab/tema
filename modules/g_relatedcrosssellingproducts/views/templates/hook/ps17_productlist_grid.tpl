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

    <section class="page-product-box grelated_products {if isset($ajaxcal) && $ajaxcal} grelated_products_ajax{/if}">
	   <h2 class="products-section-title text-uppercase">
        {if $title !=''}{$title|escape:'html':'UTF-8'}{else}{l s='Related Products' mod='g_relatedcrosssellingproducts'}{/if}
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
        <div class="product_grid products">
           {foreach from=$gproducts item='product' name=product}
    			<article class="item product-miniature js-product-miniature" data-id-product="{$product.id_product|intval}" data-id-product-attribute="{$product.id_product_attribute|intval}" itemscope itemtype="http://schema.org/Product">
                    <div class="thumbnail-container">
                      {block name='product_thumbnail'}
                        {if $product.cover}
                          <a href="{$product.url|escape:'html':'UTF-8'}" class="thumbnail product-thumbnail">
                            <img
                              src = "{$product.cover.bySize.home_default.url|escape:'html':'UTF-8'}"
                              alt = "{if !empty($product.cover.legend)}{$product.cover.legend|escape:'html':'UTF-8'}{else}{$product.name|truncate:30:'...'|escape:'html':'UTF-8'}{/if}"
                              data-full-size-image-url = "{$product.cover.large.url|escape:'html':'UTF-8'}"
                            >
                          </a>
                        {else}
                          <a href="{$product.url|escape:'html':'UTF-8'}" class="thumbnail product-thumbnail">
                            <img
                              src = "{$urls.no_picture_image.bySize.home_default.url|escape:'html':'UTF-8'}"
                            >
                          </a>
                        {/if}
                      {/block}

                      <div class="product-description">
                        {block name='product_name'}
                          <h3 itemprop="name" class="h3 product-title">
        					<a href="{$product.url|escape:'html':'UTF-8'}" class="thumbnail product-thumbnail">
                            {$product.name|truncate:30:'...'|escape:'html':'UTF-8'}
                          </a>
                        </h3>
                        {/block}

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

                        {block name='product_reviews'}
                          {hook h='displayProductListReviews' product=$product}
                        {/block}
                      </div>

                      {block name='product_flags'}
                        <ul class="product-flags">
                          {foreach from=$product.flags item=flag}
                            <li class="product-flag {$flag.type|escape:'html':'UTF-8'}">{$flag.label|escape:'html':'UTF-8'}</li>
                          {/foreach}
                        </ul>
                      {/block}

                      <div class="highlighted-informations{if !$product.main_variants} no-variants{/if} hidden-sm-down">
                        {block name='quick_view'}
                          <a class="quick-view" href="#" data-link-action="quickview">
                            <i class="material-icons search">&#xE8B6;</i> {l s='Quick view' d='Shop.Theme.Actions'}
                          </a>

                        {/block}

                        {block name='product_variants'}
                          {if $product.main_variants}
                            {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
                          {/if}
                        {/block}
                      </div>

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
                  </article>
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
