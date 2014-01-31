/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    //code starts
	$('.views-table tbody tr').each(function() {
	    //alert($(this).find('.Video_link').val()); // `this` is TR DOM element
	    var href = $(this).find('.Video_link').attr('href');
	    console.log(context.URL);
	     if (href == context.URL){
	    var className = $('.Video_link span').attr('class');
	    exit();
    	 }
	});
	console.log(className);
		$(className).text('NOW PLAYING');
    //code ends
  }
};
})(jQuery);