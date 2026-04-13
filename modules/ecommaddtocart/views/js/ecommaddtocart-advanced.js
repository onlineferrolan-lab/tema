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
prestashop.blockcart.showModal = null;
$(document).ready(function () {
	
	
	$(document).on('change', 'input.p-quantity[type="number"]', function (e) {
	    
        if($(this).hasClass('aw-table')) {
        	var currentObj = $(this).closest('.mpd-input-td');
        	var quantity = $(this).closest('.mpd-input-td').find('input.p-quantity[type="number"]').val();
        } else {
        	var currentObj = $(this).closest('.ecommaddtocart_productlist');
        	var quantity = $(this).closest('.ecommaddtocart_productlist').find('input.p-quantity[type="number"]').val();
        }
        
        var id_product = currentObj.attr('attr-id-product');
    	var id_combination = currentObj.attr('attr-id_product_attribute');
        
        if(quantity > 0 && quantity != '') {
        	var cart_unit = 0;
        	if (typeof prestashop.cart !== 'undefined') {
				$.each(prestashop.cart.products, function(index, producto) {
					
				  // Acceder a los campos deseados para cada producto
				  var idProducto = producto.id;
				  var idProductoAttribute = producto.id_product_attribute;
				  var unidades = producto.cart_quantity;
				 
			      if(idProducto == id_product && id_combination == idProductoAttribute) {
			      		cart_unit = unidades; 
			      }
				  
				});
			}
        	// setTimeout(function(){
       	 	quantity = quantity - cart_unit;
       	 	ecomm_add_to_cart_form(currentObj, quantity)
       	 	// }, 2500);
        }
       
       
    });
	
	
    var showModal = "";
    prestashop.on(
        'updateCart',
        function (event) {
             ecomm_add_to_cart_refresh(event);
        }
    );

    prestashop.on(
        'updatedProduct',
        function (event) {
            if($('#product-details').data('product').id_product_attribute > 0 && $('.product-quantity .ecommaddtocart_productlist').length > 0) {
                $('.product-quantity .ecommaddtocart_productlist').attr('attr-id_product_attribute', $('#product-details').data('product').id_product_attribute )
                $('.product-quantity .ecommaddtocart_productlist').attr('minimal-qty', $('#product-details').data('product').minimal_quantity)

                var exist_in_cart = 0;
                var id_product = 0;
                var id_product_attribute = 0;
                var current_product = $('#product-details').data('product').id_product;
                var current_product_attribute = $('#product-details').data('product').id_product_attribute;
                $.each(prestashop.cart.products, function(index, producto) {

                    id_product = producto.id;
                    id_product_attribute = producto.id_product_attribute;

                    if (id_product == current_product && current_product_attribute == id_product_attribute ) {

                        $('.product-quantity .ecommaddtocart_productlist[attr-id-product='+current_product+'] .add-to-cart-productlist').addClass('hide');
                        $('.product-quantity .ecommaddtocart_productlist[attr-id-product='+current_product+'] .product-quantity').addClass('show');
                        $('.product-quantity .ecommaddtocart_productlist[attr-id-product='+current_product+'] p.p-quantity').text(producto.cart_quantity);
                    } else {
                        $('.product-quantity .ecommaddtocart_productlist[attr-id-product='+current_product+'] .add-to-cart-productlist').removeClass('hide');
                        $('.product-quantity .ecommaddtocart_productlist[attr-id-product='+current_product+'] .product-quantity').removeClass('show');
                        $('.product-quantity .ecommaddtocart_productlist[attr-id-product='+current_product+'] p.p-quantity').text(0);
                    }

                });




            }

        }
    );



    $(document).on('click', '.add-to-cart-productlist', function (e) {
        var currentObj = $(this).closest('.ecommaddtocart_productlist');
        ecomm_add_to_cart_changebutton(currentObj, "number", 1);
        currentObj.find('.p-quantity').val(1);
        ecomm_add_to_cart_form(currentObj, 1);
    });

    $(document).on('click', '.plus-prod', function (e) {
        var currentObj = $(this).closest('.ecommaddtocart_productlist');
        var currentQty = parseInt(currentObj.find('.p-quantity').val())+1;
        currentObj.find('.p-quantity').val(currentQty);

        ecomm_add_to_cart_form(currentObj, 1);
    })
    $(document).on('click', '.minus-prod', function (e) {
        var currentObj = $(this).closest('.ecommaddtocart_productlist');

        if (parseInt(currentObj.find('.p-quantity').val()) > 1) {
            var currentQty = parseInt($(this).parent().find('.p-quantity').val())-1;
            $(this).parent().find('.p-quantity').val(currentQty);
            ecomm_add_to_cart_form (currentObj, -1);
        } else {
            currentObj.find('.p-quantity').val(0);
            ecomm_add_to_cart_changebutton(currentObj, "button", 0);
            ecomm_add_to_cart_form (currentObj, 0);
          }
    })

});

function ecomm_add_to_cart_changebutton(obj, type = "button", qty = 1){
    if (type == "number"){
        obj.find('.add-to-cart-productlist').addClass("hide");
        obj.find('.product-quantity').addClass("show");
        obj.find('.product-quantity').find('.p-quantity').val(qty);
    }
    else {
        obj.find('.add-to-cart-productlist').removeClass("hide");
        obj.find('.product-quantity').removeClass("show");
        obj.find('.product-quantity').find('.p-quantity').val(qty);
    }
}

