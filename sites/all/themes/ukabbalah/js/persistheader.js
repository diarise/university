(function ($) {
    $(window).scroll(function () {
        $('#mainOuterContentLogoMenuWrapper').toggleClass('scrolling', $(window).scrollTop() > $('#outerMenu').offset().top);
        $('.donateFloat').toggleClass('donateFloatFix', $(window).scrollTop() > $('#outerMenu').offset().top);
        $('#headerDonateButtonFloat').toggleClass('headerDonateButtonFloatAppear', $(window).scrollTop() > $('#outerMenu').offset().top);
        $('#teachingsControlSection').toggleClass('scrollingTitle', $(window).scrollTop() > $('#pageregion').offset().top);
        $('#teachingsSectionHeaderBar').toggleClass('scrollingFilter', $(window).scrollTop() > $('#pageregion').offset().top);
        $('#teachingsControlSectionInnerWrapper').toggleClass('teachingsBarInnerWrapper parent_topic', $(window).scrollTop() > $('#pageregion').offset().top);
        $('#teachingsBarInnerWrapper').toggleClass('teachingsBarInnerWrapper parent_topic', $(window).scrollTop() > $('#pageregion').offset().top);
        $('#page-title').toggleClass('scrollingTitle', $(window).scrollTop() > $('#pageregion').offset().top);
        $('.termDesc').toggleClass('scrollingTermDesc', $(window).scrollTop() > $('#pageregion').offset().top);
        $('.view-filters').toggleClass('scrollingView-filters', $(window).scrollTop() > $('#pageregion').offset().top){
        		$('#mainOuterContentLogoMenuWrapper').removClass('scrolling');
        };
    });

    var resizeTimer;
    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            $("#teachingsBarInnerWrapper, #teachingsControlSectionInnerWrapper").css({
                "width": $(".parent_topic").width() - 20
            });


        }, 200);
    })

})(jQuery);