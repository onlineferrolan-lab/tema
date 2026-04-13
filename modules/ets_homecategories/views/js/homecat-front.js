/**
 * 2007-2019 ETS-Soft
 *
 * NOTICE OF LICENSE
 *
 * This file is not open source! Each license that you purchased is only available for 1 wesite only.
 * If you want to use this file on more websites (or projects), you need to purchase additional licenses.
 * You are not allowed to redistribute, resell, lease, license, sub-license or offer our resources to any third party.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please contact us for extra customization service at an affordable price
 *
 *  @author ETS-Soft <etssoft.jsc@gmail.com>
 *  @copyright  2007-2019 ETS-Soft
 *  @license    Valid for 1 website (or project) for each purchase of license
 *  International Registered Trademark & Property of ETS-Soft
 */
$(document).on('click','.hc-cat',function(){
   if(!ETS_HOMECAT_OPEN_CAT_BY_LINK || $(this).hasClass('no-link'))
   {
       if(!$(this).hasClass('active'))
       {
           var hctab = $(this).parents('.hc-tab');
           var hccats = hctab.find('.hc-cat');
           var hcsubs = hctab.find('.hc-sub');
           var hcsub = hctab.find('.hc-sub-'+$(this).attr('data-id-category'));
           var id_feature = $(this).attr('data-id-feature');
           var sortbyObj = hctab.find('.homecat_sort_by');
           var sortForm = sortbyObj.parent('form');
           var sortby = sortbyObj.length > 0 ? sortbyObj.val() : false;
           var hcpros = $(this).parents('.hc-tab').find('.products');
           var hcpro = $(this).parents('.hc-tab').find('.hc-products-'+$(this).attr('data-id-category')+(id_feature ? '[data-id-feature="'+id_feature+'"]' : ''));
           var parentcat = !$(this).hasClass('parent-cat') ? hctab.find('.parent-cat[data-id-category="'+$(this).parents('.hc-sub').attr('data-id-parent')+'"]') : 'tab';
           hccats.removeClass('active').removeClass('latest-load').removeClass('parent-active');
           $(this).addClass('active').addClass('latest-load');
           if($(this).attr('data-id-category')==-5 || $(this).attr('data-id-feature')==-5)
                sortForm.addClass('hc-hidden');
           else
               sortForm.removeClass('hc-hidden');
           if($(this).hasClass('parent-cat'))
           {
               hcsubs.removeClass('active');
               hcsub.addClass('active');
           }
           else
               parentcat.addClass('parent-active');
           if(hctab.find('.hc-products-'+$(this).attr('data-id-category')+'[data-id-feature="'+id_feature+'"]').length <=0)
                hcLoadProducts($(this).attr('data-id-category'),$(this).attr('data-id-parent'),id_feature,1,sortby,0,false,'default');
           else
           {
               hcpros.removeClass('active');
               hcpro.addClass('active');
           }
       }
       return false;
   }
});
$(document).on('change','.homecat_sort_by',function(){
    var hctab = $(this).parents('.hc-tab');
    var hccat = hctab.find('.hc-cat.active');
    var hccats = hctab.find('.hc-cat');
    var id_feature = hccat.attr('data-id-feature');
    var hcproductlist =  hctab.find('.hc-products-'+hccat.attr('data-id-category')+'[data-id-feature="'+id_feature+'"]'+' .hc-products-list');
    hccats.removeClass('latest-load');
    hctab.addClass('loading');
    hccat.addClass('latest-load');
    hcLoadProducts(hccat.attr('data-id-category'),hccat.attr('data-id-parent'),id_feature,1,$(this).val(),1,false,'default');
});
$(document).on('click','.hc-more-btn',function(){
    var hctab = $(this).parents('.hc-tab');
    var hccat = hctab.find('.hc-cat.active');
    var id_feature = hccat.attr('data-id-feature');
    $(this).addClass('loading');
    hcLoadProducts(hccat.attr('data-id-category'),hccat.attr('data-id-parent'),id_feature,$(this).attr('data-next-page'),false,0,true,$(this).prev('.hc-products-list').attr('data-rand-seed'));
});
$(document).ready(function(){
    $('.hc-products-0').addClass('active');
    hcCarousel();
});
function hcLoadProducts(id_category,id_parent,id_feature,page,sortby,updatesort,loadmore,randseed)
{
    var hccat = $('.hc-cat[data-id-category="'+id_category+'"]');
    var hctab = $('.hc-tab[data-id-category="'+id_parent+'"]');
    var hcproStr = '.hc-tab[data-id-category="'+id_parent+'"] .hc-products-'+id_category+'[data-id-feature="'+id_feature+'"]'+' .hc-products-list';
    var hcpros = $('.hc-tab[data-id-category="'+id_parent+'"] .products');
    var hcprocontainer = $('.hc-tab[data-id-category="'+id_parent+'"] .hc-products-container');
    var hcmorebtnStr = '.hc-tab[data-id-category="'+id_parent+'"] .hc-products-'+id_category+'[data-id-feature="'+id_feature+'"]'+' .hc-more-btn';
    if(loadmore || !hccat.hasClass('.loading'))
    {
        if(!loadmore)
        {
            hccat.addClass('loading');
            hctab.addClass('loading');
        }
        $.ajax({
            url: homecat_ajax_link,
            type: 'post',
            dataType: 'json',
            data: {
                page: page,
                id_parent: id_parent,
                id_feature: id_feature,
                id_category: id_category,
                sortby: sortby,
                updatesort: updatesort,
                loadmore: loadmore ? 1 : 0,
                randseed: randseed,
            },
            success: function(json)
            {
                if(sortby && updatesort)
                    hcprocontainer.html('');
                if(!json.loadmore)
                {
                    hcprocontainer.append(json.html);
                }
                else
                {
                    if(json.is17)
                        $(hcproStr).append(json.html);
                    else
                    {
                        $('body').append('<div id="hc-temp" style="display: none">'+json.html+'</div>');
                        $(hcproStr+' .hc-product-list').append($('#hc-temp ul.hc-product-list').html());
                        $('#hc-temp').remove();
                    }
                    if($(hcmorebtnStr).length > 0)
                    {
                        if(json.nextPage)
                        {
                            $(hcmorebtnStr).attr('data-next-page',json.nextPage);
                            $(hcmorebtnStr).removeClass('loading');
                        }
                        else
                        {
                            $(hcmorebtnStr).remove();
                            $(hcproStr).append('<div class="alert alert-warning hc-no-more">'+homecat_no_more_found_txt+'</div>');
                        }
                    }
                }

                if(hccat.hasClass('latest-load') && !loadmore)
                {
                    hcpros.removeClass('active');
                    $(hcproStr).parent('.products').addClass('active');
                    hctab.removeClass('loading');
                }
                if(json.is17 && !json.greater1760)
                    hcAlignTags(hcproStr);
                if(!loadmore)
                    hccat.removeClass('loading');
                hcCarousel();
            },
            error: function(){
                if(!loadmore)
                {
                    hccat.removeClass('loading');
                    if(hccat.hasClass('latest-load'))
                    {
                        hctab.removeClass('loading');
                        hcprocontainer.append('<div class="col-sm-12 col-xs-12 products hc-products-'+id_category+'" '+(id_feature ? ' data-id-feature="'+id_feature+'" ' : '')+'><div class="alert alert-danger">No products found!</div></div>');
                        $(hcproStr).addClass('active');
                    }
                }
            },
        });
    }
}
function hcCarousel()
{
    if($('.hc-carousel .hc-products-list.has-products:not(.slick-slider)').length > 0)
        $('.hc-carousel .hc-products-list.has-products:not(.slick-slider)').slick({
            infinite: true,
            slidesToShow: 4,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
}
function hcAlignTags(proStr)
{
    if($(proStr+" .js-product-miniature").length <= 0)
        return;
    $(proStr+" .js-product-miniature").each(function(t, e) {

        if($(this).find(".discount-product").length>0)
            var n = $(this).find(".discount-product");
        else
            var n = $(this).find(".discount-percentage");

            var i = $(this).find(".on-sale");
            var r = $(this).find(".new");
        if(n.length)
        {
            //r.css("top", n.height()+'px');
            if( r.length > 0 && i.length <= 0)
            {
                n.css("top", '-'+($(this).find(".thumbnail-container").height() - $(this).find(".product-description").height() - 10)+'px');
                r.css("top", (n.height() + 30)+'px');
            }
            else if ( r.length > 0 && i.length > 0){
                n.css("top", '-'+($(this).find(".thumbnail-container").height() - $(this).find(".product-description").height() - i.height() - 20)+'px');
                r.css("top", (n.height() + i.height() + 30)+'px');
            }
            else if (r.length <= 0 && i.length > 0){
                n.css("top", '-'+($(this).find(".thumbnail-container").height() - $(this).find(".product-description").height() - i.height() - 20)+'px');
            }
            else {
                n.css("top", '-'+($(this).find(".thumbnail-container").height() - $(this).find(".product-description").height() - 10)+'px');
            }
        } else {
            if ( n.length <= 0 && i.length > 0){
                r.css("top", (i.height() + 20)+'px');
            }
        }
    });
}
