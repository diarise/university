(function($){
	$(document).ready(function(){
	
		$('.trans-lang-select').change(function(){
			var val=$(this).val();
			if(val=='none'){
				$('.transcript-content').html('');
				return;
			}
			$('.trans-lang-select option[value="none"]').text('Remove Transcript');
			
			$.ajax({
				url:'/dotsub/transcript/'+Drupal.settings.dotsub.trans_id+'/'+val,
				success:function(data){
					$('.transcript-content').html(data);
				}
			});
			
			/* Makes the transcript interactive */
			sublime.load();	
			sublime.ready(function() 
			{
				 sublime(Drupal.settings.dotsub.player_id).on('timeUpdate', function(player , playbackTime) {
					var time = playbackTime;
					//console.log( time );
					
					if( time != 0 )
					{
						var tc=$('.transcript-content');
						var tco=tc.offset();
						$('.transcript-time').each(function(){
							var id=this.id.split('-');
							if(time>=(id[1]*1) && time<((id[1]*1)+(id[2]*1))){
								//$('.transcript-content').scroll
								if(!$(this).hasClass('current')){
									if(!tc.hasClass('free-scroll')){
										var scrollTo=$(this).offset().top - tco.top + tc.scrollTop();
										//console.log(scrollTo);
										tc.animate({
											scrollTop: scrollTo
										},{
											complete:function(){
												tc.removeClass('free-scroll');
												tc.addClass('animating');
											}
										});
									}
									$('.transcript-time.current').removeClass('current');
									$(this).addClass('current');
								}
								return false;
							}
						});
					}
					
					
				});
			});
			/* End of making the transcript interactive */
		});
		
		
		$('.transcript-time').live('click',function() {
		
			var id=this.id.split('-');	
			sublime.load();	
			sublime.ready(function() 
			{
				var player1 = sublime(Drupal.settings.dotsub.player_id);
				var time = player1.playbackTime();
				//console.log(time);
				
				if( time == 0 ) {
					
					player1.on('play', function(player) {
						
						console.log( " First Play" );
						player.seekTo(id[1]);
						$('.transcript-content').removeClass('free-scroll');
					
					});
					player1.play();
					
				}
				else {
				
					//console.log( " Regular Play" );
					player1.seekTo(id[1]);
					$('.transcript-content').removeClass('free-scroll');
				}	
			});		
		});
		
		$('.transcript-time').live('mouseover', function(){
				$(this).addClass('hover');
		});
		
		$('.transcript-time').live('mouseout', function(){
				$(this).removeClass('hover');
		});
		
		
		$('.transcript-content').scroll(function(e){
			if($(this).hasClass('animating')) $(this).removeClass('animating');
			else $(this).addClass('free-scroll');
		});
		
		// sublime(Drupal.settings.dotsub.player_id).onCaptionsList(function(){
			// for(i=0;i<this.config.playlist[0].captions.length;i++){
				// if(this.config.playlist[0].captions[i].abbr){
					// $('.trans-lang-select').val(this.config.playlist[0].captions[i].abbr).change();
				// }
			// }
		// });
		
   });
})(jQuery);