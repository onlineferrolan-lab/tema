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
<script type="text/javascript">
    {if isset($frontJs) && $frontJs}
        {foreach from = $frontJs key ='ID' item='config'}
            {if $config.type == 'isInt'}
                var {$ID|escape:'html':'utf-8'} = {$config.value|intval};
            {elseif $config.type == 'isString'}
                var {$ID|escape:'html':'utf-8'} ='{$config.value|escape:'html':'utf-8'}';
            {/if}
        {/foreach}
    {/if}
    var homecat_ajax_link = '{$homecat_ajax_link nofilter}';
    var homecat_rand_seed = {$homecat_rand_seed|intval};
    var homecat_more_txt = "{l s='View more products' mod='ets_homecategories'}";
    var homecat_no_more_found_txt = "{l s='No more products found' mod='ets_homecategories'}";
</script>

