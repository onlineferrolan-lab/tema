/**
 * 2014-2017 IQIT-COMMERCE.COM
 *
 * NOTICE OF LICENSE
 *
 *  @author    IQIT-COMMERCE.COM <support@iqit-commerce.com>
 *  @copyright 2007-2017 IQIT-COMMERCE.COM
 *  @license   GNU General Public License version 2
 *
 * You can not resell or redistribute this software.
 *
 */

// classie - class helper functions, from bonzo https://github.com/ded/bonzo

!function(a){"use strict";function b(a){return new RegExp("(^|\\s+)"+a+"(\\s+|$)")}function f(a,b){var f=c(a,b)?e:d;f(a,b)}var c,d,e;"classList"in document.documentElement?(c=function(a,b){return a.classList.contains(b)},d=function(a,b){a.classList.add(b)},e=function(a,b){a.classList.remove(b)}):(c=function(a,c){return b(c).test(a.className)},d=function(a,b){c(a,b)||(a.className=a.className+" "+b)},e=function(a,c){a.className=a.className.replace(b(c)," ")});var g={hasClass:c,addClass:d,removeClass:e,toggleClass:f,has:c,add:d,remove:e,toggle:f};"function"==typeof define&&define.amd?define(g):a.classie=g}(window);

//hover intent
(function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:6,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn)}else{if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector})}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut})}}var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.sqrt((pX-cX)*(pX-cX)+(pY-cY)*(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=true;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=false;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(!ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}})(jQuery);

//double tap
;(function(e,t,n,r){e.fn.doubleTapToGo=function(r){if(!("ontouchstart"in t)&&!navigator.msMaxTouchPoints&&!navigator.userAgent.toLowerCase().match(/windows phone os 7/i))return false;this.each(function(){var t=false;e(this).on("click",function(n){var r=e(this);if(r[0]!=t[0]){n.preventDefault();t=r}});e(n).on("click touchstart MSPointerDown",function(n){var r=true,i=e(n.target).parents();for(var s=0;s<i.length;s++)if(i[s]==t[0])r=false;if(r)t=false})});return this}})(jQuery,window,document);

var cbpHorizontalMenu, cbpVerticalmenu;

//mod ecomm
if (iqitmegamenu.show_mobile_menu_in_desktop == 1){
  //addmenumobileindesktop();
}
function addmenumobileindesktop(){
  var html = '<div id="show_mobile_menu_in_desktop"></div>'
  //append to desktop
  $('#_desktop_logo').prepend(html);

  setTimeout(function() {
    $('body').addClass('loadicon');
  }, 500);
}
$(document).on('click', '#show_mobile_menu_in_desktop', function(event) {
  $('#iqitmegamenu-shower').click();
});
$(document).on('click', '.closetxt_content', function(event) {
  $('#iqitmegamenu-shower').click();
});
/*end ecomm*/


