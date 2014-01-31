/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    //code starts
    var className;

	$('.views-table tbody tr').each(function() {
	    //alert($(this).find('.Video_link').val()); // `this` is TR DOM element
	    var href = $(this).find('.Video_link').attr('href');
	  
	    
	  if (href == context.URL){
	  	  console.log(context.URL);
	  	   console.log(href);
	 	 className = $('.Video_link span').attr('class');
	 	console.log(className);
    	}
    
	});
	console.log(className);
		$('className').text('NOW PLAYING');
    //code ends
  }
};
})(jQuery);