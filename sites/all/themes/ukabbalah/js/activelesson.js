/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    //code starts
    var className;

	$('.views-table tbody tr').each(function() {
	    var href = $(this).find('.Video_link').attr('href');
	  if (href == context.URL){
	 	 className = $(this).find('.Video_link span').attr('class');
	 	 $(this).find('.Video_link span').text('NOW PLAYING');
    	}
    
	});
    //code ends
  }
};
})(jQuery);