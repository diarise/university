(function ($) {
    
	$(window).load(function() {
		
		$("#teachingsBarInnerWrapper, #teachingsControlSectionInnerWrapper").css({
					"width": $(".parent_topic").width() - 20
		});
	
	});
	
	// $(window).scroll(function () {
 //        $('#menuLocalWrapper').toggleClass('scrolling', $(window).scrollTop() > $('#outerMenu').offset().top);
 //    });
	
	
	
	
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

//test

