/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.videoPreview = {
  attach: function (context, settings) {
	jwplayer("jwplayer1").on('time', function(e) 
	{	
		if( Math.round(e.position) == '120' )
		{
			jwplayer("jwplayer1").remove();
			$( "#videoPreview" ).remove();
			$( "#wrapperVideoSection" ).prepend( "<div id='videoPreviewImage' class='preVideoImg'><div class='overImageOpacity'></div>"+Drupal.settings.lesson_image+"</div>");
		}	
	});	
	
  }
};
})(jQuery);