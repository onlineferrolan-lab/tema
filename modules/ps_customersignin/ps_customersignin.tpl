{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 *}
{*<div class="shops hidden-sm-down">*}
{*    <a href="https://ferrolan.es/content/nuestras-tiendas">*}
{*        <img src="{$urls.img_url}shops.svg" width="24" height="24" alt="shop">*}
{*        <span class="hidden-sm-down">{l s='Tiendas' d='Shop.Theme.Customeraccount'}</span>*}
{*    </a>*}
{*</div>*}

<div id="_desktop_user_info">
    <div class="user-info">
        {if $logged}

            <a
                    class="account"
                    href="{$urls.pages.my_account}"
                    title="{l s='View my customer account' d='Shop.Theme.Customeraccount'}"
                    rel="nofollow"
            >
                <span class="icon-user"></span>
                <span class="hidden-lg-down customername">{$customer.firstname}</span>
            </a>
        {else}
            <a
                    href="{$urls.pages.my_account}"
                    title="{l s='Log in to your customer account' d='Shop.Theme.Customeraccount'}"
                    rel="nofollow"
            >
                <img src="{$urls.img_url}user.svg" width="16" height="20" alt="login">
                <span class="hidden-md-down">{l s='Login' d='Shop.Theme.Actions'}</span>
            </a>
        {/if}
    </div>
</div>


<section class="lateral-popup">
    <span class="close-popup"></span>

    <span class="title-popup">
         {if $logged}{l s='Hola' d='Shop.Theme.Actions'} {$customerName}{else}{l s='Mi cuenta' d='Shop.Theme.Actions'}{/if}
    </span>

    <div class="myaccountlateral">
        {if $logged}
            <div class="modal-body">
                <div class="modal_item">
                    <span class="title">{l s='Account summary' d='Shop.Theme.Customeraccount'}</span>
                    <a class="item" href="{$urls.pages.my_account}">
                        <i class="material-icons">segment</i>
                        {l s='My account' d='Shop.Theme.Customeraccount'}
                    </a>
                </div>
                <div class="modal_item">
                    <span class="title">{l s='My orders' d='Shop.Theme.Customeraccount'}</span>
                    <a class="item" href="{$urls.pages.history}">
                        <i class="icon-order"></i>
                        {l s='My orders' d='Shop.Theme.Customeraccount'}
                    </a>
                    <a class="item" href="{$urls.pages.discount}">
                        <i class="icon-voucher"></i>
                        {l s='Discount coupons' d='Shop.Theme.Customeraccount'}
                    </a>
                </div>
                <div class="modal_item">
                    <span class="title">{l s='Personal information' d='Shop.Theme.Customeraccount'}</span>
                    <a class="item" href="{$urls.pages.identity}">
                        <i class="icon-user"></i>
                        {l s='Personal information' d='Shop.Theme.Customeraccount'}
                    </a>
                    <a class="item" href="{$urls.pages.addresses}">
                        <i class="icon-address"></i>
                        {l s='My Addresses' d='Shop.Theme.Customeraccount'}
                    </a>
                </div>
                <a class="close_session" href="{$logout_url}">
                     <i class="icon-logout"></i>
                     {l s='Sign off' d='Shop.Theme.Customeraccount'}
                </a>
            </div>



        {else}
            <form id="login-form-popup" action="{$urls.pages.authentication}?back=my-account" method="post">
                <div class="no-account">
                    <span class="login-label">{l s='Iniciar sesión' d='Module.Ps_cusomersignin.Shop'}</span>
                     <a class="btn-count"href="#" data-toggle="modal" data-target="#registration-modal" class="text-muted">

{*                    <a href="{$urls.pages.register}" data-link-action="display-register-form" title="{l s='Crear cuenta nueva' d='Module.Ps_cusomersignin.Shop'}">*}
                        {l s='¿Todavía no tienes cuenta?' d='Module.Ps_cusomersignin.Shop'} <span class="text-underline">{l s='Registrarme' d='Module.Ps_cusomersignin.Shop'}</span>
                    </a>
                </div>
                 <section>
                    <input type="hidden" name="back" value="my-account">
                    <div class="form-group">
                        <div class="containerinputs">
                            <label class="form-control-label inp">
                                <label for="email" style="display:none;">{l s='Email' d='Module.Ps_cusomersignin.Shop'}</label>
                                <input class="form-control" name="email" type="email" value="" required="" placeholder=" ">
                                <span class="label">{l s='Email' d='Module.Ps_cusomersignin.Shop'}</span>
                            </label>
                        </div>
                        <div class="form-control-comment">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group js-parent-focus containerinputs">
                            <label class="form-control-label inp">
                                <label for="passowrd" style="display:none;">{l s='Contraseña' d='Module.Ps_cusomersignin.Shop'}</label>
                                <input class="form-control js-child-focus js-visible-password" name="password" type="password" value="" pattern="{literal}.{5,}{/literal}" required="" placeholder=" ">
                                <span class="label">{l s='Contraseña' d='Module.Ps_cusomersignin.Shop'}</span>
                            </label>



                        </div>
                        <div class="form-control-comment">
                        </div>
                    </div>
                </section>
                <footer class="form-footer clearfix">
                    {*<input type="checkbox" name="permanentLogin" class="permanentLogin"><span class="permanentLogin-label">{l s='Recuerdame' d='Module.Ps_cusomersignin.Shop'}</span>*}
                    <div class="clearfix"></div>
                    <input type="hidden" name="submitLogin" value="1">
                    <button id="submit-login" class="btn btn-primary" data-link-action="sign-in" type="submit" title="{l s='Iniciar sesión' d='Module.Ps_cusomersignin.Shop'}">
                        {l s='Iniciar sesión' d='Module.Ps_cusomersignin.Shop'}
                    </button>
                    <br /><br />
                    <div class="forgot-password">
                        <a href="{$urls.pages.password}" rel="nofollow" title="{l s='Recuperar contraseña' d='Module.Ps_cusomersignin.Shop'}">{l s='¿Has olvidado tu contraseña?' d='Module.Ps_cusomersignin.Shop'}</a>
                    </div>
                </footer>
            </form>
            {block name='display_after_login_form'}
                {hook h='displayCustomerLoginFormAfter'}
            {/block}
        {/if}
    </div>

</section>
