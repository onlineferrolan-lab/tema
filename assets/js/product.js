/*tabs en mobile*/
$('.nav-tabs li').each(function() {
    var id = $(this).find('.content_mobile').attr('rel');
    var html = $('.tab-content #' + id).html();
    $(this).find('.content_mobile').html(html);
});
$(document).on('click', '#_mobile_tabs .tabs .nav-tabs .nav-link', function(){
    $(this).addClass('loading');
    $('#_mobile_tabs .tabs .nav-tabs .nav-link:not(.loading)').removeClass('actived').next().slideUp();
    $(this).toggleClass('actived').next().slideToggle();
    $(this).removeClass('loading');
});



/*tabs en mobile end*/
