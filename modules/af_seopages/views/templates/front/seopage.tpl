{*
*  @author    Amazzing <mail@mirindevo.com>
*  @copyright Amazzing
*  @license   https://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}

{extends file='catalog/listing/product-list.tpl'}

{block name='content_top'}

	<h1 class="page-header">{$seo_data.header}</h1>
	<div class="page-description">{$seo_data.description nofilter}</div>


    <div class="amazzingfiltercontent">
        <div class="contentfakefilteritems fullwidth" style="display: none">
            <div class="container">
                <div class="inside">
                    <div class="title">{l s='Descubre nuestras colecciones' d='Shop.Theme.Actions'}</div>

                    <ul class="owl-carousel fakefilteritems" items="8-6-4-2" nav="true" dots="false"></ul>
                </div>
            </div>
        </div>
        <div class="amazingfilterlateral">
            {hook h='displayAmazzingFilter'}
            <div class="close">
                <span class="material-icons">close</span>
            </div>
        </div>

    </div>



{/block}

{block name='product_list' append}
	<div class="page-description-lower">{$seo_data.description_lower nofilter}</div>
{/block}

{* since 0.1.2 *}
