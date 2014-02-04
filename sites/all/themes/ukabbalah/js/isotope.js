/**
 * @author kabbalah kabbalah
 */
(function($) {
  $(document).ready(function() {

    $('.masonry').masonry({
      itemSelector: 'ul.masonry li',
      isFitWidth: true ,
      animationOptions: {
        duration: 400
      }
    });

	$(".masonry").css({
	    "min-width": 586,                 
	});

	$(".title").css({
	    "overflow": "hidden",
	    "margin-left": "auto",
	    "margin-right": "auto",
	    "margin-bottom": "18px",
	    "width": $(".masonry").width() - 20,                  
	});

	$("#mainContentWrapper .view-filters").css({
	    "border-bottom": "1px solid #ccc",
	    "margin-bottom": 50,
	    "overflow": "hidden",
	    "margin-left": "auto",
	    "margin-right": "auto",
	    "width": $(".masonry").width() - 20,  
	    "height": 80,                
	});

	$(".termDesc").css({
	    "overflow": "hidden",
	    "margin-left": "auto",
	    "margin-right": "auto",
	    "width": $(".masonry").width() - 20,                  
	});

 
	var resizeTimer;
	$(window).resize(function(){
	clearTimeout(resizeTimer);
  	resizeTimer = setTimeout(function() {
		  $("#mainContentWrapper h1, #courseByParentWrapper h1").css({
	          "width" : $(".masonry").width() - 20
	  });

		  $("#mainContentWrapper .view-filters,#mainContentWrapper .termDesc").css({
	          "width" : $(".masonry").width() - 20
	  });
		}, 200);  
		})
  });
})(jQuery);




// var resizeTimer;
// $(window).resize(function() {
//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(function() {
//     var body_size = $('section').width();
//     // ...
//     // do your work here
//     // ...
//   }, 200);
// });