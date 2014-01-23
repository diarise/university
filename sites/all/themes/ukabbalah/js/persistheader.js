(function($) {
	$(window).scroll(function () {
	    $('#mainOuterContentLogoMenuWrapper').toggleClass('scrolling', $(window).scrollTop() > $('#outerMenu').offset().top);
	    $('.donateFloat').toggleClass('donateFloatFix', $(window).scrollTop() > $('#outerMenu').offset().top);
	    $('#headerDonateButtonFloat').toggleClass('headerDonateButtonFloatAppear', $(window).scrollTop() > $('#outerMenu').offset().top);
	});
})(jQuery);