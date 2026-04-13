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
{if isset($children) && $children}
    <ul class="hc-sub hc-sub-{$id_category|intval} {if $active}active{/if}" data-id-parent="{$id_category|intval}">
        {foreach from=$children item='category'}
            <li>
                <a class="hc-cat" href="{$link->getCategoryLink($category.id_category)|escape:'html':'UTF-8'}" data-id-category="{$category.id_category|intval}" data-id-feature="{if $id_category<0}{$id_category|intval}{else}no{/if}" data-id-parent="{if $layout=='TAB'}tab{else}{$id_category|intval}{/if}">{$category.name|escape:'html'}</a>
            </li>
        {/foreach}
    </ul>
{/if}
