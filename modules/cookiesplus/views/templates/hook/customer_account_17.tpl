{*
 * NOTICE OF LICENSE
 *
 * This product is licensed for one customer to use on one installation (test stores and multishop included).
 * Site developer has the right to modify this module to suit their needs, but can not redistribute the module in
 * whole or in part. Any other use of this module constitutes a violation of the user agreement.
 *
 * DISCLAIMER
 *
 * NO WARRANTIES OF DATA SAFETY OR MODULE SECURITY
 * ARE EXPRESSED OR IMPLIED. USE THIS MODULE IN ACCORDANCE
 * WITH YOUR MERCHANT AGREEMENT, KNOWING THAT VIOLATIONS OF
 * PCI COMPLIANCY OR A DATA BREACH CAN COST THOUSANDS OF DOLLARS
 * IN FINES AND DAMAGE A STORES REPUTATION. USE AT YOUR OWN RISK.
 *
 *  @author    idnovate.com <info@idnovate.com>
 *  @copyright 2022 idnovate.com
 *  @license   See above
*}

{if $C_P_MATERIAL_ICONS_LIBRARY == '1'}
    <a href="" class="col-lg-4 col-md-6 col-sm-6 col-xs-12" id="cookies-links" onclick="cookieGdpr.displayModalAdvanced(false); return false;"
       style="cursor:pointer" title="{l s='Your cookie settings' mod='cookiesplus'}">
        <span class="link-item">
            <i class="material-icons">info</i>{l s='Your cookie settings' mod='cookiesplus'}
        </span>
    </a>
{elseif $C_P_MATERIAL_ICONS_LIBRARY == '2'}
    <div class="list-group-item">
        <a href="" onclick="cookieGdpr.displayModalAdvanced(false); return false;" style="cursor:pointer" title="{l s='Your cookie settings' mod='cookiesplus'}">
            <i class="fto-vcard mar_r4 fs_lg"></i></i>{l s='Your cookie settings' mod='cookiesplus'}
        </a>
    </div>
{else}
    <a href="" class="col-lg-4 col-md-6 col-sm-6 col-xs-12" onclick="cookieGdpr.displayModalAdvanced(false); return false;" style="cursor:pointer" title="{l s='Your cookie settings' mod='cookiesplus'}">
        <span class="link-item">
            <i class="fa fa-star fa-fw" aria-hidden="true"></i>{l s='Your cookie settings' mod='cookiesplus'}
        </span>
    </a>
{/if}
