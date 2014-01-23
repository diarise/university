(function($){
	$.fn.UkabCarousel = function(option){
		var jsonUrl = option.jsonLink;
		var divId = $(this);
		var contsDisplayNum = 3;
		var rowContent = "";	
		var imageWidth = 320;
	
		divId.html("<div id='loading' style ='text-align: center; padding-top: 100px'><img src = '/sites/all/modules/kabbalah_custom_slideshow/img/clocker.gif'></img></div>");

		$.ajax({
			url: jsonUrl,
			type: "GET",
			dataType: "json",
			success: function(data){

				var contsLists = "";
				var theSlideWrapper= "<div class = 'imageslide'><div class = 'rowStyle'><img class='leftArrowStyleHome' src='/sites/all/modules/ukabbalah_fp_carousals/images/arrow-left.png'/><div class = 'slideWrapper'><ul class = 'ulStyle carrouselFix'></ul></div><img class='rightArrowStyleHome' src='/sites/all/modules/ukabbalah_fp_carousals/images/arrow-right.png'/></div></div>";
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
                                    + "<div class = 'contWrapper'>"   
                                        + "<img src = " + data[i].image + " class = 'theImage'>"
                                        + "<a href =" + data[i].path + ">"                       
                                        	+ "<span class ='theDescCont'>"

                                                + "<span class='theTitle'>"
                                                    + "<span class= '" + data[i].media_type +"'></span>"                                                         
                                                    + "<span class = 'theJsonTitle'>"
                                                            + data[i].title
                                                    + "</span>" 
                                                + "</span>"

                                                + "<span class='theDate'>"
                                                    + data[i].author
                                                    + " | "
                                                    + data[i].created
                                                + "</span>"
												+ "<span class='"+data[i].membership +"'></span>"
                                                + "<span class='theTeaser'>"
                                                    + data[i].teaser;
													
                        
						if( data[i].node_type == 'course' ) rowContent += "<span class ='readMore'> read more </span>"; 
						else rowContent += "<span class ='readMore'> watch now </span>";
                        
						
						rowContent += "</span>"
                                            + "</span>"
                                        + "</a>"
                                    + "</div>" 
                               + "</li>";    
                });
                
            setSlideContent.html(rowContent);
		};

		var styleCarousel = function(){
			var globalImgCount = divId.find("ul").children("li").length;
			var rightImgCount = globalImgCount- contsDisplayNum;
			var leftImgCount = 0;

			divId.find(".leftArrowStyleHome").hide();
			if(rightImgCount <= 0) {
				divId.find(".rightArrowStyleHome").hide()
			} else {
				divId.find(".rightArrowStyleHome").show()
			}

			divId.find(".slideWrapper").css({
				"margin": "0 auto",
				"overflow": "hidden",
				"width": 960
			});
			divId.find("ul").css({
				"width":imageWidth*globalImgCount,
				"padding": 0,
				"position":"relative"
			});
			divId.find("li").css({
				"display": "inline-block",
				"width": 320
			});
			divId.find(".theImage").css({
				"width":300
			});
			divId.find(".rightArrowStyleHome").css({
				"float": "right",
				"margin-top": -120,
				"z-index": 120,
				"cursor": "pointer"
			});
			divId.find(".leftArrowStyleHome").css({
				"float": "left",
				"margin-top": 71,
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
					return function(){$(this).parent().next().click(callee);}
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
					return function(){$(this).parent().prev().click(callee);}
				})
				(arguments.callee));

				if(leftImgCount <=0){
					divId.find(".leftArrowStyleHome").hide();
				}
			});			
		};

		var hoverDesc = function (){
			$("#recentlyAddedCourses").show();
			$.each($(".ulStyle li"), function(){
		        var titleHeight = $(this).find(".theJsonTitle").outerHeight();
		        var dateHeight = $(this).find(".theDate").outerHeight();
		      
		        $(this).find(".theDescCont").css ({
		            "margin-top": -(titleHeight + dateHeight + 13),
		        });		        
	        	
		        $(this).hover(
		          	function(){
			            $(this).find(".theDescCont").stop().animate({
			             	marginTop: "-180px",
			            },220);
		           },

		            function(){

			            titleHeight = $(this).find(".theJsonTitle").outerHeight();
			            dateHeight = $(this).find(".theDate").outerHeight();

			            $(this).find(".theDescCont").stop().animate({
			             	marginTop: -(titleHeight + dateHeight + 13),
			            },220);
      				}
      			)
   			});	
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
                        
		$("#" + Drupal.settings.fp_vars3.divid).UkabCarousel({
			jsonLink: Drupal.settings.fp_vars3.jsonurl
		});
		
		$("#" + Drupal.settings.fp_vars4.divid).UkabCarousel({
			jsonLink: Drupal.settings.fp_vars4.jsonurl
		});
		
		$("#" + Drupal.settings.fp_vars5.divid).UkabCarousel({
			jsonLink: Drupal.settings.fp_vars5.jsonurl
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
	})

})(jQuery)