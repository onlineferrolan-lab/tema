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
<section class="featured-products clearfix mt-3">
  <div class="h2">
      {l s='Te puede interesar' d='Shop.Theme.Catalog'}

  </div>
  {capture assign="productClasses"}col-xs-6 col-lg-4 col-xl-3{/capture}

  <div class="products owl-carousel" items="5-5-4-2" dots="true" nav="false">
    {foreach from=$products item="product" key="position"}
      {block name="product_miniature"}
        {include file='catalog/_partials/miniatures/product.tpl' product=$product position=$position productClasses=$productClasses}
      {/block}
    {/foreach}
  </div>

</section>
