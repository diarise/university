(function($){
$(document).ready(function(){
	$('.trans-lang-select').change(function(){
		var val=$(this).val();
		if(val=='none'){
			$('.transcript-content').html('');
			return;
		}
		$('.trans-lang-select option[value="none"]').text('Transcript OFF');
		$.ajax({
			url:'/dotsub/transcript/'+Drupal.settings.dotsub.trans_id+'/'+val,
			success:function(data){
				$('.transcript-content').html(data);
			}
		});
	});
	$('.transcript-time').live('click',function(){
			var id=this.id.split('-');
			jwplayer(Drupal.settings.dotsub.player_id).seek(id[1]);
			$('.transcript-content').removeClass('free-scroll');
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
	
	jwplayer(Drupal.settings.dotsub.player_id).onCaptionsList(function(){
		for(i=0;i<this.config.playlist[0].captions.length;i++){
			if(this.config.playlist[0].captions[i].abbr){
				$('.trans-lang-select').val(this.config.playlist[0].captions[i].abbr).change();
			}
		}
	});
	jwplayer(Drupal.settings.dotsub.player_id).onTime(function(e) {
		var time=jwplayer(Drupal.settings.dotsub.player_id).getPosition();
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
    });
});
})(jQuery);