
$(document).ready(function () {
    $(document).on('click', '.ecommaddtocart_productlist .no_stock', function (e) {
        e.preventDefault();

        $('#ecommaddtocart_nostock_modal').find('.ajaxcall').attr('id_product', $(this).attr('id_product'));
        $('.gdprerror, .error, .success').hide();
        $("#ecommaddtocart_nostock_modal .ajaxcall, #ecommaddtocart_nostock_modal .email, #ecommaddtocart_nostock_modal .gdpr_consent ").show();
        $('#ecommaddtocart_nostock_modal').modal('show');
        return false;
    });
    $(document).on('click', '.ajaxcall', function(){
        $('.gdprerror, .error, .success').hide();

        //check gdpr
        if ($('#ecommaddtocart_nostock_modal .psgdpr_consent_message').length > 0) {
            if ($('#ecommaddtocart_nostock_modal .psgdpr_consent_message input').is(':checked') == false) {
                $('.gdprerror').show();
                return;
            }
        }

        if ($('#ecommaddtocart_nostock_modal .email').length > 0) {
            if ($('#ecommaddtocart_nostock_modal .email').val() == ''){
                $('.erromail').show();
                return;
            }
        }

        var email = $('#ecommaddtocart_nostock_modal').find('.email').val();
        var id_product = $(this).attr('id_product');
        var id_product_attribute = $(this).attr('id_product_attribute');

        $.ajax({
            type: "POST",
            dataType: 'json',
            url: ecommaddtocart_ajaxurl,
            data: {email : email, id_product_attribute : id_product_attribute, id_product : id_product},
            success: function (resp) {
                console.log(resp.message);
                console.log(resp);
                if (resp.error) {
                    var txt = resp.message;
                    $('#ecommaddtocart_nostock_modal .ajax.error').text(txt).show();
                } else {
                    var txt = resp.message;
                    $('#ecommaddtocart_nostock_modal .ajax.success').text(txt).show();
                    $("#ecommaddtocart_nostock_modal .ajaxcall, #ecommaddtocart_nostock_modal .email, #ecommaddtocart_nostock_modal .gdpr_consent, #ecommaddtocart_nostock_modal .content .header ").hide();
                }
            },
            error: function (resp, status, error) {
                prestashop.emit('handleError', {eventType: 'addProductToCart', resp: resp});
            }
        });



    });
});