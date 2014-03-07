(function($){

	$(document).ajaxComplete(function(){
		var allAuthors = $(".authors_name");
		var theTitle = "";
		var theAuthorName = "";
		var imgLinks = "";
		var jsonDataLink = "";
		var authorInfo = "";

		$.each(allAuthors, function(){
			$(this).click(function(){
				theAuthorName = $(this).text();
				jsonDataLink = "getTeacherBioByName/" + theAuthorName;
				$(this).tooltipster('show');
			})
		});

		allAuthors.tooltipster({
			trigger: "custom",
			content: "loading...",
			position: "right",
			offsetY: -400,
			offsetX: -480,
			functionBefore: function(origin, continueTooltip) {				
				continueTooltip();

				if(origin.data("ajax") != "cached"){
					$.ajax({
						url: jsonDataLink,
						type: "GET",
						dataType: "json",
						success: function(data){				
							authorInfo =  "<img src = '" + data[0].image_link + "'/>"
										+ "<span>" + data[0].title + "</span>"										
										+ "<span>" + data[0].teaser + "</span>"
										+ "<a href = 'javascript:void(0)' class = 'close-tip'><img src ='http://cdn1.kabbalah.com/university/icons/close.png'/></a>"; 			
							origin.tooltipster("update", authorInfo).data("ajax", "cached");
						}
					})
				}
			},
			functionReady: function(origin, tooltip) {
				tooltip.find(".tooltipster-content").css("pointer-events", "auto")
				.on("mouseleave.tooltipster", function(e){
					e.stopImmediatePropagation();
				});
				$('.close-tip').live({
					click: function(){
						origin.tooltipster('hide');
					}
				});
			}
		});
	});
//for class detail page
$(document).ready(function(){
	var theCourseAuthor = $(".theCourseAuthor a"); // for each course page
		var theCourseAuthorName = "";
		var theCourseAuthorJsonLink = "";

		theCourseAuthor.click(function(){
			theCourseAuthorName = $(this).attr("class");
			theCourseAuthorJsonLink = "getTeacherBioByName/" + theCourseAuthorName;
			$(this).tooltipster('show');
		});

		theCourseAuthor.tooltipster({
			trigger: "custom",
			content: "loading...",
			position: "right",
			offsetY: -400,
			offsetX: -480,			
			functionBefore: function(origin, continueTooltip) {				
				continueTooltip();

				if(origin.data("ajax") != "cached"){
					$.ajax({
						url: theCourseAuthorJsonLink,
						type: "GET",
						dataType: "json",
						success: function(data){				
							authorInfo =  "<img src = '" + data[0].image_link + "'/>"
										+ "<span>" + data[0].title + "</span>"										
										+ "<span>" + data[0].teaser + "</span>"
										+ "<a href = 'javascript:void(0)' class = 'close-tip'><img src ='http://cdn1.kabbalah.com/university/icons/close.png'/></a>"; 			
							origin.tooltipster("update", authorInfo).data("ajax", "cached");
						}
					})
				}
			},
			functionReady: function(origin, tooltip) {
				tooltip.find(".tooltipster-content").css("pointer-events", "auto")
				.on("mouseleave.tooltipster", function(e){
					e.stopImmediatePropagation();
				});
				$('.close-tip').live({
					click: function(){
						origin.tooltipster('hide');
					}
				});
			}
		});
})

})(jQuery)


