{*
 * Copyright ETS Software Technology Co., Ltd
 *
 * NOTICE OF LICENSE
 *
 * This file is not open source! Each license that you purchased is only available for 1 website only.
 * If you want to use this file on more websites (or projects), you need to purchase additional licenses.
 * You are not allowed to redistribute, resell, lease, license, sub-license or offer our resources to any third party.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future.
 *
 * @author ETS Software Technology Co., Ltd
 * @copyright  ETS Software Technology Co., Ltd
 * @license    Valid for 1 website (or project) for each purchase of license
*}
{if isset($css) && $css|trim!==''}
    <link rel="stylesheet" href="{$css|escape:'quotes':'UTF-8'}">
{/if}
<div class="solo_register_form">
    <form id="solo_register_form" class="defaultForm form-horizontal"{if isset($action) && $action} action="{$action|escape:'quotes':'UTF-8'}"{/if} method="post" enctype="multipart/form-data">
        {if isset($errors) && $errors}
            <div class="solo_register_errors">
                {$errors nofilter}
            </div>
        {/if}
        <section class="form-fields">
            <div class="form-group row">
                <div class="col-md-9 col-md-offset-3">
                    <h3>{l s='Register email' mod='ets_sociallogin'}</h3>
                </div>
            </div>
            <div class="form-group row">
                <label for="first_name" class="col-md-3 form-control-label">{l s='First name' mod='ets_sociallogin'}</label>
                <div class="col-md-6">
                    <input id="first_name" class="form-control" name="first_name" value="{if isset($smarty.post.first_name)}{$smarty.post.first_name|escape:'html':'UTF-8'}{else}{$profile->firstName|escape:'html':'UTF-8'}{/if}" type="text">
                </div>
            </div>
            <div class="form-group row">
                <label for="last_name" class="col-md-3 form-control-label">{l s='Last name' mod='ets_sociallogin'}</label>
                <div class="col-md-6">
                    <input id="last_name" class="form-control" name="last_name" value="{if isset($smarty.post.last_name)}{$smarty.post.last_name|escape:'html':'UTF-8'}{else}{$profile->lastName|escape:'html':'UTF-8'}{/if}" type="text">
                </div>
            </div>
            <div class="form-group row">
                <label for="email" class="col-md-3 form-control-label">{l s='Email address' mod='ets_sociallogin'}</label>
                <div class="col-md-6">
                    <input id="email" class="form-control" name="email" value="{if isset($smarty.post.email)}{$smarty.post.email|escape:'html':'UTF-8'}{else}{$profile->email|escape:'html':'UTF-8'}{/if}" placeholder="your@email.com" type="email"{if isset($profile->email) && $profile->email|trim !== ''} disabled{/if}>
                </div>
            </div>
        </section>
        <footer class="form-footer text-xs-right">
            <button id="submitRegister" class="btn btn-primary" name="submitRegister" value="1" type="submit">{l s='Register'  mod='ets_sociallogin'}</button>
        </footer>
    </form>
</div>