(function($) {
	$(window).scroll(function () {
	    $('#mainOuterContentLogoMenuWrapper').toggleClass('scrolling', $(window).scrollTop() > $('#outerMenu').offset().top);
	    $('.donateFloat').toggleClass('donateFloatFix', $(window).scrollTop() > $('#outerMenu').offset().top);
	    $('#headerDonateButtonFloat').toggleClass('headerDonateButtonFloatAppear', $(window).scrollTop() > $('#outerMenu').offset().top);
	    $('#teachingsControlSection').toggleClass('scrollingTitle masonry', $(window).scrollTop() > $('#pageregion').offset().top);
	    $('#teachingsSectionHeaderBar').toggleClass('scrollingFilter masonry', $(window).scrollTop() > $('#pageregion').offset().top);
	    $('#teachingsControlSectionInnerWrapper').toggleClass('teachingsBarInnerWrapper brick-masonry', $(window).scrollTop() > $('#pageregion').offset().top);
	    $('#teachingsBarInnerWrapper').toggleClass('teachingsBarInnerWrapper brick-masonry', $(window).scrollTop() > $('#pageregion').offset().top);
	});
})(jQuery);