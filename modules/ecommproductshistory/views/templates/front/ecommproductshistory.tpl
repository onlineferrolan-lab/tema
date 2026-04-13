{*
* 2007-2018 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author Snegurka <site@web-esse.ru>
*  @copyright  2007-2020 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

{extends file='customer/page.tpl'}

{block name='page_title'}
    <h1>
        <h1>{l s='Product list' mod='ecommproductshistory'}</h1>
    </h1>
{/block}

{block name="page_content"}
    <div class="ecommproductshistory">
        {if isset($products) && $products}
            <form action="{url entity='module' name='ecommproductshistory' controller='myaccount'}" id="products-sort"
                  method="post">
                {if isset($smarty.post.sortby)}
                    {assign var='option' value=$smarty.post.sortby}
                {elseif isset($smarty.get.sortby)}
                    {assign var='option' value=$smarty.get.sortby}
                {else}
                    {assign var='option' value=''}
                {/if}
                <label for="sortby" class="sort-form-label">{l s='Sort by:' mod='ecommproductshistory'}</label>

                <select name="sortby" id="select-sort">
                    <option value="qty_bought-desc"{if $option == 'qty_bought-desc'} selected="selected"{/if}>{l s='Bought quantity descending' mod='ecommproductshistory'}</option>
                    <option value="qty_bought-asc"{if $option == 'qty_bought-asc'} selected="selected"{/if}>{l s='Bought quantity ascending' mod='ecommproductshistory'}</option>
                    <option value="name-desc"{if $option == 'name-desc'} selected="selected"{/if}>{l s='Name descending' mod='ecommproductshistory'}</option>
                    <option value="name-asc"{if $option == 'name-asc'} selected="selected"{/if}>{l s='Name ascending' mod='ecommproductshistory'}</option>
                    <option value="id_category_default-desc"{if $option == 'id_category_default-desc'} selected="selected"{/if}>{l s='Category descending' mod='ecommproductshistory'}</option>
                    <option value="id_category_default-asc"{if $option == 'id_category_default-asc'} selected="selected"{/if}>{l s='Category ascending' mod='ecommproductshistory'}</option>

                </select>
            </form>
            <div class="clearfix"></div>
            <div id="products-content" class="clearfix">
                {foreach from=$products item=product name=myLoop}
                    {include file="module:ecommproductshistory/views/templates/front/product.tpl" product=$product}
                {/foreach}
            </div>
            <div class="clearfix"></div>
            {if $pages_nb > 1}
                <div id='products-pagination'>
                    {if !empty($option)}
                        {if $p-1 == 0}
                            {assign var='param' value='&sortby='|cat:$option}
                        {else}
                            {assign var='param' value='?sortby='|cat:$option}
                        {/if}
                        {assign var='param2' value='&sortby='|cat:$option}
                    {else}
                        {assign var='param' value=''}
                        {assign var='param2' value=''}
                    {/if}
                    <a href="{if $p == 1}#{else}{$link->goPage($requestPage, $p-1)}{$param}{/if}" id='pagination_prev'
                       class='{if $p == 1}disabled{/if}'><i class="material-icons">keyboard_arrow_left</i></a>
                    <span>{$p} {l s='of' mod='ecommproductshistory'} {$pages_nb}</span>
                    <a href="{if $p == $pages_nb}#{else}{$link->goPage($requestPage, $p+1)}{$param2}{/if}"
                       id='pagination_next' class='{if $p == $pages_nb}disabled{/if}'><i class="material-icons">keyboard_arrow_right</i></a>
                </div>
            {/if}
        {else}
            <p class="alert alert-warning">{l s='You have not purchased any products yet.' mod='ecommproductshistory'}</p>
        {/if}
    </div>
{/block}

{block name='page_footer'}
    {block name='my_account_links'}
        {include file='customer/_partials/my-account-links.tpl'}
    {/block}
{/block}