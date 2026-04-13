{**
 * 2008-2021 Prestaworld
 *
 * All right is reserved,
 *
 * @author    Prestaworld <prestaworld12@gmail.com>
 * @copyright 2008-2021 Prestaworld
 * @license   One Paid Licence By WebSite Using This Module. No Rent. No Sell. No Share.
 *}

<div class="presta-nav1-wishlist-btn" id="_desktop_wihslist">
    <a
        href="{if isset($idCustomer)}{$mywishlist_url|escape:'htmlall':'UTF-8'}{else}{$login_url|escape:'htmlall':'UTF-8'}{/if}"
        class="presta_header_button">
        <span class="material-icons hearticon">
            {l s='favorite' mod='prestasmartwishlist'}
        </span>
        <p class="wishlistCount">{if isset($presta_product_count) && $presta_product_count}{$presta_product_count.cp|escape:'htmlall':'UTF-8'}{else}0{/if}</p>
    </a>



</div>
