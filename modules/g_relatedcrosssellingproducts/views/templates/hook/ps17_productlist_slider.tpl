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
	   <h2 class="products-section-title">
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
        <div class="owl-theme owl-carousel owl_slider products" items="5-4-4-2" nav="true" dots="false">
           {foreach from=$gproducts item='product' name=product key="position"}
    			{include file='_partials/type'|cat:Configuration::get('ecommbaseconfiguration_productminiature_type', true)|cat:'/product-miniature.tpl' product=$product position=$position}
           {/foreach}
        </div>
    </section>
    <div class="clear"></div>
    <div style="display:none;" id="prevtitle">{l s='Prev' mod='g_relatedcrosssellingproducts'}</div>
    <div style="display:none;" id="nexttitle">{l s='Next' mod='g_relatedcrosssellingproducts'}</div>
    {if isset($ajaxcal) && $ajaxcal}
    <script type="text/javascript">
        if($('#blockcart-modal').length > 0){
            $('#blockcart-modal').addClass('hascros');
            $('.grelated_products_ajax').appendTo($('#blockcart-modal .modal-body'));
            loadOwlSlider();
        }
    </script>
    {/if}
{/if}
