/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.videoPreview = {
  attach: function (context, settings) {
	jwplayer("jwplayer1").on('time', function(e) 
	{	
		if( Math.round(e.position) > '120' )
		{
			$( "#videoPreview" ).fadeOut( 2000 , function() {
				jwplayer("jwplayer1").remove();
				$( "#videoPreviewImage" ).fadeIn( 2000 , function() {
					$( "#videoPreview" ).remove();
				});	
			});
	
			$( "#wrapperVideoSection" ).prepend( "<div id='videoPreviewImage' class='preVideoImg' style= 'display: none'><div class='overImageOpacity'></div>"+Drupal.settings.lesson_image+"</div>");	
		}	
	});	
	
  }
};
})(jQuery);