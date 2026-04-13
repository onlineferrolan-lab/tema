{**
 * 2008-2021 Prestaworld
 *
 * All right is reserved,
 *
 * @author    Prestaworld <prestaworld12@gmail.com>
 * @copyright 2008-2021 Prestaworld
 * @license   One Paid Licence By WebSite Using This Module. No Rent. No Sell. No Share.
 *}

<div class="clearfix wishlist_btn">
    {if isset($idCustomer) && $idCustomer}
        <span class="dropdown">
              <div class="clearfix imgbtn ">
                 <div class="presta_whistlist_process" style="color:grey;">
                      <span class="material-icons hearticon"></span>
                      <span class="text">
                          {l s='Añadir a favoritos' mod='prestasmartwishlist'}
                      </span>
                     <span class="text added">
                          {l s='Quitar de favoritos' mod='prestasmartwishlist'}
                      </span>
                 </div>
              </div>
     {else}
            <div class="clearfix imgbtn ">
                <a href="{$login_url|escape:'htmlall':'UTF-8'}" class="productListBtn">
                 <span class="material-icons hearticon"></span>
                </a>
          </div>
    {/if}
     <input
             type="hidden"
             value="{$idProduct|escape:'htmlall':'UTF-8'}"
             id="idProduct"
             name="idProduct" />
     <input
             type="hidden"
             value="{$idProductAttr|escape:'htmlall':'UTF-8'}"
             id="idProductAttr"
             name="productAttr" />
     <input
             type="hidden"
             value="{if isset($id_customization)}{$id_customization}{else}0{/if}"
             id="idCustomization"
             name="idCustomization" />
     <input
             type="hidden"
             value="{$defaultId|escape:'htmlall':'UTF-8'}"
             id="id_default_list"
             name="id_default_list" />
     <p class="alert-success" id="messageDiv"></p>
</div>
<div>
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
    {*<div class="modal fade" id="newList" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title">{l s='Create a new wishlist' mod='prestasmartwishlist'}</span>
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
                                    autocomplete="off"
                                    id="ListName">
                        </div>
                        <div class="form-group">
                            <input
                                    type="checkbox"
                                    id="setIdDefault"
                                    name="setIdDefault"
                                    value="{$idlist|escape:'htmlall':'UTF-8'}">
                            <label for="setIdDefault">{l s='Default list' mod='prestasmartwishlist'}
                            </label>
                        </div>
                        <span id="createlistathook">{l s='Create' mod='prestasmartwishlist'}</span>
                    </form>
                </div>
            </div>
        </div>
    </div>*}
    <div class="modal fade" id="Modal3" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title">{l s='New wishlist created successfully' mod='prestasmartwishlist'}</span>
                </div>
            </div>
        </div>
    </div>
</div>
