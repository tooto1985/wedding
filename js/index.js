$(function() {
    (function() {
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-49667069-2', 'auto');
        ga('send', 'pageview');
    })(); //ga
    (function() {
        var headerDivWidth = 0;
        $(".header>div>a").click(function(e) {
            $("html,body").animate({
                "scrollTop": $($(this).attr("href")).offset().top - parseInt($("body").css("padding-top"))
            });
            e.preventDefault();
        }).each(function() {
            headerDivWidth += $(this).outerWidth(true);
        }).eq(0).addClass("selected");
        $(".header>div").width(headerDivWidth);
    })(); //menu
    (function() {
        var blockPositionTop = [];
        $(".block").each(function() {
            blockPositionTop.push($(this).offset().top - parseInt($("body").css("padding-top")));
        });
        $(document).scroll(function() {
            var index = 0;
            for (var i = blockPositionTop.length - 1; i >= 0; i--) {
                if ($(window).scrollTop() >= blockPositionTop[i]) {
                    index = i;
                    break;
                }
            }
            $(".header>div>a.selected").removeClass();
            $(".header>div>a").eq(index).addClass("selected");
        });
    })(); //scroll
});