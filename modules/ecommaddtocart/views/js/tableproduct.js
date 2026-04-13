
$(document).on('click', '#ecommaddtocart_tableproduct .buttonsqty span', function(e){

   var qtyelement = $(this).closest('.qtycontent').find('.qty');
   var qty = parseInt(qtyelement.val());

   if ($(this).hasClass('up')){
       qty = qty+1;
       qtyelement.val(qty);
   }
    else{
         if (qty > 0){
             qtyelement.val(qty-1);
         }
    }
});
$(document).on('click', '#ecommaddtocart_tableproduct .popupnostock', function (e) {
    e.preventDefault();
    var id_product = $(this).closest('li').attr('id_product');
    var id_product_attribute = $(this).closest('li').attr('id_product_attribute');

    $('#ecommaddtocart_nostock_modal').find('.ajaxcall').attr('id_product', id_product).attr('id_product_attribute', id_product_attribute);
    $('.gdprerror, .error, .success').hide();
    $("#ecommaddtocart_nostock_modal .ajaxcall, #ecommaddtocart_nostock_modal .email, #ecommaddtocart_nostock_modal .gdpr_consent ").show();
    $('#ecommaddtocart_nostock_modal').modal('show');
    return false;
});
$(document).on('click', '#ecommaddtocart_tp_add', function(e){
    //check cart is created
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: ecommaddtocart_ajaxurl,
        data: {checkcart : true},
        success: function (resp) {

            $('#ecommaddtocart_tableproduct .qty').each(function(){
                var qty = $(this).val();
                if (qty > 0){
                    var id_product = parseInt($(this).attr('id_product'));
                    var id_combination = parseInt($(this).attr('id_product_attribute'));
                    var id_customization = false;
                    var groups = {};
                    var form_action  = false;
                    var extra_var

                    ecomm_add_to_cart(id_product, qty, id_customization, groups, form_action, extra_var, id_combination)


                }

            });
            $('#ecommaddtocart_tableproduct .qty').val(0);
        }
    });




});
