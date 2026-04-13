{**
 * 2008-2021 Prestaworld
 *
 * All right is reserved,
 *
 * @author    Prestaworld <prestaworld12@gmail.com>
 * @copyright 2008-2021 Prestaworld
 * @license   One Paid Licence By WebSite Using This Module. No Rent. No Sell. No Share.
 *}


<div class="productListBtnDiv">

    <div
            style="color:grey;"
            data-id-Product="{$idProduct|escape:'htmlall':'UTF-8'}"
            data-id-Attribute="{$idProductAttr|escape:'htmlall':'UTF-8'}"
            data-default-Id="{$defaultId|escape:'htmlall':'UTF-8'}"
            class="productListBtn presta_header_button {if isset($isExist['id_presta_swl_products'])}active{/if}">
        <span class="material-icons hearticon">
            {l s='favorite' mod='prestasmartwishlist'}
        </span>
    </div>
</div>
<div class="modal fade" id="Modal1" role="dialog">
    <div class="modal-dialog modal-sm">
        <div class="modal-content modalpopup">
            <div class="modal-header">
                <span class="modal-title">{l s='Added to your wishlist' mod='prestasmartwishlist'}</span>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="Modal2" role="dialog">
    <div class="modal-dialog modal-sm">
        <div class="modal-content modalpopup">
            <div class="modal-header">
                <span class="modal-title">{l s='Removed from your wishlist' mod='prestasmartwishlist'}</span>
            </div>
        </div>
    </div>
</div>
