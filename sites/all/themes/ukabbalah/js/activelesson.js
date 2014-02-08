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
	 	 $(this).find('td').addClass( "activeLesson" );
    	}
    	
    	 if (audiohref == context.URL){
	 	 $(this).find('.Audio_link span').text('NOW PLAYING');
	 	 $(this).find('.Audio_link span').addClass( "testttt" );
	 	 $(this).find('.Audio_link').addClass( "nowplaying" );
	 	 $(this).find('td').addClass( "activeLesson" );
    	}
    
	});
    //code ends
  }
};
})(jQuery);