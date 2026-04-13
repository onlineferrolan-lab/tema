
/*zoom miniauturas*/
$(document).on('click', '#megacategoryimagescontent li, .type3 .img', function() {
    $('#megacategoryimagescontent_modal').remove();
    var url_img = $(this).find('img').attr('src');
    url_img = url_img.replace('_resize.webp', '.jpg');
    $('body').append(`
        <div id="megacategoryimagescontent_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="{l s='Close' d='Shop.Theme.Global'}">
                            <span aria-hidden="true"><i class="material-icons">close</i></span>
                        </button>
                    </div>
                    <div class="modal-body">
                       <img src="${url_img}" class="img-fluid" alt="">
                    </div>
                </div>
            </div>
        </div>
    `);


    $('#megacategoryimagescontent_modal').modal('show');
});



/*zoom miniauturas end*/

/*desplegable filtro*/
if($('.af_filter').length > 0){
    $('.fakefilter').show();
}
/*cogemos los primeros 4 items*/
$('.af_filter.isminimized').each(function(index) {
    var title = $(this).find('.af_subtitle').text();
    var content = $(this).find('.af_filter_content').html();
    var html = '<li><div class="title" rel="'+$(this).attr('data-url')+'">' + title + '</div></li>';
    $('.fakefilter > li:last').after(html);
});
/*end desplegable filtro*/

$(document).ready(function() {
    /*desplegable filtro*/
    $(document).on('click', 'ul.elements.fakefilter > li:not(.showfilter)', function() {
        var id = $(this).find('.title').attr('rel');
        if ($('#bg_amazzingfilter').length === 0) {
            // Crea el div y lo inserta justo después de la etiqueta <body>
            $('<div>', {
                id: 'bg_amazzingfilter',
                text: '',
            }).prependTo('body');
        }
        $('body').toggleClass('amazingfilterlaterlactive');
        // if (!$('.af_filter[data-url="'+id+'"]').hasClass('expandable')) {
         if ($('.af_filter[data-url="'+id+'"]').hasClass('closed')) {
            $('.af_filter[data-url="'+id+'"] .toggle-content').click();
        }


        var liPos = $('.af_filter[data-url="'+id+'"] .toggle-content').offset().top;
        var contenedorPos = $('#amazzing_filter').offset().top;
        var scrollPos = liPos - contenedorPos + $('#amazzing_filter').scrollTop();
        $('#amazzing_filter').animate({
            scrollTop: scrollPos
        }, 500); // 500 ms es la duración de la animación



    });
    $(document).on('click', '#btn-filter-mobileBAK, .amazzingfiltercontent .showfilter, .amazzingfiltercontent .closebak,div#bg_amazzingfilter', function(){

        if ($('#bg_amazzingfilter').length === 0) {
            // Crea el div y lo inserta justo después de la etiqueta <body>
            $('<div>', {
                id: 'bg_amazzingfilter',
                text: '',
            }).prependTo('body');
        }
        $('body').toggleClass('amazingfilterlaterlactive');
    });
    /*fin desplegable filtro*/


    /*mostrar mas subcategorias*/
    var itemsMostrados = 12;
    var totalItems = $('.subcategories .sublist .item').length;
    $(document).on('click', '#subcategories-loadmore', function(){
        // Mostrar los siguientes 6 elementos
        $('.subcategories .sublist .item.show').nextAll(':not(.show)').slice(0, 12).addClass('show');

        // Actualizar el contador de elementos mostrados
        itemsMostrados += 12;

        // Si todos los elementos están mostrados, ocultar el botón
        if(itemsMostrados >= totalItems) {
            $('#mostrar-mas').hide();
        }
    });
    /*end mostrar mas subcategorias*/


    $('.subcategoriestop h2').on('click', function(e) {
        if($(this).attr('rel') != undefined){
            e.preventDefault();
            var target = $('.subcategories '+$(this).attr('rel'));
            var offset = target.offset().top - 150; // Calcula la posición con el desplazamiento hacia arriba

            $('html, body').animate({
                scrollTop: offset
            }, 800); // Desplazamiento animado de 800 ms
        }

    });

    $(document).on('click', '.category-description-see-more', function (e) {
        if ($(this).hasClass('up-text')) {
            $(".category-text").removeClass("text-down");
            $(".category-description-see-more").removeClass("up-text");
        } else {
            $(".category-text").addClass("text-down");
            $(".category-description-see-more").addClass("up-text");
        }

    });

    if ($('#btn-filter-mobile').length){
        $('#left-column').prepend('<i class="material-icons d-inline hidden-lg-up" id="closefilter">close</i>')


    }
    $(document).on('click', '#btn-filter-mobile, #closefilter', function(){
       //as4 $("body").toggleClass('filteropen');
        $('.compact-toggle').click();
    });

    $(document).on('click', '.PM_ASBlockOutputVertical .PM_ASCriterionsGroupTitle, .category-top-menu .title', function (){
       $(this).toggleClass('active').next().slideToggle();
    });



    // Función para manejar la visibilidad de los LI


    // Ejecutar la función al cargar la página
   // manageOverflowList();

    // Ejecutar la función cuando se redimensiona la ventana
    // Usamos un 'debounce' para optimizar el rendimiento y evitar que la función se ejecute miles de veces
    // let resizeTimer;
    // $(window).on('resize', function() {
    //     clearTimeout(resizeTimer);
    //     resizeTimer = setTimeout(manageOverflowList, 150);
    // });

});

