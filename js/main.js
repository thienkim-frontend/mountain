(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _modulesEs = require("./modules.es6.js");

var _modulesEs2 = _interopRequireDefault(_modulesEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

!function ($) {
    "use strict";

    /*-----------------------------------------
    2. fullWidthCarousel
    ------------------------------------------*/

    function fullWidthCarousel(el) {
        var $captionEl = $('li .caption-wrapper', el),
            $progressbarEl = $(".slider-progressbar");
        $(el)
        // Notice that initialize.owl.carousel and initialized.owl.carousel events must be attached before Owl Carousel initialization
        .on('initialized.owl.carousel', function () {
            $progressbarEl.css("width", "100%");
            makeAnimation();
        }).owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
            navSpeed: 1000
            // dots: false,
        }).on('translate.owl.carousel', function (event) {
            $('.caption-wrapper [data-animation]').each(function () {
                var $this = $(this);
                $this.removeClass(" animated " + $this.data('animation')).removeAttr('style');
            });
        }).on('translated.owl.carousel', function (event) {
            makeAnimation();
        });

        function makeAnimation() {
            var elems = $(".owl-item.active").find('.caption-wrapper [data-animation]');
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation'),
                    $animationDelay = $this.data('delay');
                $this.addClass(" animated " + $animationType).css({ "animation-delay": $animationDelay });
            });
        }
    }

    /*-----------------------------------------
    2. fullWidthCarousel
    ------------------------------------------*/
    function attrSettingCarousel() {
        $('.owl-carousel[data-carousel]').each(function () {
            var $this = $(this),
                options = $this.data("carousel"),
                defaults = {
                responsive: {
                    0: { items: 1 },
                    767: { items: 2 },
                    992: { items: 4 }
                },
                dots: false,
                nav: true,
                navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
                margin: 30,
                loop: false,
                rewind: false,
                lazyLoad: true
            },
                settings = $.extend({}, defaults, options);
            console.log(settings.responsive[992]);
            $this.owlCarousel(settings);
        });
    }

    /*-----------------------------------------
    2. fullWidthCarousel
    ------------------------------------------*/
    function initMasony(el) {
        if ($().masonry) {
            var $grid = $(el).masonry({
                columnWidth: '.grid-sizer',
                itemSelector: '.gallery-item',
                // gutter: '.grid-gutter',
                // horizontalOrder: true,
                percentPosition: true
            });
            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
        }
    }

    $(document).ready(function () {
        "use strict";

        var windowWidth = $(window).width(),
            windowHeight = $(window).height();

        if (windowWidth < 576) {} else {
            $('body').scrollspy({
                target: '#navbarToggler', // direct parent element of the ul and not the ul
                offset: 100
            });
            $('.header-section').midnight();
            _modulesEs2.default.smoothScroll('a[data-smooth-scroll], .main-nav a');
            _modulesEs2.default.backToTop();
        }

        initMasony('.gallery-masonry');
        fullWidthCarousel(".hero-section .owl-carousel");
        attrSettingCarousel();
    });

    $(window).on('resize', function () {}).on('load', function () {
        _modulesEs2.default.handlePreloader();
    }).on('scroll', function () {});
}(jQuery); /*-----------------------------------------
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

},{"./modules.es6.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var myTheme = {};

myTheme.handlePreloader = function () {
    if ($("#loading-wrapper").length) {
        $("#loading-wrapper").delay(200).fadeOut(500);
    }
};
/*-----------------------------------------
1. backToTop
------------------------------------------*/
myTheme.backToTop = function () {
    var offset = 800,
        $back_to_top = $('#back-top > a');

    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $back_to_top.fadeIn();
        } else {
            $back_to_top.fadeOut();
        }
    });

    $back_to_top.on('click', function (event) {
        console.log("d");
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 1000, "swing");
    });
};
/*-----------------------------------------
8. smoothScroll
------------------------------------------*/
myTheme.smoothScroll = function (el) {
    $(el).on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash;
        var marginTarget = parseInt($(target).css("margin-top"), 10);;
        var posTop = $(target).offset().top;
        $('html, body').stop().animate({
            'scrollTop': posTop - 90 - marginTarget
        }, 500, 'swing');
    });
};
/*-----------------------------------------
9. navAnimation for desktop & ipad
------------------------------------------*/
myTheme.navAnimation = function (el) {
    var $el = $(el),
        trigger = $el.find('.side-menu-btn'),
        menuItems = $el.find('.nav-mainHeader').find('li');

    if ($el.length) {
        menuItems.each(function () {
            var $this = $(this);
            $this.css({
                '-webkit-transition-delay': $this.index() / 15 + 's',
                '-moz-transition-delay': $this.index() / 15 + 's',
                'transition-delay': $this.index() / 15 + 's'
            });
        });
        trigger.on('click', function (event) {
            event.preventDefault();
            $('body').toggleClass('menu-activated');
        });
    };
};
exports.default = myTheme;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2UvanMvbWFpbi5lczYuanMiLCJzb3VyY2UvanMvbW9kdWxlcy5lczYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ3FCQTs7Ozs7O0FBQ0EsQ0FBQyxVQUFTLENBQVQsRUFBWTtBQUNUOztBQUVBOzs7O0FBR0EsYUFBUyxpQkFBVCxDQUEyQixFQUEzQixFQUE4QjtBQUMxQixZQUFJLGFBQWEsRUFBRSxxQkFBRixFQUF5QixFQUF6QixDQUFqQjtBQUFBLFlBQ0ksaUJBQWlCLEVBQUUscUJBQUYsQ0FEckI7QUFFRixVQUFFLEVBQUY7QUFDRTtBQURGLFNBRUcsRUFGSCxDQUVNLDBCQUZOLEVBRWtDLFlBQVk7QUFDeEMsMkJBQWUsR0FBZixDQUFtQixPQUFuQixFQUE0QixNQUE1QjtBQUNBO0FBQ0gsU0FMSCxFQU1HLFdBTkgsQ0FNZTtBQUNULG1CQUFNLENBREc7QUFFVCxpQkFBSyxJQUZJO0FBR1QscUJBQVMsQ0FBQyx1Q0FBRCxFQUEwQyx3Q0FBMUMsQ0FIQTtBQUlULHNCQUFVO0FBQ1Y7QUFMUyxTQU5mLEVBYUcsRUFiSCxDQWFNLHdCQWJOLEVBYWdDLFVBQVUsS0FBVixFQUFpQjtBQUMzQyxjQUFFLG1DQUFGLEVBQXVDLElBQXZDLENBQTRDLFlBQVk7QUFDcEQsb0JBQUksUUFBUSxFQUFFLElBQUYsQ0FBWjtBQUNBLHNCQUFNLFdBQU4sQ0FBa0IsZUFBYyxNQUFNLElBQU4sQ0FBVyxXQUFYLENBQWhDLEVBQXlELFVBQXpELENBQW9FLE9BQXBFO0FBQ0gsYUFIRDtBQUlILFNBbEJILEVBbUJHLEVBbkJILENBbUJNLHlCQW5CTixFQW1CaUMsVUFBVSxLQUFWLEVBQWlCO0FBQzVDO0FBQ0gsU0FyQkg7O0FBdUJFLGlCQUFTLGFBQVQsR0FBd0I7QUFDcEIsZ0JBQUksUUFBTyxFQUFFLGtCQUFGLEVBQXNCLElBQXRCLENBQTJCLG1DQUEzQixDQUFYO0FBQ0Es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OztBQUdBLFFBQVEsWUFBUixHQUF1QixVQUFDLEVBQUQsRUFBTTtBQUN6QixRQUFJLE1BQU0sRUFBRSxFQUFGLENBQVY7QUFBQSxRQUNJLFVBQVUsSUFBSSxJQUFKLENBQVMsZ0JBQVQsQ0FEZDtBQUFBLFFBRUksWUFBWSxJQUFJLElBQUosQ0FBUyxpQkFBVCxFQUE0QixJQUE1QixDQUFpQyxJQUFqQyxDQUZoQjs7QUFJQSxRQUFJLElBQUksTUFBUixFQUFnQjtBQUNaLGtCQUFVLElBQVYsQ0FBZSxZQUFXO0FBQ3RCLGdCQUFJLFFBQVEsRUFBRSxJQUFGLENBQVo7QUFDQSxrQkFBTSxHQUFOLENBQVU7QUFDTiw0Q0FBNEIsTUFBTSxLQUFOLEtBQWdCLEVBQWhCLEdBQXFCLEdBRDNDO0FBRU4seUNBQXlCLE1BQU0sS0FBTixLQUFnQixFQUFoQixHQUFxQixHQUZ4QztBQUdOLG9DQUFvQixNQUFNLEtBQU4sS0FBZ0IsRUFBaEIsR0FBcUI7QUFIbkMsYUFBVjtBQUtILFNBUEQ7QUFRQSxnQkFBUSxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFDLEtBQUQsRUFBVTtBQUMxQixrQkFBTSxjQUFOO0FBQ0EsY0FBRSxNQUFGLEVBQVUsV0FBVixDQUFzQixnQkFBdEI7QUFDSCxTQUhEO0FBSUg7QUFDSixDQW5CRDtrQkFvQmUsTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gVEFCTEUgT0YgQ09OVEVOVFxyXG4gMS4gYmFja1RvVG9wXHJcbiAyLiBmdWxsV2lkdGhDYXJvdXNlbFxyXG4gMy4gZGF0YUF0dHJTZXR0aW5nQ2Fyb3VzZWxcclxuIDQuIGdyb3VwSXRlbUNhcm91c2VsXHJcbiA1LiBsYXp5bG9hZFByb2R1Y3RcclxuIDYuIGNvdW50RG93blxyXG4gNy4gaW5pdERyb3Bkb3duIGZvciBtb2JpbGUgdmVyc2lvblxyXG4gOC4gc21vb3RoU2Nyb2xsXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuIFBMVUdJTlxyXG4gMS4galF1ZXJ5IHYyLjIuNS1wcmVcclxuIDIuIEJvb3RzdHJhcCB2NC4wLjAtYmV0YS4yIChodHRwczovL2dldGJvb3RzdHJhcC5jb20pXHJcbiAzLiBDb3VudGRvd24gZm9yIGpRdWVyeSB2Mi4xLjAgKGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvY291bnRkb3duLmh0bWwpXHJcbiA0LiBPd2wgQ2Fyb3VzZWwgdjIuMi4xXHJcbiA1LiBwb3BwZXIuanMgLSBkZXBlbmRlbmN5IGZvciBCb290c3RyYXAgdjRcclxuIG1hc29ucnkgKGh0dHBzOi8vbWFzb25yeS5kZXNhbmRyby5jb20vbGF5b3V0Lmh0bWwpXHJcblx0XHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmltcG9ydCBteVRoZW1lIGZyb20gXCIuL21vZHVsZXMuZXM2LmpzXCI7XHJcbiFmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAyLiBmdWxsV2lkdGhDYXJvdXNlbFxyXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIGZ1bmN0aW9uIGZ1bGxXaWR0aENhcm91c2VsKGVsKXtcclxuICAgICAgICBsZXQgJGNhcHRpb25FbCA9ICQoJ2xpIC5jYXB0aW9uLXdyYXBwZXInLCBlbCksXHJcbiAgICAgICAgICAgICRwcm9ncmVzc2JhckVsID0gJChcIi5zbGlkZXItcHJvZ3Jlc3NiYXJcIik7XHJcbiAgICAgICQoZWwpXHJcbiAgICAgICAgLy8gTm90aWNlIHRoYXQgaW5pdGlhbGl6ZS5vd2wuY2Fyb3VzZWwgYW5kIGluaXRpYWxpemVkLm93bC5jYXJvdXNlbCBldmVudHMgbXVzdCBiZSBhdHRhY2hlZCBiZWZvcmUgT3dsIENhcm91c2VsIGluaXRpYWxpemF0aW9uXHJcbiAgICAgICAgLm9uKCdpbml0aWFsaXplZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRwcm9ncmVzc2JhckVsLmNzcyhcIndpZHRoXCIsIFwiMTAwJVwiKTtcclxuICAgICAgICAgICAgbWFrZUFuaW1hdGlvbigpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgaXRlbXM6MSxcclxuICAgICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZUZXh0OiBbJzxpIGNsYXNzPVwiZmEgZmEtbG9uZy1hcnJvdy1sZWZ0XCI+PC9pPicsICc8aSBjbGFzcz1cImZhIGZhLWxvbmctYXJyb3ctcmlnaHRcIj48L2k+J10sXHJcbiAgICAgICAgICAgIG5hdlNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAvLyBkb3RzOiBmYWxzZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbigndHJhbnNsYXRlLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAkKCcuY2FwdGlvbi13cmFwcGVyIFtkYXRhLWFuaW1hdGlvbl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcyhcIiBhbmltYXRlZCBcIisgJHRoaXMuZGF0YSgnYW5pbWF0aW9uJykpLnJlbW92ZUF0dHIoJ3N0eWxlJykgOyAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbigndHJhbnNsYXRlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgbWFrZUFuaW1hdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYWtlQW5pbWF0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBlbGVtcz0gJChcIi5vd2wtaXRlbS5hY3RpdmVcIikuZmluZCgnLmNhcHRpb24td3JhcHBlciBbZGF0YS1hbmltYXRpb25dJyk7XHJcbiAgICAgICAgICAgIGVsZW1zLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICAkYW5pbWF0aW9uVHlwZSA9ICR0aGlzLmRhdGEoJ2FuaW1hdGlvbicpLFxyXG4gICAgICAgICAgICAgICAgICAgICRhbmltYXRpb25EZWxheT0gJHRoaXMuZGF0YSgnZGVsYXknKTtcclxuICAgICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKFwiIGFuaW1hdGVkIFwiKyAkYW5pbWF0aW9uVHlwZSkuY3NzKHtcImFuaW1hdGlvbi1kZWxheVwiOiRhbmltYXRpb25EZWxheX0pIDsgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIDIuIGZ1bGxXaWR0aENhcm91c2VsXHJcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgZnVuY3Rpb24gYXR0clNldHRpbmdDYXJvdXNlbCgpe1xyXG4gICAgICAgICQoJy5vd2wtY2Fyb3VzZWxbZGF0YS1jYXJvdXNlbF0nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gJHRoaXMuZGF0YShcImNhcm91c2VsXCIpLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMDoge2l0ZW1zOiAxfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNzY3OiB7aXRlbXM6IDJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA5OTI6IHtpdGVtczogNH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYXZUZXh0OiBbJzxpIGNsYXNzPVwiZmEgZmEtbG9uZy1hcnJvdy1sZWZ0XCI+PC9pPicsICc8aSBjbGFzcz1cImZhIGZhLWxvbmctYXJyb3ctcmlnaHRcIj48L2k+J10sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAzMCxcclxuICAgICAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICByZXdpbmQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhenlMb2FkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZXR0aW5ncy5yZXNwb25zaXZlWzk5Ml0pO1xyXG4gICAgICAgICAgICAkdGhpcy5vd2xDYXJvdXNlbChzZXR0aW5ncyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgMi4gZnVsbFdpZHRoQ2Fyb3VzZWxcclxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbiAgICBmdW5jdGlvbiBpbml0TWFzb255KGVsKXtcclxuICAgICAgICBpZigkKCkubWFzb25yeSl7XHJcbiAgICAgICAgICAgIHZhciAkZ3JpZCA9ICQoZWwpLm1hc29ucnkoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6ICcuZ3JpZC1zaXplcicsXHJcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcuZ2FsbGVyeS1pdGVtJyxcclxuICAgICAgICAgICAgICAgIC8vIGd1dHRlcjogJy5ncmlkLWd1dHRlcicsXHJcbiAgICAgICAgICAgICAgICAvLyBob3Jpem9udGFsT3JkZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBwZXJjZW50UG9zaXRpb246IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRncmlkLmltYWdlc0xvYWRlZCgpLnByb2dyZXNzKCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRncmlkLm1hc29ucnkoJ2xheW91dCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiBcclxuICAgIFxyXG4gICAgJChkb2N1bWVudCkucmVhZHkoICgpPT57XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCksXHJcbiAgICAgICAgICAgIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgaWYod2luZG93V2lkdGggPCA1NzYpe1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKCdib2R5Jykuc2Nyb2xsc3B5KHsgXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICcjbmF2YmFyVG9nZ2xlcicsIC8vIGRpcmVjdCBwYXJlbnQgZWxlbWVudCBvZiB0aGUgdWwgYW5kIG5vdCB0aGUgdWxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMTAwIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCgnLmhlYWRlci1zZWN0aW9uJykubWlkbmlnaHQoKTtcclxuICAgICAgICAgICAgbXlUaGVtZS5zbW9vdGhTY3JvbGwoJ2FbZGF0YS1zbW9vdGgtc2Nyb2xsXSwgLm1haW4tbmF2IGEnKTtcclxuICAgICAgICAgICAgbXlUaGVtZS5iYWNrVG9Ub3AoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGluaXRNYXNvbnkoJy5nYWxsZXJ5LW1hc29ucnknKTtcclxuICAgICAgICBmdWxsV2lkdGhDYXJvdXNlbChcIi5oZXJvLXNlY3Rpb24gLm93bC1jYXJvdXNlbFwiKTtcclxuICAgICAgICBhdHRyU2V0dGluZ0Nhcm91c2VsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdylcclxuICAgICAgICAub24oICdyZXNpemUnLCAoKT0+e30pXHJcbiAgICAgICAgLm9uKCAnbG9hZCcsICgpPT57XHJcbiAgICAgICAgICAgIG15VGhlbWUuaGFuZGxlUHJlbG9hZGVyKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oICdzY3JvbGwnLCAoKT0+e1xyXG4gICAgICAgIH0pOyBcclxufShqUXVlcnkpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImxldCBteVRoZW1lID0ge307XHJcblxyXG5teVRoZW1lLmhhbmRsZVByZWxvYWRlciA9ICgpPT57XHJcbiAgICBpZigkKFwiI2xvYWRpbmctd3JhcHBlclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICQoXCIjbG9hZGluZy13cmFwcGVyXCIpLmRlbGF5KDIwMCkuZmFkZU91dCg1MDApO1xyXG4gICAgfVxyXG59XHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuMS4gYmFja1RvVG9wXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbm15VGhlbWUuYmFja1RvVG9wID0gKCk9PiB7XHJcbiAgICBsZXQgb2Zmc2V0ID0gODAwLFxyXG4gICAgICAgICRiYWNrX3RvX3RvcCA9ICQoJyNiYWNrLXRvcCA+IGEnKTtcclxuICAgIFxyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCAkKHRoaXMpLnNjcm9sbFRvcCgpID4gb2Zmc2V0ICkgeyBcclxuICAgICAgICAgICAgJGJhY2tfdG9fdG9wLmZhZGVJbigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkYmFja190b190b3AuZmFkZU91dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkYmFja190b190b3Aub24oJ2NsaWNrJywgKGV2ZW50KT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZFwiKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe3Njcm9sbFRvcCA6IDB9LCAxMDAwICwgXCJzd2luZ1wiKTtcclxuICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuOC4gc21vb3RoU2Nyb2xsXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbm15VGhlbWUuc21vb3RoU2Nyb2xsID0gKGVsKT0+e1xyXG4gICAgJChlbCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKFwic2Nyb2xsXCIpO1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLmhhc2g7XHJcbiAgICAgICAgdmFyIG1hcmdpblRhcmdldCA9IHBhcnNlSW50KCQodGFyZ2V0KS5jc3MoXCJtYXJnaW4tdG9wXCIpLCAxMCk7O1xyXG4gICAgICAgIHZhciBwb3NUb3AgPSAkKHRhcmdldCkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICdzY3JvbGxUb3AnOiAoIHBvc1RvcCAtIDkwIC0gbWFyZ2luVGFyZ2V0KVxyXG4gICAgICAgIH0sIDUwMCwgJ3N3aW5nJyk7XHJcbiAgICB9KTtcclxufVxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbjkuIG5hdkFuaW1hdGlvbiBmb3IgZGVza3RvcCAmIGlwYWRcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxubXlUaGVtZS5uYXZBbmltYXRpb24gPSAoZWwpPT57XHJcbiAgICBsZXQgJGVsID0gJChlbCksXHJcbiAgICAgICAgdHJpZ2dlciA9ICRlbC5maW5kKCcuc2lkZS1tZW51LWJ0bicpLFxyXG4gICAgICAgIG1lbnVJdGVtcyA9ICRlbC5maW5kKCcubmF2LW1haW5IZWFkZXInKS5maW5kKCdsaScpO1xyXG5cclxuICAgIGlmICgkZWwubGVuZ3RoKSB7XHJcbiAgICAgICAgbWVudUl0ZW1zLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICR0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5JzogJHRoaXMuaW5kZXgoKSAvIDE1ICsgJ3MnLFxyXG4gICAgICAgICAgICAgICAgJy1tb3otdHJhbnNpdGlvbi1kZWxheSc6ICR0aGlzLmluZGV4KCkgLyAxNSArICdzJyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uLWRlbGF5JzogJHRoaXMuaW5kZXgoKSAvIDE1ICsgJ3MnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRyaWdnZXIub24oJ2NsaWNrJywgKGV2ZW50KT0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtZW51LWFjdGl2YXRlZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBteVRoZW1lOyJdfQ==
