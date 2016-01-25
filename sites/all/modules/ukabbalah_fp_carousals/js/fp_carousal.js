(function($){
	$.fn.UkabCarousel = function(option){
		var jsonUrl = option.jsonLink;
		var divId = $(this);
		var contsDisplayNum = 3;
		var rowContent = "";	
		var imageWidth = 320;
		var scrollMode = "hidden";
		if("ontouchstart" in document.documentElement){
			scrollMode = "scroll";
		};
	
		divId.html("<div id='loading' style ='text-align: center; padding-top: 100px'><img src = '/sites/all/modules/kabbalah_custom_slideshow/img/clocker.gif'></img></div>");

		$.ajax({
			url: jsonUrl,
			type: "GET",
			dataType: "json",
			success: function(data){

				var theSlideWrapper= "<div class = 'imageslide'><div class = 'rowStyle'><span class='leftArrowStyleHome'></span><span class='rightArrowStyleHome'></span><div class = 'slideWrapper'><ul class = 'ulStyle carrouselFix'></ul></div></div></div>";
				divId.html(theSlideWrapper);
				if(data !== null)
					startDisplay(data);
			},
			complete: function(){
				styleCarousel();
				arrowClick();
				hoverDesc();
			}
		});
		var startDisplay = function(data){
            var setSlideContent = divId.find("ul");
      
                $.each(data, function(i){      // add all images of each row

                    rowContent += "<li>"
									+ "<span class = 'lessonBlockWrapper'>"
										+ "<a href =" + data[i].path + ">"
											+ "<span class='lessonBlockImage'>"
									            + "<span class='lessonBlockImageHover'></span>"
												+ "<img src = " + data[i].image + " class = 'imageCover' />"
											+ "</span>"
											+ "<span class='lessonBlockTitle'>"
												+ data[i].title
											+ "</span>"
											+ "<span class='lessonBlockTeacherInfo'>"
												
												+ "<span>"
												+ data[i].author
												+ "</span>"
											+ "</span>"
											+ "<span class='lessonBlockDetail'>"
												+ "<span class= '" + data[i].membership +"'></span>"
												+ "<span class= '" + data[i].media_type +"'></span>"
												+ "<span class='lessonBlockInfo'>"
												+ data[i].created
												+ "</span>"
											+ "</span>"
										+ "</a>"
									+ "</span>"
                               + "</li>";    
				});
                
            setSlideContent.html(rowContent);
		};

		var styleCarousel = function(){
			var globalImgCount = divId.find("ul").children("li").length;
			var rightImgCount = globalImgCount - contsDisplayNum;

			divId.find(".leftArrowStyleHome").hide();

			if(rightImgCount <= 0) {
				divId.find(".rightArrowStyleHome").hide()
			} else {
				divId.find(".rightArrowStyleHome").show()
			}

			divId.find(".slideWrapper").css({
				"margin": "0 auto",
				"overflow": scrollMode,
				"-webkit-overflow-scrolling": "touch",
				"width": 960
			});
			divId.find("ul").css({
				"width":imageWidth * globalImgCount,
				"padding": 0,
				"position":"relative"
			});
			divId.find(".rightArrowStyleHome").css({
				"position": "absolute",
				"right": 0,
				"margin-top": 138,
				"z-index": 120,
				"cursor": "pointer"
			});
			divId.find(".leftArrowStyleHome").css({
				"margin-top": 138,
				"position": "absolute",
				"z-index": 120,
				"cursor": "pointer"
			})
		};

		var arrowClick = function(){
			var globalImgCount = divId.find("ul").children("li").length;
			var rightImgCount = globalImgCount- contsDisplayNum;
			var leftImgCount = 0;
		
			divId.find(".rightArrowStyleHome").click(function(){
				$(this).unbind();
				divId.find(".leftArrowStyleHome").show();
				leftImgCount += contsDisplayNum;
				rightImgCount -= contsDisplayNum;

				divId.find("ul").animate({
					left: "-=" + imageWidth*contsDisplayNum
				}, 500, (function(callee){
					return function(){$(this).parent().prev().click(callee);}
				})
				(arguments.callee));

				if(rightImgCount <= 0){
					divId.find(".rightArrowStyleHome").hide();
				};			
			});

			divId.find(".leftArrowStyleHome").click(function(){
				$(this).unbind();
				divId.find(".rightArrowStyleHome").show();
				leftImgCount -= contsDisplayNum;
				rightImgCount += contsDisplayNum;

				divId.find("ul").animate({
					left:"+=" + imageWidth*contsDisplayNum
				}, 500, (function(callee){
					return function(){$(this).parent().prev().prev().click(callee);}
				})
				(arguments.callee));

				if(leftImgCount <=0){
					divId.find(".leftArrowStyleHome").hide();
				}
			});			
		};

		var hoverDesc = function (){
			$("#recentlyAddedCourses").show();	
   			$("#recentlyAddedCourses").hide();   						
		};
	}

	$(document).ready(function(){
		$("#" + Drupal.settings.fp_vars1.divid).UkabCarousel({
			jsonLink: Drupal.settings.fp_vars1.jsonurl
		});
		
 		$("#" + Drupal.settings.fp_vars2.divid).UkabCarousel({
			jsonLink: Drupal.settings.fp_vars2.jsonurl
		});
                        
		// $("#" + Drupal.settings.fp_vars3.divid).UkabCarousel({
			// jsonLink: Drupal.settings.fp_vars3.jsonurl
		// });
		
		$("#" + Drupal.settings.fp_vars4.divid).UkabCarousel({
			jsonLink: Drupal.settings.fp_vars4.jsonurl
		});
		
		$("#" + Drupal.settings.fp_vars5.divid).UkabCarousel({
			jsonLink: Drupal.settings.fp_vars5.jsonurl
		});
		
		$("#" + Drupal.settings.fp_vars6.divid).UkabCarousel({
			jsonLink: Drupal.settings.fp_vars6.jsonurl
		});

	    var filter = function() {
			$("#recentlyAddedCourses").hide();	       				
			$("#recentLessonTab").click(function() {
				$("#recentCourseTab").removeClass("activeTap");
				$(this).addClass("activeTap");
				$("#recentlyAddedCourses").hide();
				$("#recentlyAddedLessons").show();
			});
			$("#recentCourseTab").click(function() {	   	
				$("#recentLessonTab").removeClass("activeTap");
				$(this).addClass("activeTap");
				$("#recentlyAddedLessons").hide();
				$("#recentlyAddedCourses").show();
			})
		}
		filter();

		var touchStart = function () {
			var div1 = document.getElementById("recentlyAddedLessons");
			var div2 = document.getElementById("recentlyAddedCourses");
			var div3 = document.getElementById("beginnerCourse");
			var div4 = document.getElementById("recommendedCoursesWeekly");
			var div5 = document.getElementById("freeLessons");

			div1.ontouchstart = function(){
				$(this).find(".rightArrowStyleHome").unbind().css({
					"visibility": "hidden"
				});
			}
			
	 		div2.ontouchstart = function(){
				$(this).find(".rightArrowStyleHome").unbind().css({
					"visibility": "hidden"
				});
			}
			
			div3.ontouchstart = function(){
				$(this).find(".rightArrowStyleHome").unbind().css({
					"visibility": "hidden"
				});
			}
			
			div4.ontouchstart = function(){
				$(this).find(".rightArrowStyleHome").unbind().css({
					"visibility": "hidden"
				});
			}
			
			div5.ontouchstart = function(){
				$(this).find(".rightArrowStyleHome").unbind().css({
					"visibility": "hidden"
				});
			}
		}
		touchStart();		
	})

})(jQuery)