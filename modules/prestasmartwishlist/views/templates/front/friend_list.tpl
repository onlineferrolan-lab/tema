{**
 * 2008-2021 Prestaworld
 *
 * All right is reserved,
 *
 * @author    Prestaworld <prestaworld12@gmail.com>
 * @copyright 2008-2021 Prestaworld
 * @license   One Paid Licence By WebSite Using This Module. No Rent. No Sell. No Share.
 *}

{extends file=$layout}
{block name='content'}
<div class="main_div container presta-list">
    <a
        id="tabLinkMain"
        class="nav-link active"
        data-toggle="tab"
        href="#home">
        <h3># {$current_list_object->list_name|ucfirst|escape:'htmlall':'UTF-8'}</h3>
        <p> {$current_list_object->description|ucfirst|escape:'htmlall':'UTF-8'}</p>

    </a>
    <div class="tab-content">
        <div id="home" class="container mainTab tab-pane active">
            <div class="panel col-md-12 presta-padding">
                <div class="col-md-6">
                    {if isset($productList) && $productList }
                        <input
                            data-toggle="tooltip"
                            data-placement="right"
                            title="select all!"
                            style="margin: 0 0 0 14px;"
                            type="checkbox"
                            id = "select_multiple_items_of_wishlist"
                            name="select_multiple_items_of_wishlist"
                        >
                        <div
                            class="btn-group bulk-actions dropdown">
                            <button
                                style="background-color:white;"
                                type="button"
                                class="btn btn-default dropdown-toggle"
                                data-toggle="dropdown">
                                {l s='Bulk actions ' mod='prestasmartwishlist'}<span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li style="padding:5px;">
                                    <a
                                        style="background-color:white;
                                        "
                                        id = "delete_multiple_products"
                                        href="javascript:void(0);">{l s='Delete selected'
                                        mod='prestasmartwishlist'}
                                    </a>
                                </li>
                                <li  style="padding:5px;">
                                    <a
                                        style="background-color:white;"
                                        id = "addtocart_multiple_products"
                                        href="javascript:void(0);">{l s='Add to cart'
                                        mod='prestasmartwishlist'}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    {/if}
                </div>
                <div class=" col-md-12 contentItems">
                    {if isset($productList) && $productList }
                        {foreach $productList as $list }
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
                                <div class="col-md-6 listbody">
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
                                <div class="panel col-md-3 add hide_print" style="text-align:right;">
                                    <div>
                                        <h6>{l s='Item added' mod='prestasmartwishlist'}
                                            {$date=strtotime($list.date_add)}
                                            {date('d-M-Y', $date|escape:'htmlall':'UTF-8')}
                                        </h6>
                                    </div>
                                    {if Configuration::get('PRESTA_WISHLIST_ADD_TO_CART_BUTTON')}
                                        {* <a
                                            class="btn addToCartbtn btn-primary add-to-cart"
                                            href="{$list.cart_url|escape:'htmlall':'UTF-8'}">
                                            <i class="material-icons shopping-cart"></i>
                                            {l s='Add to cart' mod='prestasmartwishlist'}
                                        </a> *}
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
                                                {* <button
                                                    class="btn btn-primary  btn-sm add-to-cart" data-button-action="add-to-cart" type="submit">
                                                    <i class="material-icons shopping-cart"></i>
                                                    {l s='Add to cart' mod='prestasmartwishlist'}
                                                </button> *}
                                                <a
                                                    class="btn addToCartbtn btn-primary add-to-cart"
                                                    data-button-action="add-to-cart"
                                                    data-id = "{$list.id_wishlist_product|escape:'htmlall':'UTF-8'}"
                                                    href="javascript:void(0);">
                                                    <i class="material-icons shopping-cart"></i>
                                                    {l s='Add to cart' mod='prestasmartwishlist'}
                                                </a>

                                        </form>
                                    {/if}
                                </div>
                                {* <hr class="hr-text" data-content="OR"> *}
                            </div>
                        {/foreach}
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
{/block}
