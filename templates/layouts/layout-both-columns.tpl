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
<!doctype html>
{include file='_partials/helpers.tpl'}
<html lang="{$language.locale}">

  {capture name='displayBannerContent'}{hook h='displayBanner'}{/capture}
  <head>
    {block name='head'}
      {include file='_partials/head.tpl'}
    {/block}
  </head>


{assign var="showproducts" value=false scope="global"}
{assign var="showfilter" value=false scope="global"}
{assign var="show_type1" value=false scope="global"}
{assign var="show_type2" value=false scope="global"}
{assign var="show_type3" value=false scope="global"}
{assign var="show_type4" value=false scope="global"}
{assign var="acabadoformatocolor" value=false scope="global"}
{assign var="forceelementorhidden" value=false scope="global"}
{include file='catalog/_partials/category-top-variables.tpl'}

  <body id="{$page.page_name}" class="{$page.body_classes|classnames}{if $smarty.capture.displayBannerContent != ""} displaybannershow{/if}{if isset($page.page_name) && ($page.page_name == "module-pm_advancedsearch4-searchresults" || $page.page_name == "prices-drop" || $page.page_name == "search" || $page.page_name == "new-products")} page-category{/if} {if $showproducts}showproductsincategory{/if}">

    {block name='hook_after_body_opening_tag'}
      {hook h='displayAfterBodyOpeningTag'}
    {/block}

    <main>
      {block name='product_activation'}
        {include file='catalog/_partials/product-activation.tpl'}
      {/block}

      <header id="header">
        {block name='header'}
            {assign var=header_var value='_partials/type'|cat:Configuration::get('ecommbaseconfiguration_header_type', true)|cat:'/header.tpl'}
           {include file=$header_var}
        {/block}
      </header>

      <section id="wrapper">
        {block name='notifications'}
          {include file='_partials/notifications.tpl'}
        {/block}

        {hook h="displayWrapperTop"}
        <div class="container">
          {block name='breadcrumb'}
            {include file='_partials/breadcrumb.tpl'}
          {/block}

          {if $page.page_name=='category'}

            {include file='catalog/_partials/category-top.tpl'}

          {elseif $page.page_name=='manufacturer'}
              {if isset($smarty.get.id_manufacturer)}
              <div class="product-manufacturer brand_img">
                  {if isset($manufacturer_image_url)}
                      <a href="{$product_brand_url}">
                          <img src="{$manufacturer_image_url}" class="img img-thumbnail manufacturer-logo" alt="{$product_manufacturer->name}">
                      </a>
                  {else}
                      <img src="{$link->getManufacturerImageLink($manufacturer.id, 'home_default')}" alt = "{$manufacturer.name|escape:html:'UTF-8'}" class="logo_brand" />
                  {/if}
              </div>
              {/if}
          {/if}


            <div class="{*if $layout != "layouts/layout-full-width.tpl"}row{/if*}row">
              {block name="left_column"}
                <div id="left-column" class="col-xs-12 col-sm-4 col-md-3">
                  {if $page.page_name == 'product'}
                    {hook h='displayLeftColumnProduct'}
                  {else}
                    {hook h="displayLeftColumn"}
                  {/if}
                </div>
              {/block}

            {block name="content_top"}
              
            {/block}

            {block name="content_wrapper"}
              <div id="content-wrapper" class="js-content-wrapper left-column right-column col-sm-4 col-md-6">
                {hook h="displayContentWrapperTop"}
                {block name="content"}
                  <p>Hello world! This is HTML5 Boilerplate.</p>
                {/block}
                {hook h="displayContentWrapperBottom"}
              </div>
            {/block}


{*                {if $page.page_name=='category'}*}
{*                    {if $category.id_parent == 17 || $category.id_parent == 18 ||$category.id_parent == 19 || $category.id_parent == 20}*}
{*                        <div class="block-category-inner_bottom block-category-inner {if $category.id_parent == 17 || $category.id_parent == 18 ||$category.id_parent == 19 || $category.id_parent == 20 && $category.description|count_characters > 500}long{/if}">*}
{*                            {if $category.description}*}
{*                                <div id="category-description" class="text-muted">{$category.description nofilter}</div>*}
{*                                {if $category.description|count_characters > 500}*}
{*                                    <div class="category-description-see-more text-center">*}
{*                                        <img alt="more" src="{$urls.img_url}arrow_up.svg">*}
{*                                    </div>*}
{*                                {/if}*}
{*                            {/if}*}
{*                        </div>*}
{*                    {/if}*}
{*                {/if}*}

            {block name="right_column"}
              <div id="right-column" class="col-xs-12 col-sm-4 col-md-3">
                {if $page.page_name == 'product'}
                  {hook h='displayRightColumnProduct'}
                {else}
                  {hook h="displayRightColumn"}
                {/if}
              </div>
            {/block}
          </div>
        </div>
        {hook h="displayWrapperBottom"}
      </section>

      <footer id="footer" class="js-footer">
        {block name="footer"}
            {assign var=footer_var value='_partials/type'|cat:Configuration::get('ecommbaseconfiguration_footer_type', true)|cat:'/footer.tpl'}
            {include file=$footer_var}
        {/block}

        <a href="javascript:" id="return-to-top"><i class="material-icons">keyboard_arrow_up</i></a>
      </footer>

    </main>

    {block name='javascript_bottom'}
      {include file="_partials/password-policy-template.tpl"}
      {include file="_partials/javascript.tpl" javascript=$javascript.bottom}
    {/block}

    {block name='hook_before_body_closing_tag'}
      {hook h='displayBeforeBodyClosingTag'}
    {/block}
  </body>

</html>