// function manageOverflowList() {
//     const $ul = $('body:not(.amazingfilterlaterlactive) form.af-form .column');
//     if ($ul.length === 0) return; // Salir si no hay UL
//
//     // 1. Obtiene el ancho disponible del UL
//     //quitamos el filtro ultimo que es el boton del filtro
//     const ulWidth = $ul.width()-105;
//     let currentTotalWidth = 0;
//
//     // 2. Itera sobre todos los elementos LI dentro del UL
//     $ul.children('.af_filter').each(function() {
//         const $li = $(this);
//
//         // Elimina la clase oculta para recalcular en cada redimensionamiento
//         $li.removeClass('hidden-li');
//
//         // 3. Calcula el ancho real del LI (incluyendo margen derecho)
//         // .outerWidth(true) incluye padding, border y margen.
//         // Si solo usas .outerWidth(), solo incluye padding y border.
//         // Para este ejemplo, usaremos el cálculo del ancho con margen.
//         const liWidth = $li.outerWidth(true) + 12;
//
//         console.log(liWidth)
//         // 4. Comprueba si el elemento actual cabe
//         if (currentTotalWidth + liWidth <= ulWidth) {
//             // Si cabe, se mantiene visible y suma su ancho
//             currentTotalWidth += liWidth;
//         } else {
//             // Si NO cabe, lo oculta
//             $li.addClass('hidden-li');
//         }
//     });
// }
//

/*owl carosusel para amazingfilter */
createsliderAmazingfilter();
$(document).on('click', 'ul.fakefilteritems img, ul.fakefilteritems .name', function() {
    var id = $(this).closest('label').attr('for');
    $('.af_filter label[for=' + id +'] input').click();
    $(this).closest('li').toggleClass('active');
});
function createsliderAmazingfilter() {
    var fakeslider = $(".fakefilteritems");

    // Si ya existe un owl-carousel inicializado, destruirlo antes de crear uno nuevo
    if (fakeslider.hasClass('owl-carousel')) {
        fakeslider.trigger('destroy.owl.carousel');
        fakeslider.removeClass('owl-carousel owl-loaded');
        fakeslider.find('.owl-stage-outer').children().unwrap(); // limpia estructura DOM creada por Owl
    }

    // Limpiar el contenido previo
    fakeslider.empty();

    // Clonar y agregar los nuevos elementos
    var elementsincluded = false;
    $('.af_filter.type-6:not(.isminimized) ul.textbox li:not(.no-matches)').each(function() {
        var content = $(this).clone();
        fakeslider.append(content);
        elementsincluded = true;
    });

    if (elementsincluded == false){
        return;
    }
    $('.contentfakefilteritems').show();

    // Volver a inicializar el carrusel
    fakeslider.addClass('owl-carousel');
    generateowlcarousel(fakeslider)
    $('.fakefilteritems .owl-stage-outer').css("height", "initial");

}
/*owl carosusel para amazingfilter end */