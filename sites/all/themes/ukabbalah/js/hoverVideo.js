(function($){
	$(document).ready(function(){
		$("#lessonCollectionSection tr").hover(
			function(){
				$(this).find(".Video").css({
					"background": "url(http://cdn1.kabbalah.com/university/icons/icon_video_dark_grey.png) no-repeat 8px 6px"
				});
				$(this).css({
					"font-weight": "normal",
					"background": "#e1edf1"
				});
                $(this).find(".views-field-twistage-subtitles span, .subtitle-width span").css({
                    "background": "url(http://cdn1.kabbalah.com/university/icons/cc_icon_dark_grey.png) no-repeat 8px 9px"
                })
			},
			function(){
				$(this).find(".Video").css({
					"background": "url(http://cdn1.kabbalah.com/university/icons/icon_video_light_grey.png) no-repeat 8px 6px"
				});
				$(this).css({
					"font-weight": "normal",
					"background": "none"
				});
                $(this).find(".views-field-twistage-subtitles span, .subtitle-width span").css({
                    "background": "url(http://cdn1.kabbalah.com/university/icons/cc_icon_light_grey.png) no-repeat 8px 9px"
                })
			}
		)
	})
})(jQuery)