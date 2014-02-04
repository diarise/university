(function ($) {

	$.each($(".eachCont"), function(){
		titleHeight = $(this).find(".theTitle").outerHeight();
		topicHeight = $(this).find(".teachingsTopicAndDate").outerHeight();

		$(this).find(".theDescCont").css ({
			"margin-top": -(titleHeight + topicHeight + 14),
		});                                

		$(this).find(".imagesCont").hover(         //hove effect of the each image                                                
			function () {
				titleHeight = $(this).find(".theTitle").outerHeight();
				topicHeight = $(this).find(".teachingsTopicAndDate").outerHeight();

				$(this).find(".theDescCont").stop().animate({ 
					marginTop: -180,
				   // paddingTop:20,
				}, 350);

			},

			function () {
				titleHeight = $(this).find(".theTitle").outerHeight();
				topicHeight = $(this).find(".teachingsTopicAndDate").outerHeight();
				
				$(this).find(".theDescCont").stop().animate({ 
					marginTop: -(titleHeight + topicHeight + 14),
				  //  paddingTop:0,
				}, 350);    
			}
		);

	});

})(jQuery);	