/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    //code starts
    var href = $('.Video_link').attr('href');
  
    console.log(context.URL);
     if (href == context.URL){
     	$('.Video_link span').text('NOW PLAYING');
     }

	$('.views-table tbody tr').each(function() {
	    //alert($(this).find('.Video_link').val()); // `this` is TR DOM element
	    var href = $(this).find('.Video_link').attr('href');
	      console.log(href);
	});


    //code ends
  }
};
})(jQuery);