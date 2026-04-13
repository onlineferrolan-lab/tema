/**
 * 2008-2021 Prestaworld
 *
 * All right is reserved,
 *
 * @author    Prestaworld <prestaworld12@gmail.com>
 * @copyright 2008-2021 Prestaworld
 * @license   One Paid Licence By WebSite Using This Module. No Rent. No Sell. No Share.
 */

$(document).ready(function(){
    var id_product = $('input#idProduct').val();
    var id_product_attr = $('input#idProductAttr').val();
    if (typeof id_product !== 'undefined') {
        checkProductWishList(id_product, id_product_attr);
    }

    $(document).on('click', '#select_multiple_items_of_wishlist', function() {
        if ($('#select_multiple_items_of_wishlist').is(":checked")) {
            $(".Productcheckbox").prop('checked', true);
            console.log(get_selected_check_array());
        } else {
            $(".Productcheckbox").prop('checked', false);
        }
    });

    function get_selected_check_array()
    {
        var optionArr = []
        $(".Productcheckbox:checked").each(function(i, val) {
            dataid = $(this).attr('data-id');
            idProduct = $(this).attr('data-productid');
            quantity = $('#quantityProduct_'+$(this).attr('data-id')).val();
            idProductAttribute = $(this).attr('data-productattrid');
            idProductCustomization = $(this).attr('data-customizationid');
            var productData = {
                "id":dataid,
                "id_product": idProduct,
                "quantity": quantity,
                'id_product_attribute': idProductAttribute,
                'id_product_customisation': idProductCustomization
            }
            optionArr.push(productData);
        });
        return optionArr;
    }
    $(document).on('click', '.wishlist_btn a.btn.btn-info', function(){
        if (typeof presta_id_customer === 'undefined') {
            alert(presta_customer_error);
            return false;
        }
    });
    $(document).on('click', '#delete_multiple_products', function(){
        var multiple_products = get_selected_check_array();
        if (multiple_products.length === 0) {
            alert(presta_select_error);
        } else {
            $.ajax({
                type: 'post',
                cache: 'false',
                dataType: 'json',
                url : presta_mylist_url,
                data : {
                    'ajax': true,
                    'action' : 'deletemultipleproduct',
                    'multiple_products' : multiple_products
                },
                success: function(result) {
                    if (result.status == 'ko'){
                        $('#messageDiv').append('Product can not be removed from the wishlist');
                    } else if (result.status == 'ok'){
                        $('#messageDiv').append( 'Product successfully removed from wishlist');
                        setTimeout(function(){
                            window.location.reload();
                        },1000);
                    }
                }
            });
        }
        // console.log(multiple_products);
    });

    $(document).on('click', '#addtocart_multiple_products', function(){
        var multiple_products = get_selected_check_array();
        if (multiple_products.length === 0) {
            alert(presta_select_error);
        } else {
            $.ajax({
                type: 'post',
                cache: 'false',
                dataType: 'json',
                url : presta_mylist_url,
                data : {
                    'ajax': true,
                    'action' : 'addtocartmultipleproducts',
                    'multiple_products' : multiple_products
                },
                success: function(result) {
                    if (result.status == 'ko'){
                        $('#messageDiv').append('Product can not be added to cart from the wishlist');
                    } else if (result.status == 'ok'){
                        $('#messageDiv').append( 'Product successfully added to cart from wishlist');
                        setTimeout(function(){
                            window.location.reload();
                        },1000);
                    }
                }
            });
        }
        // console.log(multiple_products);
    });

    $(document).on('click', '.productListBtn', function() {
        if (typeof presta_id_customer === 'undefined') {
            alert(presta_customer_error);
            return false;
        }
        var id_product = $(this).attr("data-id-Product");
        var id_product_attr = $(this).attr("data-id-Attribute");
        var id_list = $(this).attr("data-default-Id");
        var thisobject = $(this);
        $.ajax({
            type: 'post',
            cache: 'false',
            dataType: 'json',
            url : presta_process_url,
            data : {
                'ajax': true,
                'action' : 'whislistprocess',
                'id_product' : id_product,
                'id_product_attribute' : id_product_attr,
                'id_list' : id_list
            },
            success: function(data) {
                if (data.status == 'ko'){
                    alert(data.msg);
                } else if (data.status == 'ok'){
                    // change image as per return response
                    if (data.responsecode == 1) {
                        // image will be red
                        $('.wishlistCount').empty().append(data.count);
                        // $("#Modal1").modal({backdrop: false});
                        // $("#Modal1").modal();
                        // setTimeout(function(){
                        //     $("#Modal1").modal('hide');
                        // },1000);
                        $(thisobject).closest('.productListBtnDiv').find('.productListBtn').addClass('active');
                    } else if (data.responsecode == 2) {
                        // image will be white
                        $('.wishlistCount').empty().append(data.count);
                        // $("#Modal2").modal({backdrop: false});
                        // $("#Modal2").modal();
                        // setTimeout(function(){
                        //     $("#Modal2").modal('hide');
                        // },1000);
                        $(thisobject).closest('.productListBtnDiv').find('.productListBtn').removeClass('active');
                    }
                }
            }
        });
    });

    $(document).on('click', '.presta_whistlist_process', function(e){
        e.preventDefault();
        var id_product = $('input#idProduct').val();
        var id_product_attr = $('input#idProductAttr').val();
        var idCustomization = $('input#idCustomization').val();
        var product_quantity_wanted = $('input#product_quantity_wanted').val();
        if (!product_quantity_wanted) {
            product_quantity_wanted = 1;
        }
        var id_wishlist = $(this).attr("data-id");
        if (id_wishlist){
            var id_list = id_wishlist;//for another wishlist
        }else {
            var id_list = $('input#id_default_list').val();//for default wishlist
        }
        $.ajax({
            type: 'post',
            cache: 'false',
            dataType: 'json',
            url : presta_process_url,
            data : {
                'ajax': true,
                'action' : 'whislistprocess',
                'id_product' : id_product,
                'id_product_attribute' : id_product_attr,
                'idCustomization' : idCustomization,
                'product_quantity_wanted' : product_quantity_wanted,
                'id_list' : id_list
            },
            success: function(data) {
                console.log(data.status);
                console.log("FAVORITE");
                if (data.status == 'ko'){
                    alert(data.msg);
                } else if (data.status == 'ok'){
                    // change image as per return response
                    if (data.responsecode == 1) {
                        // image will be red
                        // $('.presta_whistlist_process img').attr('src', added_img);
                        $('.imgbtn').find('.presta_whistlist_process').addClass('active');
                        $('.wishlistCount').empty().append(data.count);
                        // $("#Modal1").modal({backdrop: false});
                        // $("#Modal1").modal();
                        // setTimeout(function(){
                        //     $("#Modal1").modal('hide');
                        // },1000);
                    } else if (data.responsecode == 2) {
                        // image will be white
                        // $('.presta_whistlist_process img').attr('src', normal_img);
                        $('.imgbtn').find('.presta_whistlist_process').removeClass('active');
                        $('.wishlistCount').empty().append(data.count);
                        // $("#Modal2").modal({backdrop: false});
                        // $("#Modal2").modal();
                        // setTimeout(function(){
                        //     $("#Modal2").modal('hide');
                        // },1000);
                    }
                }
            }
        });
    });

    // $(document).on('click', '.addToCartbtn', function(){
    //     var idSwlProduct = $(this).attr("data-id");
    //     $.ajax({
    //         type: 'post',
    //         cache: 'false',
    //         dataType: 'json',
    //         url : presta_mylist_url,
    //         data : {
    //             'ajax': true,
    //             'action' : 'deletewishlistproduct',
    //             'id_product_wishlist' : idSwlProduct
    //         },
    //         success: function(result) {
    //             // window.location.reload();
    //         }
    //     });
    // });


    $(document).on('click', '#delete_swl_products', function(){
        var idSwlProduct = $(this).attr("data-id");
        $.ajax({
            type: 'post',
            cache: 'false',
            dataType: 'json',
            url : presta_mylist_url,
            data : {
                'ajax': true,
                'action' : 'deletewishlistproduct',
                'id_product_wishlist' : idSwlProduct
            },
            success: function(result) {
                console.log(result.status);
                if (result.status == 'ko'){
                    $('#messageDiv').append('Product can not be removed from the wishlist');
                } else if (result.status == 'ok'){
                    $('#messageDiv').append( 'Product successfully removed from wishlist');
                    setTimeout(function(){
                        window.location.reload();
                    },1000);
                }
            }
        });
    });

    $(document).on('click', '#createlistbtn', function(){
        var listName = $.trim($('input#newListName').val());
        if (!listName) {
            $('#newListName').css('border-color', 'red');
            $('#presta-list-error').text(presta_list_error).addClass('alert alert-danger');
            return false;
        }
        $.ajax({
            type: 'post',
            cache: 'false',
            dataType: 'json',
            url : presta_mylist_url,
            data : {
                'ajax': true,
                'action' : 'createWishlist',
                'listName' : listName
            },
            success: function(result) {
                if (result.status == 'ko') {
                    $('#messageDiv').append( 'Wishlist could not be created');
                } else if (result.status == 'ok') {
                    // $('#messageDiv').append(presta_list_success);
                    $('#presta-list-error').append(presta_list_success).addClass('alert alert-success');
                    setTimeout(function(){
                        window.location.reload();
                    },1000);
                } else if (result.status == 'ko1') {
                    $('#presta-list-error').text(presta_list_max_error).addClass('alert alert-danger');
                }
            },
            beforeSend: function() {
                $('#presta-list-error').text('').removeClass('alert alert-danger');
                $('#newListName').css('border-color', 'inherit');
            }
        });
    });

    $(document).on('click', '#createlistathook', function(){
        var listName = $.trim($('input#ListName').val());
        if (!listName) {
            $('#ListName').css('border-color', 'red');
            $('#presta-list-error').text(presta_list_error).addClass('alert alert-danger');
            return false;
        }
        if ($('#setIdDefault').is(":checked")) {
            var setIdDefault = 1;
        }
        $.ajax({
            type: 'post',
            cache: 'false',
            dataType: 'json',
            url : presta_process_url,
            data : {
                'ajax': true,
                'action' : 'createWishlist',
                'listName' : listName,
                'setIdDefault' : setIdDefault
            },
            success: function(result) {
                console.log(result.status);
                if (result.status == 'ko1') {
                    $('#presta-list-error').text(presta_list_max_error).addClass('alert alert-danger');
                } else if (result.status == 'ko'){
                    $('#Modal3').empty();
                    $('#Modal3').append('Wishlist could not be created');
                    $("#Modal3").modal();
                    setTimeout(function(){
                        $("#Modal3").modal('hide');
                    },2000);
                } else if (result.status == 'ok'){
                    $("#newList").modal('hide');
                    $("#Modal3").modal();
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                }
            }
        });
    });

    $(document).on('click', '.moveToList', function(){
        var idSwlist = $(this).attr("data-id");
        var idProduct = $(this).attr("data-idproduct");
        $.ajax({
            type: 'post',
            cache: 'false',
            dataType: 'json',
            url : presta_mylist_url,
            data : {
                'ajax': true,
                'action' : 'moveToWishlist',
                'idSwlist' : idSwlist,
                'idSwlProduct':idProduct
            },
            success: function(result) {
                console.log(result.status);
                if (result.status == 'ko'){
                    $('#messageDiv').append( 'Product can not be moved');
                } else if (result.status == 'ok'){
                    $('#messageDiv').append( 'Product successfully moved');
                    setTimeout(function(){
                        window.location.reload();
                    },1000);
                }
            }
        });
    });

    $(document).on('click', '#deleteListbtn', function(){
        var idlist = $(this).attr("data-id");
        var idlistDefault = $('input#id_list_default').val();
        if (idlist == idlistDefault){
            alert("Default list cannot be deleted");
        }else{
            $.ajax({
                type: 'post',
                cache: 'false',
                dataType: 'json',
                url : presta_mylist_url,
                data : {
                    'ajax': true,
                    'action' : 'deletelist',
                    'idlist' : idlist
                },
                success: function(result) {
                    console.log(result.status);
                    if (result.status == 'ko'){
                        $('#messageDiv').append( 'Wishlist could not be deleted');
                    } else if (result.status == 'ok'){
                        $('#messageDiv').append( 'Wishlist succesfully deleted');
                        setTimeout(function(){
                            window.open(presta_mylist_url, "_self");
                        },1000);
                    }
                }
            });
        }
    });

    $(document).on('click', '#addIdeaToList', function(){
        $("#addIdeaToList").hide();
        $(".addIdeaInput").css("display", "block");
    });

    $(document).on('click', '#updatelist', function(){
        var listName = $('input#ListName').val();
        var idlist = $(this).attr("data-id");
        var RecipientName = $('input#RecipientName').val();
        var listDescription = $('textarea#listDescription').val();
        if ($('#setIdDefault').is(":checked"))
        {
            var setIdDefault = $('input#setIdDefault').val();
        }
        $.ajax({
            type: 'post',
            cache: 'false',
            dataType: 'json',
            url : presta_mylist_url,
            data : {
                'ajax': true,
                'action' : 'updatelistsettings',
                'listName' : listName,
                'RecipientName' : RecipientName,
                'listDescription' : listDescription,
                'setIdDefault' : setIdDefault,
                'idlist' : idlist
            },
            success: function(result) {
                console.log(result.status);
                if (result.status == 'ko'){
                    $('#messageDiv').append( 'Wishlist settings could not be updated');
                } else if (result.status == 'ok'){
                    $('#messageDiv').append( 'Wishlist settings succesfully updated');
                    setTimeout(function(){
                        window.location.reload();
                    },1000);
                }
            }
        });
    });

    $(document).on('click', '#searchbutton', function(){
        var query = $('input#searchBar').val();
        var id_wishlist = $('input#idwishList').val();
        if (id_wishlist == ""){
            var id_wishlist = $('input#id_list').val();
        }
        $.ajax({
            type: 'post',
            cache: 'false',
            // dataType: 'json',
            url : presta_mylist_url,
            data : {
                'ajax': true,
                'action' : 'searchquery',
                'query' : query,
                'id_wishlist' :id_wishlist
            },
            success: function(result) {
                if (result) {
                    $('.contentItems').empty().append(result);
                } else {
                    $('.contentItems').empty();
                }
            }
        });
    });

    $('#searchBar').keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $('#searchbutton').trigger('click');
            return false;
        }
    });

    $(document).on('click', '#copylink', function(){
        var share_url = $(this).attr("data-url");
        $("#presta_texturl").select();
        document.execCommand("copy");
        alert("Url copied");
        window.location.reload();
    });

    $("#printList").on("click", function () {
        var listName = $('input#ListName').val();
        $(".hide_print").empty();
        var divContents = $(".contentItems").html();
        var printWindow = window.open('', '', 'height=800,width=800');
        printWindow.document.write('<html><head><title>DIV Contents</title><h2>');
        printWindow.document.write(listName);
        printWindow.document.write('</h2></head><body ><div style="text-align:center;">');
        printWindow.document.write(divContents);
        printWindow.document.write('</div></body></html>');
        printWindow.document.close();
        printWindow.print();
        window.location.reload();
    });

    $("#myBtn2").click(function(){
        $("#myModal2").modal({backdrop: false});
    });
});

$(document).ready(function () {
    prestashop.on(
        'updatedProduct',
        function (event) {
            if (typeof presta_wishlist_id_product !== 'undefined') {
                checkProductWishList(presta_wishlist_id_product, event.id_product_attribute);
            }
        }
    );
});

function checkProductWishList(id_product, id_product_attribute)
{
    //mod sito, cambiamos el valor de input hidden del wishlist
    $('#idProductAttr').val(id_product_attribute);

    $.ajax({
        type: 'post',
        cache: 'false',
        dataType: 'json',
        url : presta_process_url,
        data : {
            'ajax': true,
            'action' : 'checkproductexist',
            'id_product' : id_product,
            'id_product_attribute' : id_product_attribute,
            'id_default_list' : parseInt($('input#id_default_list').val())
        },
        success: function(checked) {
            if (checked.responsecode == 3){
                $('.imgbtn').find('.presta_whistlist_process').addClass('active');
                $('.wishlistCount').empty().append(checked.count);
            } else{
                $('.imgbtn').find('.presta_whistlist_process').removeClass('active');
                $('.wishlistCount').empty().append(checked.count);
            }
        }
    });
}
