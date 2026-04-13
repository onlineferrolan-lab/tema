$(document).ready(function () {

    $(document).on('click', '#productListBtn', function () {
        var idSwlProduct = $(this).attr("data-id-product");
        $.ajax({
            type: 'post',
            cache: 'false',
            dataType: 'json',
            url: presta_mylist_url,
            data: {
                'ajax': true,
                'action': 'deletewishlistproduct',
                'id_product_wishlist': idSwlProduct
            },
            success: function (result) {
                console.log(result.status);
                if (result.status == 'ko') {
                    $('#messageDiv').append('Product can not be removed from the wishlist');
                } else if (result.status == 'ok') {
                    $('#messageDiv').append('Product successfully removed from wishlist');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }
            }
        });
    });

})