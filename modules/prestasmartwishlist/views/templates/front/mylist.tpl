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
{if isset($wishlistList) && !$wishlistList}
    <div class="presta-wishlist clearfix">
        <div class="presta-wishlist-banner">
            <img
                class="bannerimg"
                src="{$img_path|escape:'htmlall':'UTF-8'}/prestasmartwishlist/views/img/Webp.png" />
            <a
                data-toggle="modal"
                data-target="#createNewlist"
                class="presta-new-list">
                {l s='Create a list' mod='prestasmartwishlist'}
            </a>
        </div>
    </div>
{else}
    <div class="main_div container presta-list">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs tab_head" role="tablist">
            <li class="nav-item">
                <a
                    id="tabLinkMain"
                    class="nav-link active"
                    data-toggle="tab"
                    href="#home">
                    {l s='Your Lists' mod='prestasmartwishlist'}
                </a>
            </li>
            <div class="createlistbtn">
                {if Configuration::get('PRESTA_WISHLIST_CREATE_MULTIPLE_LIST_BUTTON')}
                    <a
                        data-toggle="modal"
                        data-target="#createNewlist"
                        id="listbtn"
                        href="#">
                        {l s='Create a list' mod='prestasmartwishlist'}
                    </a>
                {/if}
            </div>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
            <div id="home" class="container mainTab tab-pane active">
                <div class="clearfix col-md-3" id="presta-left-sidebar">
                    <ul class="sub_menu">
                        {foreach $wishlistList as $list}
                            <li
                                {if isset($presta_current_list_id) && $list.id_presta_smart_wishlists == $presta_current_list_id}class="active"{/if}>
                                <form method="post" action="{$presta_mylist_url|escape:'htmlall':'UTF-8'}">
                                    <input
                                        type="hidden"
                                        name="id_list"
                                        value="{$list.id_presta_smart_wishlists|escape:'htmlall':'UTF-8'}"
                                    />
                                    <button
                                        type="submit"
                                        name="listnamebtn"
                                        class="btn btnSubMenu">{$list.list_name|ucfirst|escape:'htmlall':'UTF-8'}
                                    </button>
                                    {if $list.is_default == 1}
                                        <span class="text-muted" style="color:#fff !important;vertical-align: sub;">
                                            ({l s='Default list' mod='prestasmartwishlist'})
                                        </span>
                                    {/if}
                                </form>
                            </li>
                        {/foreach}
                    </ul>
                </div>
                <div class="panel col-md-9 presta-padding">
                    <div class="col-md-12 content_head">
                        <div class="col-md-8 presta-padding">
                            <h3># {$current_list_object->list_name|ucfirst|escape:'htmlall':'UTF-8'}</h3>
                            <p> {$current_list_object->description|ucfirst|escape:'htmlall':'UTF-8'}</p>
                            <input type="hidden" id="idwishList" value="{$id_wishlist|escape:'htmlall':'UTF-8'}"/>
                            {if Configuration::get('PRESTA_WISHLIST_INVITE_TO_LIST_BUTTON')}
                                <span class="material-icons">{l s='person' mod='prestasmartwishlist'}</span>
                                <span>
                                    <button
                                        class="invitebtn"
                                        data-toggle="modal"
                                        data-target="#sharelist">
                                        <span class="material-icons">
                                            {l s='add' mod='prestasmartwishlist'}
                                        </span> {l s='Invite' mod='prestasmartwishlist'}
                                    </button>
                                </span>
                            {/if}
                            <br>
                            <p class="alert-success" id="messageDiv"></p>
                        </div>
                        <div class="col-md-4 presta-padding">
                            {if Configuration::get('PRESTA_WISHLIST_SHARE_LIST_BUTTON')}
                                <a
                                    style="margin-left:30px;"
                                    data-toggle="modal"
                                    data-target="#sharelist"
                                    class="btnSubMenu">
                                    <i class="material-icons ">{l s='share' mod='prestasmartwishlist'}</i>
                                    {l s='Share list' mod='prestasmartwishlist'}
                                </a> |
                            {/if}
                            {if  Configuration::get('PRESTA_WISHLIST_MANAGE_LIST_BUTTON') || Configuration::get('PRESTA_WISHLIST_PRINT_LIST_BUTTON')}
                            <span class="dropdown">
                                <button
                                    style=""
                                    class="btnSubMenu dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown">
                                    {l s='More' mod='prestasmartwishlist'}
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    {if  Configuration::get('PRESTA_WISHLIST_MANAGE_LIST_BUTTON')}
                                        <li class="dropitem">
                                            <a
                                                data-toggle="modal"
                                                data-target="#managelist"
                                                href="#">
                                                {l s='Manage List' mod='prestasmartwishlist'}
                                            </a>
                                        </li>
                                    {/if}
                                    {if Configuration::get('PRESTA_WISHLIST_PRINT_LIST_BUTTON')}
                                        <li class="dropitem">
                                            <a id="printList" href="#">
                                                {l s='Print List' mod='prestasmartwishlist'}
                                            </a>
                                        </li>
                                    {/if}
                                </ul>
                            </span>
                            {/if}
                        </div>
                    </div>
                    <div class="C_head col-md-12">
                        <div class="col-md-6">
                        {if isset($productList) && $productList }
                            <input
                                data-toggle="tooltip"
                                data-placement="right"
                                title="select all!"
                                style="padding:0px;
                                       position: relative;
                                       left: -16px;"
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
                        <div class="col-md-6">
                            {if Configuration::get('PRESTA_WISHLIST_SEARCH_TAB')}
                                <input
                                    class="form-inline"
                                    id="searchBar"
                                    type="text"
                                    name="search"
                                    placeholder="Search..">
                                <input
                                    type="hidden"
                                    id="id_list"
                                    value="{$defaultId|escape:'htmlall':'UTF-8'}"
                                />
                                <button
                                    id="searchbutton"
                                    class="btnSubMenu ">
                                    <i class="material-icons search">{l s='search' mod='prestasmartwishlist'}</i>
                                </button>|
                            {/if}
                            <span class="dropdown">
                                {if Configuration::get('PRESTA_WISHLIST_FILTER_AND_SORT_LIST_BUTTON')}
                                    <button
                                        class="btnSubMenu btn-sm dropdown-toggle"
                                        type="button"
                                        data-toggle="dropdown">{l s='Filter & Sort' mod='prestasmartwishlist'}
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li class="dropitem">
                                            <a
                                                href="{url entity='module' name='prestasmartwishlist' controller='mylist' params=['id_list' => {$defaultId|escape:'htmlall':'UTF-8'}, 'sort' => 'name']}">
                                                {l s='By Name' mod='prestasmartwishlist'}
                                            </a>
                                        </li>
                                        <li class="dropitem">
                                            <a href="{url entity='module' name='prestasmartwishlist' controller='mylist' params=['id_list' => {$defaultId|escape:'htmlall':'UTF-8'}, 'sort' => 'date']}">
                                            {l s='By date' mod='prestasmartwishlist'}
                                            </a>
                                        </li>
                                    </ul>
                                {/if}
                            </span>
                        </div>
                    </div>
                    <div class="panel col-md-12 contentItems presta-padding">
                        {if isset($productList) && $productList }
                            {foreach $productList as $list }
                                <div class="col-md-12 zoom listbody_main presta_select_parent">
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
                                    <div class="col-md-2 clearfix" style="padding: 0px;">
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
                                    <div class="panel col-md-3 add hide_print presta_quantity">
                                        <div>
                                            <h6>{l s='Item added' mod='prestasmartwishlist'}
                                                {$date = strtotime($list.date_add)}
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
                                                        {if {$listname.id_presta_smart_wishlists} != $defaultId}
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
                                {* <hr class="hr-text" data-content="OR"> *}
                            {/foreach}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<div class="modal fade" id="createNewlist" role="dialog">
    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <h3 style="Text-align:center;" class="modal-title">
                {l s='Create a new wishlist' mod='prestasmartwishlist'}</h3>
            </div>
            <div class="modal-body">
                <form class="">
                    <p id="presta-list-error" style="margin-top:10px;"></p>
                    <div class="form-group">
                        <label>{l s='List Name:' mod='prestasmartwishlist'}</label>
                        <input
                            class="form-control"
                            type="text"
                            placeholder="please enter a list name"
                            id="newListName">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    id="createlistbtn"
                    class="btn btn-default">{l s='Create' mod='prestasmartwishlist'}
                </button>
                <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal">{l s='Cancel' mod='prestasmartwishlist'}
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="managelist" role="dialog">
    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <h3 style="Text-align:center;" class="modal-title">{l s='Manage wishlist' mod='prestasmartwishlist'}</h3>
            </div>
            <div class="modal-body">
            <div>
                <p>{l s='People who access your list will see your recipient name.' mod='prestasmartwishlist'}</p>
            </div>
                <form>
                    <div class="form-group">
                        <label>{l s='List Name:' mod='prestasmartwishlist'}</label>
                        <input
                            class="form-control"
                            type="text"
                            value="{$current_list_object->list_name|escape:'htmlall':'UTF-8'}"
                            id="ListName"
                        />
                    </div>
                    <div class="form-group">
                        <label>
                            {l s='Recipient Name:' mod='prestasmartwishlist'}
                        </label>
                        <input
                            class="form-control"
                            type="text"
                            value="{$current_list_object->customer_name|escape:'htmlall':'UTF-8'}"
                            id="RecipientName"
                        />
                    </div>
                    <div class="form-group">
                        <label>
                            {l s='Description:' mod='prestasmartwishlist'}
                        </label>
                        <textarea
                            class="form-control"
                            placeholder ="Write a little something about the recipient of this list. Tip: This information will help others find your lists"
                            id="listDescription"></textarea>
                    </div>
                    <div class="form-group">
                        <input
                        type="checkbox"
                        id="setIdDefault"
                        {if $id_wishlist == $defaultId}
                        checked
                        {/if}
                        value="{$id_wishlist|escape:'htmlall':'UTF-8'}">
                        <label for="setIdDefault">{l s='Default list' mod='prestasmartwishlist'}</label>
                    </div>
                    <div class="form-group">
                        <button
                            style="width:100%"
                            type="button"
                            data-id="{$id_wishlist|escape:'htmlall':'UTF-8'}"
                            id="deleteListbtn"
                            class="btn btn-default">{l s='Delete list' mod='prestasmartwishlist'}
                        </button>
                        <input
                        type="hidden"
                        id="id_list_default"
                        value="{$defaultId|escape:'htmlall':'UTF-8'}"
                    />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button
                    type="submit"
                    id="updatelist"
                    class="btn btn-default"
                    data-id="{$id_wishlist|escape:'htmlall':'UTF-8'}">
                    {l s='Save changes' mod='prestasmartwishlist'}
                </button>
                <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal">{l s='Cancel' mod='prestasmartwishlist'}
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="sharelist" role="dialog">
    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <h3 style="Text-align:center;" class="modal-title">
                {l s='Invite others to your list' mod='prestasmartwishlist'}</h3>
            </div>
            <div class="modal-body">
                <h4>{l s='Invite someone via' mod='prestasmartwishlist'}</h4>
                    <button
                        type="submit"
                        id="copylink"
                        data-url="{$share_mylist_url|escape:'htmlall':'UTF-8'}"
                        class="btn btn-default">{l s='Copy Link' mod='prestasmartwishlist'}
                    </button>
                    <div>
                    <textarea
                        style="width: 570px;margin-top: 10px;" id="presta_texturl">{$share_mylist_url|escape:'htmlall':'UTF-8'}
                    </textarea>
                </div>
            </div>
        </div>
    </div>
</div>

{/block}
