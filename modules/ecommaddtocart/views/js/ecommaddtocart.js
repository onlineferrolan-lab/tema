/**
* 2007-2021 PrestaShop
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/
/* add to cart from product list */
// Usamos la función personalizada en vez de la nativa de Prestashop porque la nuestra tiene mensajes de error

$(document).ready(function () {
    createQuantitySpin();

    $(document).ajaxComplete(function() {
        setTimeout(function(){
            createQuantitySpin();
        }, 500);
    });
});

function createQuantitySpin() {

    $('.ecommaddtocart-quantity').each(function(){
        var quantityInput = $(this);
        quantityInput.TouchSpin({
            verticalbuttons: true,
            verticalupclass: 'material-icons touchspin-up',
            verticaldownclass: 'material-icons touchspin-down',
            buttondown_class: 'btn btn-touchspin js-touchspin',
            buttonup_class: 'btn btn-touchspin js-touchspin',
            min: parseInt(quantityInput.attr('min'), 10),
            max: 1000000
        });

        quantityInput.on('change', function (event) {
            let $productRefresh = $('.product-refresh');
            $(event.currentTarget).trigger('touchspin.stopspin');
            $productRefresh.trigger('click', {eventType: 'updatedProductQuantity'});
            event.preventDefault();

            return false;
        });
    });
}