$(document).ready(function(){

  cbpHorizontalMenu = (function() {

    var menuId = '#cbp-hrmenu',
        $listItems = $( menuId + '> ul > li'  ),
        $menuItems = $listItems.children( 'a, .cbp-main-link' ),
        $innerTabs = $( menuId + ' .cbp-hrsub-tabs-names li > a'  ),
        $body = $( 'body' ),
        current = -1;
    currentlevel = -1;

    $listItems.has('ul').find(' > a').doubleTapToGo();

    function init() {
      var isTouchDevice = 'ontouchstart' in document.documentElement;
      if( isTouchDevice ) {
        $menuItems.on( 'mouseover', open );
      }
      else{
        $menuItems.hoverIntent( {
          over: open,
          out: dnthing,
          interval: 30
        } );
      }

      $listItems.on( 'mouseover', function( event ) { event.stopPropagation(); } );

      $innerTabs.hover( function(){
        $innerTabs.removeClass('active');
        $(this).tab('show');
      });
    }

    var setCurrent = function(strName) {
      current = strName;
    };

    function dnthing( event ) {

    }

    function open( event ) {


      $othemenuitem = $('#cbp-hrmenu1').find('.cbp-hropen');


      $othemenuitem.find('.cbp-hrsub').removeClass('cbp-show');
      $othemenuitem.removeClass( 'cbp-hropen' );

      cbpVerticalmenu.setCurrent(-1);

      var $item = $( event.currentTarget ).parent( 'li' ),
          idx = $item.index();


      $submenu = $item.find('.cbp-hrsub');

      /*mod ecom*/
      if($item.hasClass('cbp-has-submeu')) {
        $('.bg-back').remove()
        $('section#wrapper').append('<div class="bg-back"></div>')
      }
      /*fin mod ecomm*/

      if(current == idx )
        return;

      $submenu.removeClass('cbp-notfit');
      $submenu.removeClass('cbp-show');

      if( current !== -1 ) {
        $listItems.eq( current ).removeClass( 'cbp-hropen' );
      }

      if( current === idx ) {
        $item.removeClass( 'cbp-hropen' );
        current = -1;

      }
      else {
        $submenu.addClass( 'cbp-show' );
        iqitmenuwidth = $(menuId).width();
        iqititemposition = $item.position().left;

        triangleoffset = iqitmenuwidth-$submenu.width();

        if((iqitmenuwidth-iqititemposition)<$submenu.width())
        {
          $submenu.addClass( 'cbp-notfit' );
          $submenu.find('.cbp-triangle-container').css({left: (iqititemposition-12+$item.width()/2)-triangleoffset });
        }
        else
          $submenu.find('.cbp-triangle-container').css({left: (-12+$item.width()/2) });



        $item.addClass( 'cbp-hropen' );
        current = idx;
        $body.off( 'mouseover' ).on( 'mouseover', close );
      }



      return false;

    }

    function close( event ) {
      /*mod ecom*/
      $('.bg-back').remove()
      /*fin mod ecomm*/

      $listItems.eq( current ).removeClass( 'cbp-hropen' );
      current = -1;
    }

    return { init : init,
      setCurrent: setCurrent
    };

  })();

  cbpHorizontalMenu.init();

  if (iqitmegamenu.sticky) {
    var s = $("#iqitmegamenu-horizontal");
    var pos = s.offset();
    var alreadySticky = false;

    $(window).scroll(function() {
      var windowpos = $(window).scrollTop();
      if ( s.length  ){
        if(!alreadySticky) {
          if (windowpos >= pos.top) {
            alreadySticky = true;
            s.parent().height(s.height());
            s.removeClass("cbp-nosticky");
            s.addClass("cbp-sticky");
          }
        }
        if(alreadySticky) {
          if (windowpos < pos.top) {
            alreadySticky = false;
            s.removeClass("cbp-sticky");
            s.addClass("cbp-nosticky");
            s.parent().removeAttr("style");
          }}
      }
    });
  }

});

