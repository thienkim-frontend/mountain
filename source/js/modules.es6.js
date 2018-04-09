let myTheme = {};

myTheme.handlePreloader = ()=>{
    if($("#loading-wrapper").length){
        $("#loading-wrapper").delay(200).fadeOut(500);
    }
}
/*-----------------------------------------
1. backToTop
------------------------------------------*/
myTheme.backToTop = ()=> {
    let offset = 800,
        $back_to_top = $('#back-top > a');
    
    $(window).scroll(function(){
        if( $(this).scrollTop() > offset ) { 
            $back_to_top.fadeIn();
        }else{
            $back_to_top.fadeOut();
        }
    });
    
    $back_to_top.on('click', (event)=>{
        console.log("d");
        event.preventDefault();
        $("html, body").animate({scrollTop : 0}, 1000 , "swing");
        
    });
}
/*-----------------------------------------
8. smoothScroll
------------------------------------------*/
myTheme.smoothScroll = (el)=>{
    $(el).on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash;
        var marginTarget = parseInt($(target).css("margin-top"), 10);;
        var posTop = $(target).offset().top;
        $('html, body').stop().animate({
            'scrollTop': ( posTop - 90 - marginTarget)
        }, 500, 'swing');
    });
}
/*-----------------------------------------
9. navAnimation for desktop & ipad
------------------------------------------*/
myTheme.navAnimation = (el)=>{
    let $el = $(el),
        trigger = $el.find('.side-menu-btn'),
        menuItems = $el.find('.nav-mainHeader').find('li');

    if ($el.length) {
        menuItems.each(function() {
            var $this = $(this);
            $this.css({
                '-webkit-transition-delay': $this.index() / 15 + 's',
                '-moz-transition-delay': $this.index() / 15 + 's',
                'transition-delay': $this.index() / 15 + 's'
            });
        });
        trigger.on('click', (event)=> {
            event.preventDefault();
            $('body').toggleClass('menu-activated');
        });
    };
}
export default myTheme;