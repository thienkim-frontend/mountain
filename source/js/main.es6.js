/*-----------------------------------------
 TABLE OF CONTENT
 1. backToTop
 2. fullWidthCarousel
 3. dataAttrSettingCarousel
 4. groupItemCarousel
 5. lazyloadProduct
 6. countDown
 7. initDropdown for mobile version
 8. smoothScroll
------------------------------------------*/
/*-----------------------------------------
 PLUGIN
 1. jQuery v2.2.5-pre
 2. Bootstrap v4.0.0-beta.2 (https://getbootstrap.com)
 3. Countdown for jQuery v2.1.0 (http://keith-wood.name/countdown.html)
 4. Owl Carousel v2.2.1
 5. popper.js - dependency for Bootstrap v4
 masonry (https://masonry.desandro.com/layout.html)
	
------------------------------------------*/
import myTheme from "./modules.es6.js";
!function($) {
    "use strict";

    /*-----------------------------------------
    2. fullWidthCarousel
    ------------------------------------------*/
    function fullWidthCarousel(el){
        let $captionEl = $('li .caption-wrapper', el),
            $progressbarEl = $(".slider-progressbar");
      $(el)
        // Notice that initialize.owl.carousel and initialized.owl.carousel events must be attached before Owl Carousel initialization
        .on('initialized.owl.carousel', function () {
            $progressbarEl.css("width", "100%");
            makeAnimation();
        })
        .owlCarousel({
            items:1,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
            navSpeed: 1000,
            // dots: false,
        })
        .on('translate.owl.carousel', function (event) {
            $('.caption-wrapper [data-animation]').each(function () {
                var $this = $(this);
                $this.removeClass(" animated "+ $this.data('animation')).removeAttr('style') ;   
            });
        })
        .on('translated.owl.carousel', function (event) {
            makeAnimation();
        });

        function makeAnimation(){
            var elems= $(".owl-item.active").find('.caption-wrapper [data-animation]');
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation'),
                    $animationDelay= $this.data('delay');
                $this.addClass(" animated "+ $animationType).css({"animation-delay":$animationDelay}) ;   
            });
        }
    }

    /*-----------------------------------------
    2. fullWidthCarousel
    ------------------------------------------*/
    function attrSettingCarousel(){
        $('.owl-carousel[data-carousel]').each(function(){
            let $this = $(this),
                options = $this.data("carousel"),
                defaults = {
                    responsive : {
                        0: {items: 1},
                        767: {items: 2},
                        992: {items: 4}
                    },
                    dots: false,
                    nav: true,
                    navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
                    margin: 30,
                    loop: false,
                    rewind: false,
                    lazyLoad: true
                },
                settings = $.extend( {}, defaults, options );
                console.log(settings.responsive[992]);
            $this.owlCarousel(settings);
        });
    }

    /*-----------------------------------------
    2. fullWidthCarousel
    ------------------------------------------*/
    function initMasony(el){
        if($().masonry){
            var $grid = $(el).masonry({
                columnWidth: '.grid-sizer',
                itemSelector: '.gallery-item',
                // gutter: '.grid-gutter',
                // horizontalOrder: true,
                percentPosition: true
            });
            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }
 
    
    $(document).ready( ()=>{
        "use strict";
        let windowWidth = $(window).width(),
            windowHeight = $(window).height();

        if(windowWidth < 576){
        }else{
            $('body').scrollspy({ 
                target: '#navbarToggler', // direct parent element of the ul and not the ul
                offset: 100 
            });
            $('.header-section').midnight();
            myTheme.smoothScroll('a[data-smooth-scroll], .main-nav a');
            myTheme.backToTop();
            
        }
        
        initMasony('.gallery-masonry');
        fullWidthCarousel(".hero-section .owl-carousel");
        attrSettingCarousel();
    });

    $(window)
        .on( 'resize', ()=>{})
        .on( 'load', ()=>{
            myTheme.handlePreloader();
        })
        .on( 'scroll', ()=>{
        }); 
}(jQuery);