$(document).ready(function(){

  /*vertical menu*/
  $(document).on('click', '.cbp-vertical-title ', function(){
      $('.cbp-vertical-on-top').addClass('cbp-vert-expanded');
  });
  $('.cbp-hrmenu.cbp-vertical .cbp-hrmenu-close, .cbp-hrmenu-background').on('click', function (event) {
      $('.cbp-vertical-on-top').removeClass('cbp-vert-expanded');
      $('.cbp-hrmenu-tab').removeClass('cbp-hropen');
  });
  $(document).on('click', '.cbp-vertical-on-top .cbp-submenu-aindicator', function(){
      $('.cbp-hrmenu-tab').removeClass('cbp-hropen');
      $(this).closest('.cbp-hrmenu-tab').addClass('cbp-hropen');
  });
  $(document).on('click', '.cbp-triangle-left-back', function(){
      $('.cbp-hrmenu-tab').removeClass('cbp-hropen');
    //  $(this).closest('.cbp-hrmenu-tab').addClass('cbp-hropen');
  });



  $(".cbp-vertical-on-top .cbp-menu-column-inner > p").on("click", function () {
      if($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next().slideUp();
      } else {
        $(this).addClass('active');
        $(this).next().slideDown();
      }
  });

  /*end vertical menu*/
  //
  // $('.cbp-vertical-on-top').on( 'mouseover', function() {
  //   $(this).addClass('cbp-vert-expanded');
  // });
  //
  // $('.cbp-vertical-on-top').on( 'mouseleave', function() {
  //   $(this).removeClass('cbp-vert-expanded');
  // });



  cbpVerticalmenu = (function(test) {

    var menuId = '#cbp-hrmenu1',
        $listItems = $( menuId + '> ul > li'  ),
        $menuItems = $listItems.children( 'a' ),
        $innerTabs = $( menuId + ' .cbp-hrsub-tabs-names li > a'  ),
        $body = $( 'body' ),
        current = -1,
        currentlevel = -1;

    $listItems.has('ul').find(' > a').doubleTapToGo();



    function init() {

      var isTouchDevice = 'ontouchstart' in document.documentElement;
      if( isTouchDevice ) {
        $menuItems.on( 'mouseover', open );
      }
      else{
        $menuItems.hoverIntent( {
          over: open,
          out: dnthing,
          interval: 30
        } );
      }



      $listItems.on( 'mouseover', function( event ) { event.stopPropagation(); } );

      $innerTabs.hover( function(){
        console.log('aas');
        $innerTabs.removeClass('active');
        $(this).tab('show');
      });

      $( window ).resize(function() {
        $('cbp-hrmenu-tab').not('.cbp-hropen').find( '.cbp-hrsub-wrapper' ).removeAttr( 'style' );
      });
    }

    function dnthing( event ) {

    }

    var setCurrent = function(strName) {
      current = strName;
    };

    function open( event ) {


      $othemenuitem = $('#cbp-hrmenu').find('.cbp-hropen');

      $othemenuitem.find('.cbp-hrsub').removeClass('cbp-show');
      closeElement($othemenuitem);

      cbpHorizontalMenu.setCurrent(-1);

      var $item = $( event.currentTarget ).parent( 'li' ),
          idx = $item.index();

      if(current == idx )
        return;

      $submenu = $item.find('.cbp-hrsub');
      $submenu.removeClass('cbp-show');

      if( current !== -1 ) {
        closeElement($listItems.eq( current ));
      }

      if( current === idx ) {
        closeElement($item);
        current = -1;

      }
      else {
        $submenu.parent().width($(iqitmegamenu.containerSelector).width()-$(menuId).width());
        callerHeight = $item.height();
        $submenu.parent().css( { marginLeft : $item.innerWidth()+"px", marginRight : $item.innerWidth()+"px", marginTop : -callerHeight+"px" } );
        $submenu.find('.cbp-triangle-container').css({top: (callerHeight-24)/2});
        $submenu.addClass( 'cbp-show' );
        $item.addClass( 'cbp-hropen' );
        current = idx;
        $body.off( 'mouseover' ).on( 'mouseover', close );
      }



      return false;

    }

    function close( event ) {
      closeElement($listItems.eq( current ));
      current = -1;
    }

    function closeElement( $element ) {
      $element.removeClass( 'cbp-hropen' );
    }

    return { init : init,
      setCurrent: setCurrent
    };

  })();

  cbpVerticalmenu.init();

});


$(document).ready(function() {
  languageinmenu();
  var cbpPush = (function() {
        $('body').prepend($('#iqitmegamenu-mobile-content'));
        $(".responsiveInykator").on("click", function() {
          $(this).parent().children('ul').toggleClass('cbpm-ul-showed')
        });
        $("#iqitmegamenu-accordion .goparent").on("click", function() {
          $(this).parent().toggleClass('cbpm-ul-showed')
        });
        var menuLeft = document.getElementById('iqitmegamenu-accordion')
            , showLeftPush = document.getElementById('iqitmegamenu-shower')
            , menuoverlay = document.getElementById('cbp-spmenu-overlay')
            , body = document.body;
        classie.addClass(body, 'cbp-spmenu-body');
        $('#iqitmegamenu-shower').on("touchstart click", function(e) {
            //miramso si no esta activado el modo pccomponentes y la resolucion es menor de 992
            if($('.cbp-vertical').length && $(window).width() < 992){
                $('.cbp-vertical-on-top').addClass('cbp-vert-expanded');
            }
            else {
              e.stopPropagation();
              e.preventDefault();
              classie.toggle(showLeftPush, 'active');
              classie.toggle(body, 'cbp-spmenu-push-toright');
              classie.toggle(menuLeft, 'cbp-spmenu-open');
              classie.toggle(menuoverlay, 'cbp-spmenu-overlay-show')
            }

        });
        $('#cbp-spmenu-overlay').on("touchstart click", function(e) {
          e.stopPropagation();
          e.preventDefault();
          classie.toggle(this, 'active');
          classie.toggle(body, 'cbp-spmenu-push-toright');
          classie.toggle(menuLeft, 'cbp-spmenu-open');
          classie.toggle(this, 'cbp-spmenu-overlay-show')
        })
      }
  );
  cbpPush()
});

function languageinmenu(){
  //isset div _desktop_language_selector
    if($('#_desktop_language_selector').length > 0) {
        var html = $('#_desktop_language_selector .dropdown-menu').html();
        $('#language_menu_content').prepend('<ul>' + html + '</ul>');
        $('#language_menu_content li').each(function () {
            var isocode = $(this).find('a').attr('data-iso-code');
            $(this).find('a').html(isocode)
        });
    }
}