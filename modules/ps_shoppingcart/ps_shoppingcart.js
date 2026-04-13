/* global $, prestashop */

/**
 * This module exposes an extension point in the form of the `showModal` function.
 *
 * If you want to override the way the modal window is displayed, simply define:
 *
 * prestashop.blockcart = prestashop.blockcart || {};
 * prestashop.blockcart.showModal = function myOwnShowModal (modalHTML) {
 *   // your own code
 *   // please not that it is your responsibility to handle closing the modal too
 * };
 *
 * Attention: your "override" JS needs to be included **before** this file.
 * The safest way to do so is to place your "override" inside the theme's main JS file.
 *
 */

$(document).ready(function() {



    prestashop.blockcart = prestashop.blockcart || {};

    var showModal = prestashop.blockcart.showModal ||
        function(modal) {
            var $body = $('body');
            $body.append(modal);
            $body.one('click', '#blockcart-modal', function(event) {
                if (event.target.id === 'blockcart-modal') {
                    $(event.target).remove();
                }
            });
        };
    prestashop.on('updateCart', function(event) {

        var refreshURL = $('.blockcart').data('refresh-url');
        var requestData = {};

        if (event && event.reason) {
            requestData = {
                id_product_attribute : event.reason.idProductAttribute,
                id_product : event.reason.idProduct,
                action : event.reason.linkAction
            };
        }

        $.post(refreshURL, requestData).then(function(resp) {
            $('.blockcart').replaceWith($(resp.preview).find('.blockcart'));

            var htmlObj = $(resp.preview);
            var id_product = event.reason.idProduct;
            var id_product_attribute = event.reason.idProductAttribute;

            $('.lateral-popup.cart-lateral-popup').html(htmlObj.find('.lateral-popup').html());
			
            //si estamos en pagina de cart conroller, no hacemos nada
            if(prestashop.page.page_name == 'cart') {
                return;
            }
			
			/*Si existen productos en el carrito, y existe la tabla del awtableproducts sincronizamos las unidades en la tabla para que tenga las mismas que el carrito*/
			if (typeof prestashop.cart !== 'undefined') {
				$.each(prestashop.cart.products, function(index, producto) {
				  // Acceder a los campos deseados para cada producto
				  var idProducto = producto.id;
				  var idProductoAttribute = producto.id_product_attribute;
				  var unidades = producto.cart_quantity;
				
				  if($('table#mpd-table-combinations').length) {
				  	 $('.mega-comb-qty-table[data-product='+idProducto+'][data-combination='+idProductoAttribute+']').attr('data-cartqty',unidades)
				  	 $('.mega-comb-qty-table[data-product='+idProducto+'][data-combination='+idProductoAttribute+']').val(unidades)
				  	 $('.mega-comb-qty-table[data-product='+idProducto+'][data-combination='+idProductoAttribute+']').parent().find('.p-quantity').text(unidades);
				  }
				});
			}
			 
			
            //si esta abierto el bloque, no hacemos nada y no esta activo el modulo ecommaddtocart en la modalidad advanced
            if (!$('.lateral-popup').hasClass('open') && $('.ecommaddtocart_product').length == 0 && $('.ecommaddtocart_productlist').length == 0) {
                $('body, html').animate({
                    scrollTop: 0
                }, 'fast');
                $('.blockcart.cart-preview').trigger('click');
            }

        }).fail(function(resp) {
            prestashop.emit('handleError', {
                eventType : 'updateShoppingCart',
                resp : resp
            });
        });
    });


    $(document).on('click', '.lateral-popup .product-delete', function(e) {
        /*Mod ecomm cambiado la clase de blockcart-popup por .container_cart para que coja el carrito*/
        e.preventDefault()
        var id_product = $(this).attr('data-id-product');
        var id_product_attribute = $(this).attr('data-id-product-attribute');
        $.ajax({
            type: 'POST',
            headers: { "cache-control": "no-cache" },
            url: prestashop.urls.base_url + "index.php?controller=cart",
            async: true,
            cache: false,
            data: $(this).attr('data-url') + '&ajax=true',
            success: function(response){
                $('.lateral-popup .product-'+id_product).slideToggle('slow');
                prestashop.emit('updateCart', {
                    reason: response
                });
            }
        })
    });

    /* Cart quantity */
    $(document).on('click', '.product-delete-cart', function(e){
        e.preventDefault();

        add_to_cart($(this).data('product-id'), 0, null, null, null, null, $(this).data('product-combination-id'),$(this).data('mega'));


    });

    $(document).on('click', '.btn-subtract-cart', function(e){
        $(this).parent().find('.lds-ring').addClass('show').next().hide();
        if($(this).data('product-qty') > 1){
            add_to_cart($(this).data('product-id'), -1, null, null, null, null,  $(this).data('product-combination-id'),$(this).data('mega'));
        }else{

        }
    });
    $(document).on('click', '.btn-add-cart', function(e){
        $(this).parent().find('.lds-ring').addClass('show').next().hide();
        add_to_cart($(this).data('product-id'), 1, null, null, null, null, $(this).data('product-combination-id'),$(this).data('mega'));
    });
});

function add_to_cart(id_product, qty, id_customization, groups, form_action, extra_var, id_combination,id_megacart) {

    if (typeof (qty) == 'undefined') {
        var qty = 1;
    }
     if (typeof (id_megacart) == 'undefined') {
        var id_megacart = 0;
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


    // InicializaciÃƒÂ³n por defecto en el caso que no nos pasen estas variables

    if (typeof (id_customization) == 'undefined' || id_customization == false) {
        var id_customization = 0;
    }


    //if (typeof (groups) == 'undefined' || !Object.keys(groups).length) {
    var groups = [];
//	}
    var form_action = prestashop.urls.pages.cart;
    //f (typeof (extra_var) == 'undefined' || !Object.keys(extra_var).length) {
    var extra_var = {};
    //}

    // Pasar la informaciÃƒÂ³n a formato array asociativo
    var form_data = {};
    form_data['token'] = prestashop.static_token;
    form_data['id_product'] = id_product;

    form_data['id_customization'] = '';

    if (Number.isInteger(id_combination)) {
        form_data['id_product_attribute'] = id_combination;
    }

    $.each(groups, function (name, value) {
        form_data[name] = value;
    });


    extra_var['action'] = 'update';
    if (qty < 0) {
        extra_var['add'] = 1;
        form_data['qty'] = qty;
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
   	form_data['id_megacart'] = id_megacart;
   	   	

    extra_var['ajax'] = 1;

    // Montamos la url en formato get para la peticiÃƒÂ³n post
    //var query = $.param(form_data) + '&' + $.param(extra_var);
    var data_final = $.extend(form_data, extra_var);

    // PeticiÃƒÂ³n post para aÃƒÂ±adir al carro por ajaz
    $.ajax({
        type : "POST",
        url : form_action,
        data : data_final,
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
        error : function(resp, status, error) {
            prestashop.emit('handleError', {
                eventType : 'addProductToCart',
                resp : resp
                
            });
        }
    });

}
