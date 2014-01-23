(function($){

	$(document).ready(function() {
		$("#kcomTestimonialsSlideshow > div:gt(0)").hide();

		setInterval(function() { 
		  $('#kcomTestimonialsSlideshow > div:first')
			.fadeOut(700)
			.next()
			.fadeIn(700)
			.end()
			.appendTo('#kcomTestimonialsSlideshow');
		},  5000);
	});	

})(jQuery)