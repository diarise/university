(function($) {
	$(window).scroll(function () {
	    $('#mainOuterContentLogoMenuWrapper').toggleClass('scrolling', $(window).scrollTop() > $('#outerMenu').offset().top);
	    $('.donateFloat').toggleClass('donateFloatFix', $(window).scrollTop() > $('#outerMenu').offset().top);
	    $('#headerDonateButtonFloat').toggleClass('headerDonateButtonFloatAppear', $(window).scrollTop() > $('#outerMenu').offset().top);
	    $('#teachingsControlSection').toggleClass('scrollingTitle', $(window).scrollTop() > $('#pageregion').offset().top);
	    $('#teachingsSectionHeaderBar').toggleClass('scrollingFilter', $(window).scrollTop() > $('#pageregion').offset().top);
	});
})(jQuery);