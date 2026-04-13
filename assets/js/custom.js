$(document).on('click', '#categories_manufacturer-loadmore', function() {
    const itemsToShow = 9;
    $('.subcategory-container.hidden').slice(0, itemsToShow).removeClass('hidden').fadeIn();

    // Si no quedan más elementos ocultos, oculta el botón
    if ($('.subcategory-container.hidden').length === 0) {
        $(this).hide(); // O $(this).prop('disabled', true);
    }
});

$(document).ready(function(){
    /* DESPLEGABLE lateral carrito y customer */
    $(document).on('click', '.blockcart.cart-preview', function(e) {
        e.preventDefault();
        $('#_desktop_user_info .user-popup').removeClass('open');
        $(this).parent().find('.lateral-popup').toggleClass('open');
        $('body').toggleClass('openLateralPopup');
    });
    $(document).on('click', '#header .lateral-popup .close-popup', function() {
        $(this).closest('.lateral-popup').removeClass('open');
        $('body').removeClass('openLateralPopup');
    });

    $(document).on('click', '.user-info', function(e) {
        e.preventDefault();
        $('#_desktop_user_info').next().toggleClass('open');
        $('body').toggleClass('openLateralPopup');
    });
    /* end DESPLEGABLE lateral carrito y customer */

    $(document).on('click', 'header .fakesearch', function(e) {
        e.preventDefault();
        $(this).next().toggleClass('open');
        $('body').toggleClass('openSearchMobile');
    });



    $('#right-button').click(function(event) {
        event.preventDefault();
        widthli = $('.subcategories-list li').outerWidth(true);

        $('.subcategories-list').animate({
            scrollLeft: "+="+widthli

        }, "fast");
    });

    $('#left-button').click(function(event) {
        event.preventDefault();
        widthli = $('.subcategories-list li').outerWidth(true);
        $('.subcategories-list').animate({
            scrollLeft: "-="+widthli
        }, "fast");
    });

    /*Boton de volver arriba*/
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 200) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });
    
    /*para ver si el input del attachment tiene fichero mover la label*/
    $('.attachment_box input').on('change', function() {
        if($(this).val() != '' ) {
        	$(this).closest('.sub-form-group').addClass('active_label')
        } else {
        	$(this).closest('.sub-form-group').removeClass('active_label')
        }
    });
    
});
