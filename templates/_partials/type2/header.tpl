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

{if $smarty.capture.displayBannerContent != ""}
    {block name='header_banner'}
      <div class="header-banner ">
        <div class="container d-flex">  
            {hook h='displayBanner'}
            <div class="extra_header_banner">
                <div class="border-diagonal"></div>
                <div class="links_header">
                    <a href="{$urls.pages.contact}">{l s='Contactar' d='Shop.Theme.Catalog'}</a>
                    |
                    <a href="tel:937414045">{l s='93 741 40 45' d='Shop.Theme.Catalog'}</a>
                </div>
            </div>
        </div>
      </div>
    {/block}
{/if}

{block name='header_nav'}
  <nav class="header-nav">
    <div class="container">
      <div class="row">
        <div class="hidden-md-down">
          <div class="col-md-5 col-xs-12">
            {hook h='displayNav1'}
          </div>
          <div class="col-md-7 right-nav">
              {hook h='displayNav2'}
          </div>
        </div>
        <div class="hidden-lg-up text-sm-center mobile">
          {*<div class="float-xs-left" id="menu-icon">
            <i class="material-icons d-inline">&#xE5D2;</i>
          </div>*}
          <div class="item" id="_mobile_iqitmenu"></div>

          <div class="subelements">
              <div class="top-logo" id="_mobile_logo"></div>

              <div class="rightelements">
                  <div class="item presta-nav1-wishlist-btn" id="_mobile_wihslist"></div>
                  <div class="item" id="_mobile_search"></div>
                  <div class="item" id="_mobile_user_info"></div>
                  <div class="item" id="_mobile_cart"></div>
              </div>
          </div>

        </div>
      </div>
    </div>
  </nav>
{/block}

{block name='header_top'}
  <div class="header-top">
    <div class="container header-top-container ">
       <div class="row">
        <div class="col-md-3 hidden-md-down" id="_desktop_logo">

          {if $shop.logo_details}
            {if $page.page_name == 'index'}
                {renderLogo}
            {else}
              {renderLogo}
            {/if}
          {/if}
        </div>
         <div class="header-top-center col-md-6 col-sm-12 position-static">
           {hook h='displaySearch'}
         </div>
        <div class="header-top-right col-md-3 col-sm-12 position-static">

          {hook h='displayTop'}
          
        </div>
      </div>
{*      <div id="mobile_top_menu_wrapper" class="row hidden-md-up" style="display:none;">*}
{*        <div class="js-top-menu mobile" id="_mobile_top_menu"></div>*}
{*        <div class="js-top-menu-bottom">*}
{*          <div id="_mobile_currency_selector"></div>*}
{*          <div id="_mobile_language_selector"></div>*}
{*          <div id="_mobile_contact_link"></div>*}
{*        </div>*}
{*      </div>*}
    </div>
    {hook h="displayIqitMenu"}
  </div>
  {hook h='displayNavFullWidth'}



{/block}
