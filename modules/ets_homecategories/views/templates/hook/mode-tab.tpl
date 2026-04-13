{*
* 2007-2019 ETS-Soft
*
* NOTICE OF LICENSE
*
* This file is not open source! Each license that you purchased is only available for 1 wesite only.
* If you want to use this file on more websites (or projects), you need to purchase additional licenses.
* You are not allowed to redistribute, resell, lease, license, sub-license or offer our resources to any third party.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please, contact us for extra customization service at an affordable price
*
*  @author ETS-Soft <etssoft.jsc@gmail.com>
*  @copyright  2007-2019 ETS-Soft
*  @license    Valid for 1 website (or project) for each purchase of license
*  International Registered Trademark & Property of ETS-Soft
*}
{if $categoryTabs}
    <div class="hc-layout hc-mode-tab hc-{$ETS_HOMECAT_LISTING_MODE|escape:'html':'UTF-8'} {if $ETS_HOMECAT_LOADING_ENABLED}hc-loading-enabled{/if}">
        <ul class="hc-tabs">
            <li class="hc-tab product-miniature" data-id-category="tab">
                <div class="hc-tab-parent">
                    {foreach from=$categoryTabs item='category' key='key'}
                        {if $category.id_category>0 || isset($category.link)}
                            <a class="hc-cat parent-cat {if $key==0}active{/if}" href="{if isset($category.link)}{$category.link|escape:'html':'UTF-8'}{else}{$link->getCategoryLink($category.id_category)|escape:'html':'UTF-8'}{/if}" data-id-category="{$category.id_category|intval}" data-id-parent="tab" data-id-feature="no">{$category.name|escape:'html'}</a>
                        {else}
                            <span class="hc-cat parent-cat {if $key==0}active{/if} no-link" data-id-category="{$category.id_category|intval}"  data-id-parent="tab" data-id-feature="no">{$category.name|escape:'html'}</span>
                        {/if}
                    {/foreach}
                </div>
                {if $ETS_HOMECAT_DISPLAY_SUB}
                    <div class="hc-tab-sub">
                        {foreach from=$categoryTabs item='category' key='key'}
                            {assign var='active' value=($key==0)}
                            {hook h='displaySubCategories' id_category=$category.id_category active=$active layout='TAB'}
                        {/foreach}
                    </div>
                {/if}
                {include file="./sort.tpl" id_category=$categoryTabs.0.id_category}
                <div class="hc-products-container">
                    {hook h='displayProductList' id_category=$categoryTabs.0.id_category active=1 id_parent='tab'}
                </div>
            </li>
        </ul>
    </div>
{/if}
