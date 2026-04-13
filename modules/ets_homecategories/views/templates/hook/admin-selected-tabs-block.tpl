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
<ul class="hc-sort-block hc-sortable">
    {if $layout=='TAB_LIST' || $layout=='LIST_TAB'}
        {if isset($blockOrder) && $blockOrder=='FEATURE_ABOVE'}
            <li class="hc-sort-block-item featured-block">
                <div>{l s='Selected featured product tabs' mod='ets_homecategories'}</div>
                {include file="./admin-selected-tabs.tpl" categories=$featuredTabs tab='FEA'}
            </li>
            <li class="hc-sort-block-item categories-block">
                <div>{l s='Selected categories' mod='ets_homecategories'}</div>
                {include file="./admin-selected-tabs.tpl" categories=$categoryTabs tab='CAT'}
            </li>
        {else}
            <li class="hc-sort-block-item categories-block">
                <div>{l s='Selected categories' mod='ets_homecategories'}</div>
                {include file="./admin-selected-tabs.tpl" categories=$categoryTabs tab='CAT'}
            </li>
            <li class="hc-sort-block-item featured-block">
                <div>{l s='Selected featured product tabs' mod='ets_homecategories'}</div>
                {include file="./admin-selected-tabs.tpl" categories=$featuredTabs tab='FEA'}
            </li>
        {/if}
    {else}
        <li class="hc-sort-block-item categories-block">
            <div>{l s='Selected product tabs' mod='ets_homecategories'}</div>
            {include file="./admin-selected-tabs.tpl" categories=$categoryTabs}
        </li>
    {/if}
</ul>

