/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    //code starts
    var className;

	$('.views-table tbody tr').each(function() {
	    var videohref = $(this).find('.Video_link').attr('href');
	    var audiohref = $(this).find('.Audio_link').attr('href');
	  if (videohref == context.URL){
	 	 $(this).find('.Video_link span').text('NOW PLAYING');
	 	 $(this).find('.Video_link span').addClass( "nowplaying" );
	 	 $(this).find('.views-table tbody tr td').addClass( "viewedLessons" ); // add class to lesson viewed
    	}
    	
    	 if (audiohref == context.URL){
	 	 $(this).find('.Audio_link span').text('NOW PLAYING');
	 	 $(this).find('.Audio_link').addClass( "nowplaying" );
    	}
    
	});
    //code ends
  }
};
})(jQuery);