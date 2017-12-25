function detectPlatform() {
    if ((/iPhone|iPad|iPod/i).test(navigator.userAgent)) {
        return 'ios';
    }
    if ((/Android|BlackBerry/i).test(navigator.userAgent)) {
        return 'android';
    }

    return false;
}
(function($) {
    /**
     * Detect platform
     */
    $(document).ready(function() {
        var platform = detectPlatform();

        if (false !== platform) {
            $('body').addClass("is-sp is-" + platform);
        } else {
            $('body').addClass("is-pc");
        }
    });
})(jQuery);
(function($) {
    $(window).scroll(function() {
        //show header
        if ($(this).scrollTop() > 0) {
            $('.main-header').addClass('main-header__open');
        } else if ($(this).scrollTop() <= 0 && !$(".toggle-menu").hasClass("menu-open")) {
            $('.main-header').removeClass('main-header__open');
        }

        //move text and hover card
        parallaxScroll($(".card--sendai"), 842);
        parallaxScroll($(".card--sapporo"), 815);
        parallaxScroll($(".card--fukuoka"), 815);
        parallaxScroll($(".card--nagoya"), 830);
        parallaxScroll($(".card--osaka"), 855);
        parallaxScroll($(".card--tokyo"), 855);
        parallaxScroll($(".card--finaltokyo"), 790);

        //slidedown link player
        if ($(".finalists__header").offset() && $(".finalists__body").offset()) {
            var finalListsHeader = $(".finalists__header").offset().top;
        }
        if ($(this).scrollTop() > finalListsHeader) {
            $(".finalists-item--sapporo a").slideDown(1500);
            $(".finalists-item--nagoya a").slideDown(1500);
            $(".finalists-item--osaka a").slideDown(1500);
            $(".finalists-item--tokyo2 a").slideDown(1500);
        }
    });

    //function scroll move text
    function parallaxScroll(el, top) {
        var middle = top / 2;
        if (el.offset()) {
            var parentWidthMin = el.offset().top - 600,
                parentWidthMax = el.offset().top + 950;
            if ($(window).scrollTop() > parentWidthMin && $(window).scrollTop() < parentWidthMax) {
                if ($(this).scrollTop() - parentWidthMin < middle) {
                    el.find(".card__date").css({
                        'bottom': $(this).scrollTop() - parentWidthMin,
                        'transition': 'bottom 1000ms cubic-bezier(0.015, 0.005, 0.860, 0.990)',
                        '-webkit-transition': 'bottom 1000ms cubic-bezier(0.015, 0.005, 0.860, 0.990)'
                    });
                    el.find(".card__location").css({
                        'top': $(this).scrollTop() - parentWidthMin,
                        'transition': 'top 1000ms cubic-bezier(0.490, 0.005, 1.000, 0.975)',
                        'webkit-transition': 'top 1000ms cubic-bezier(0.490, 0.005, 1.000, 0.975)'
                    });
                } else if ($(this).scrollTop() - parentWidthMin > middle && $(this).scrollTop() - parentWidthMin < top) {
                    el.find(".card__date").css({
                        'bottom': $(this).scrollTop() - parentWidthMin,
                        'transition': 'bottom 1000ms cubic-bezier(0.490, 0.005, 1.000, 0.975)',
                        '-webkit-transition': 'bottom 1000ms cubic-bezier(0.490, 0.005, 1.000, 0.975)'
                    });
                    el.find(".card__location").css({
                        'top': $(this).scrollTop() - parentWidthMin,
                        'transition': 'top 1000ms cubic-bezier(0.015, 0.005, 0.860, 0.990)',
                        'webkit-transition': 'top 1000ms cubic-bezier(0.015, 0.005, 0.860, 0.990)'
                    });
                }
            } else if ($(this).scrollTop() < parentWidthMin) {
                el.find(".card__date").css("bottom", "35px");
                el.find(".card__location").css("top", "-25px");
            } else {
                el.find(".card__date").css("bottom", "850px");
                el.find(".card__location").css("top", top);
            }
            if (detectPlatform()) {
                if ($(window).scrollTop() > parentWidthMin - 250 && $(window).scrollTop() < parentWidthMax - 700) {
                    el.find("a").addClass("hover");
                } else {
                    el.find("a").removeClass("hover");
                }
            }
        }
    }

    $(".toggle-menu").click(function() {
        $(this).toggleClass("menu-open");
        $(".menu").slideToggle(500);
    });

    var o = navigator.userAgent.toLowerCase();
    o.indexOf("iphone") <= -1 && o.indexOf("ipad") <= -1 && o.indexOf("android") <= -1 && ($(".js-body").addClass("is-pc"), $(".js-contents").addClass("is-pc"));


    var windo = $(window);
    /* pre-load js */
    windo.on('load', function() {
        $(".js-loading").delay(1000).fadeOut(800);
    });

})(jQuery);