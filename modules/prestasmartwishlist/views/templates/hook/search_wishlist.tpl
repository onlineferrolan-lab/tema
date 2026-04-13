{**
 * 2008-2021 Prestaworld
 *
 * All right is reserved,
 *
 * @author    Prestaworld <prestaworld12@gmail.com>
 * @copyright 2008-2021 Prestaworld
 * @license   One Paid Licence By WebSite Using This Module. No Rent. No Sell. No Share.
 *}

{if isset($productsList) && $productsList }
    {foreach $productsList as $list }
        <div class="col-md-12 zoom listbody_main">
            <div class="col-md-1 clearfix">
                <input
                type="checkbox"
                data-productId ="{$list.id_product|escape:'htmlall':'UTF-8'}"
                data-productAttrId ="{$list.id_product_attr|escape:'htmlall':'UTF-8'}"
                data-customizationId ="{$list.id_customization|escape:'htmlall':'UTF-8'}"
                data-id ="{$list.id_wishlist_product|escape:'htmlall':'UTF-8'}"
                class="Productcheckbox"
                value="{$list.id_product|escape:'htmlall':'UTF-8'}"
                name="sport">
            </div>
            <div class="col-md-2">
                {if isset($list.images) && $list.images}
                    {foreach $list.images as $image}
                        {foreach $image.bySize as $img}
                            <img height="125px" src="{$img.url|escape:'htmlall':'UTF-8'}" />
                            {break}
                        {/foreach}
                        {break}
                    {/foreach}
                {/if}
            </div>
            <div class="col-md-6 listbody" style="padding:6px;">
                <a href="{$list.link|escape:'htmlall':'UTF-8'}">
                    <strong class="nameproduct">{$list.name|escape:'htmlall':'UTF-8'} </strong>
                    <p>
                        {foreach $list.attributes as $attribute }
                            {if isset($attribute) && $attribute}
                                {$attribute.group|escape:'htmlall':'UTF-8'}:  {$attribute.name|escape:'htmlall':'UTF-8'},
                            {/if}
                        {/foreach}
                    </p>
                </a>
                <div class="current-price">
                {if Configuration::get('PRESTA_WISHLIST_SHOW_PRODUCT_PRICE')}
                    <span itemprop="price">{$list.price|escape:'htmlall':'UTF-8'}</span><br>
                    {if isset($list.discount_percentage) && $list.discount_percentage}
                        <span class="dicountWishlist">
                        {l s='Discount:' mod='prestasmartwishlist'}
                        {$list.discount_percentage|escape:'htmlall':'UTF-8'}</span>
                    {/if}
                {/if}
                </div>
            </div>
            <div class="panel col-md-3 add hide_print">
                <div>
                    <h6>{l s='Item added' mod='prestasmartwishlist'}
                        {$date=strtotime($list.date_add|escape:'htmlall':'UTF-8')}
                        {date('d-M-Y', $date|escape:'htmlall':'UTF-8')}
                    </h6>
                </div>
                {if Configuration::get('PRESTA_WISHLIST_ADD_TO_CART_BUTTON')}
                <form action="{$presta_cart_link|escape:'htmlall':'UTF-8'}" method="post">
                    <input type="hidden" name="token" value="{$presta_token|escape:'htmlall':'UTF-8'}">
                    <input type="hidden" name="id_product" value="{$list.id_product|escape:'htmlall':'UTF-8'}" id="product_page_product_id">
                    <input type="hidden" name="id_product_attribute" value="{$list.id_product_attr|escape:'htmlall':'UTF-8'}" id="product_attribute_id">
                    <input type="hidden" name="id_customization" value="{$list.id_customization|escape:'htmlall':'UTF-8'}" id="product_customization_id">
                    <div class="col-md-12 presta_input_box_parent">
                        <div class="col-md-8">
                            <label style="margin:0px 0 0 0;"> {l s='Quantity' mod='prestasmartwishlist'}</label>
                        </div>
                        <div class="col-md-4 presta_input_box">
                            <input
                                id="quantityProduct_{$list.id_wishlist_product|escape:'htmlall':'UTF-8'}"
                                style="padding:2px; margin:0px 0 5px 0;"
                                class="form-control input-sm presta_input_box"
                                type="text"
                                name="qty"
                                value="{$list.product_quantity_wanted|escape:'htmlall':'UTF-8'}">
                        </div>
                    </div>
                    <a
                        class="btn addToCartbtn btn-primary add-to-cart"
                        data-button-action="add-to-cart"
                        data-id = "{$list.id_wishlist_product|escape:'htmlall':'UTF-8'}"
                        href="javascript:void(0);">
                        <i class="material-icons shopping-cart"></i>
                        {l s='Add to cart' mod='prestasmartwishlist'}
                    </a>
                </form>
                {/if}<br>
                <div class="col-md-12 moveAndDelete">
                    {if Configuration::get('PRESTA_WISHLIST_MOVE_TO_LIST_BUTTON')}
                        <div class="dropdown col-md-6">
                            <button
                                data-id="{$list.id_wishlist_product|escape:'htmlall':'UTF-8'}"
                                class="btn
                                buttonMov
                                btn-sm
                                dropdown-toggle"
                                type="button"
                                data-toggle="dropdown">
                                {l s='Move' mod='prestasmartwishlist'}
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                {foreach $wishlistList as $listname}
                                    {if {$listname.id_presta_smart_wishlists|escape:'htmlall':'UTF-8'} != $defaultId}
                                        <li class="dropitem">
                                            <a
                                                class="moveToList"
                                                data-id="{$listname.id_presta_smart_wishlists|escape:'htmlall':'UTF-8'}"
                                                data-idproduct="{$list.id_wishlist_product|escape:'htmlall':'UTF-8'}"
                                                href="#">
                                                {$listname.list_name|escape:'htmlall':'UTF-8'}
                                            </a>
                                        </li>
                                    {/if}
                                {/foreach}
                            </ul>
                        </div>
                    {/if}
                    {if Configuration::get('PRESTA_WISHLIST_DELETE_BUTTON')}
                        <div class="col-md-6">
                            <button
                                class="buttonMov deletebtn"
                                data-id="{$list.id_wishlist_product|escape:'htmlall':'UTF-8'}"
                                id="delete_swl_products">
                                <span class="material-icons">
                                {l s='delete'
                                mod='prestasmartwishlist'}
                                </span>
                            </button>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {/foreach}
{/if}
