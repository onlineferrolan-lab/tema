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
<div class="container">
  <div class="row">
    {block name='hook_footer_before'}
      {hook h='displayFooterBefore'}
    {/block}
  </div>
</div>
<div class="footer-container">
  <div class="container">
    <div class="row">
      {block name='hook_footer'}
        {hook h='displayFooter'}
      {/block}
    </div>
  </div>
</div>
<div class="copyrightcontent border-top pt-3">
  <div class="container">

    <div class="row">
      <div class="col-12 col-sm-4 copyright">
        <p class="">
          © {$smarty.now|date_format:"%Y"}. Ferrolan. Todos los derechos reservados.
        </p>
      </div>
      {block name='hook_footer_after'}
        {hook h='displayFooterAfter'}
      {/block}
    </div>


    </div>
</div>

<div class="logos-kit-digital">
<img src="/img/prtr.png" alt="Kitdigital">
<img src="/img/ue.png" alt="Kitdigital">
</div>

<div id="registration-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
                <span>
                    {l s='Elige modalidad' d='Shop.Theme.Catalog'}
                </span>
        <button type="button" class="close" data-dismiss="modal" aria-label="{l s='Close' d='Shop.Theme.Global'}">
          <span aria-hidden="true"><i class="material-icons">close</i></span>
        </button>

      </div>
      <div class="modal-body">
        {renderLogo}
{*        <div class="titleblock">*}
{*          {l s='Únete a la familia Dareels' d='Shop.Theme.Catalog'}*}
{*        </div>*}
        <div class="subtitleblock">
          {l s='¿qué perfil tienes?' d='Shop.Theme.Catalog'}
        </div>
        <a class="action" href="{$urls.pages.register}">
          {l s='Particular' d='Shop.Theme.Catalog'}
        </a>
{*        <a class="action" href="{$urls.pages.register}?b2b">*}
        <a class="action" target="_blank" href="https://ferrolan.es/blog/alta-clientes-profesionales/">
          {l s='Profesional' d='Shop.Theme.Catalog'}
        </a>
      </div>
    </div>
  </div>
</div>