function ecomm_add_to_cart_refresh(event){
    event.resp.cart.products.forEach( function(value, index, array) {
        var id_product = value.id_product;
        var currentObj = $(".ecommaddtocart_productlist[attr-id-product='"+id_product+"']").closest('.ecommaddtocart_productlist');
        ecomm_add_to_cart_changebutton(currentObj, "number", value.cart_quantity);
    });
}

function ecomm_add_to_cart_form(el, qty) {
    var id_product = el.attr('attr-id-product');
    var id_combination = el.attr('attr-id_product_attribute');
    var id_customization = false;
    var groups = {};
    var form_action  = false;
    var extra_var
    // Añadir al carro
    ecomm_add_to_cart(id_product, qty, id_customization, groups, form_action, extra_var, id_combination)
}


/* *
 * AÃ±adir un producto al carrito por Ajax
 *
 * + id_producto -> Id del productoa aÃ±adir. Es obligatoria.
 *
 * - qty -> Cantidad que se quiere aÃ±adir al carro. Por defecto 1.
 * - id_customization -> Id de la personalizaciÃ³n concreta del producto. Por defecto 0.
 * - groups -> Array asociativo con todos los campos extra que necesitemos enviar, por ejemplo los atributos seleccionados. Por defecto vacÃ­o.
 * - form_action -> A que URL debe hacerse la peticiÃ³n. Por defecto al carrito
 * - extra_var -> Array asociativo de valores extra a pasar por get
 *
 */
function ecomm_add_to_cart(id_product, qty, id_customization, groups, form_action, extra_var, id_combination) {
    if (typeof (qty) == 'undefined') {
        var qty = 1;
    }
    //actualizamos el valor total superior
    if ($('.blockcart .cart-products-count').length){
        var currentqty = parseInt($('.blockcart .cart-products-count').text());
        if (qty < 0) {
            currentqty = currentqty - 1;
        }
        else if(qty == 0){
            currentqty = currentqty - 1;
        }
        else{
            currentqty = currentqty + parseInt(qty);
        }
        currentqty = parseInt(currentqty);
        $('.blockcart .cart-products-count').text(currentqty);
    }


    // InicializaciÃ³n por defecto en el caso que no nos pasen estas variables

    if (typeof (id_customization) == 'undefined' || id_customization == false) {
        var id_customization = 0;
    }


    if (typeof (groups) == 'undefined' || !Object.keys(groups).length) {
        var groups = [];
    }
    if (typeof (form_action) == 'undefined' || form_action == false) {
        var form_action = prestashop.urls.pages.cart;
    }
    if (typeof (extra_var) == 'undefined' || !Object.keys(extra_var).length) {
        var extra_var = {};
    }

    // Pasar la informaciÃ³n a formato array asociativo
    var form_data = {};
    form_data['token'] = prestashop.static_token;
    form_data['id_product'] = id_product;

    form_data['id_customization'] = id_customization;

    if (Number.isInteger(id_combination)) {
        form_data['id_product_attribute'] = id_combination;
    }

    $.each(groups, function (name, value) {
        form_data[name] = value;
    });


    if($('input[name="custom_qty"]').length) {
		var custom_qty = $('input[name="custom_qty"]').val();;
		var array_qty = custom_qty.split(',');
		$.each(array_qty, function(index, value) {
	        array_qty[index] = parseInt(value) * qty;
	    });
	    var string_qty = array_qty.join(',');
	   
		extra_var['id_customizations'] = $('input[name="id_customizations"]').val();
		extra_var['custom_qty'] = $('input[name="custom_qty"]').val();
		extra_var['id_accessories_attributes'] = $('input[name="id_accesories_attributes"]').val();
		extra_var['id_accessories'] = $('input[name="id_accessories"]').val();
	}
	
    extra_var['action'] = 'update';
    if (qty < 0) {
        extra_var['add'] = 1;
        form_data['qty'] = Math.abs(qty);
        extra_var['op'] = 'down';
    }
    else if(qty == 0){
        extra_var['delete'] = '1';
    }
    else{
        form_data['qty'] = qty;
        extra_var['add'] = 1;
        extra_var['op'] = 'up';
    }


    extra_var['ajax'] = 1;

    // Montamos la url en formato get para la peticiÃ³n post
    //var query = $.param(form_data) + '&' + $.param(extra_var);
    var data_final = $.extend(form_data, extra_var);
 

    // Petición post para aÃ±adir al carro por ajaz
    $.ajax({
        type: "POST",
        url: form_action,
        data: data_final,
        success: function (resp) {
            if (resp.hasError) {
                show_modal(resp.errors, 'error');
            } else {
                var resp = jQuery.parseJSON(resp );
                prestashop.emit('updateCart', {
                    reason: {
                        idProduct: resp.id_product,
                        idProductAttribute: resp.id_product_attribute,
                        idCustomization: resp.id_customization,
                        linkAction: 'add-to-cart',
                        cart: resp.cart
                    },
                    resp: resp
                });


            }
        },
        error: function (resp, status, error) {
            prestashop.emit('handleError', {eventType: 'addProductToCart', resp: resp});
        }
    });


}
