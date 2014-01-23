(function($){
	updateTwistalThumb=function(){
		$('#display-existing-video').html('');
		var img=$('<img width="150px"></img>');
		var vid=$('#existing_video_handle_wrapper select').val();
		var url="http://twistassets.kabbalah.com/videos/"+vid+"/screenshots/150w.jpg";
		img.attr('src',url);
		$('#display-existing-video').append(img);
	}
})(jQuery);