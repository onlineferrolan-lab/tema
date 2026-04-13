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
{if $ETS_HOMECAT_ALLOW_SORT && $sortOptions}
    <form action="{$homecat_ajax_link|escape:'html':'UTF-8'}" method="post" {if $id_category==-5}class="hc-hidden"{/if}>
        <label for="homecat_sort_by_{$id_category|escape:'html':'utf-8'}">{l s='Sort by' mod='ets_homecategories'}</label>
        <select name="homecat_sort_by" class="homecat_sort_by">
            {foreach from=$sortOptions item='option'}
                <option {if $sort_by==$option.id_option}selected="selected"{/if}
                        value="{$option.id_option|escape:'html':'UTF-8'}">{$option.name|escape:'html':'UTF-8'}</option>
            {/foreach}
        </select>
    </form>
{/if}