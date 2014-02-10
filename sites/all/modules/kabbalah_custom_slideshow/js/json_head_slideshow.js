(function($){
	headSlideShow = function(options) {
		var slideContent = ""
		var liContent = ""
		var jsonLink = options.theJsonLink;
		var globalData = [];
		var contWidth = options.contentWidth;
		var currentImgNo = 1;
		var resWidth = 0;
		var gotoNo = 1;
		$("#slideshow").html("<div id='loading' style ='text-align: center; padding-top: 100px'><img src = '/sites/all/modules/kabbalah_custom_slideshow/img/clocker.gif'></img></div>");


		$.ajax({
			type: "GET",
			url: jsonLink,
			dataType: "json",
			cache: false,
			success: function(data) {
				slideContent += "<div id = 'front'><div id = 'frontLeft'><div id = 'goLeft'>Left</div></div><div id = 'frontMiddle'></div><div id='frontRight'><div id = 'goRight'>Right</div></div></div>";
				slideContent += "<div id= 'div2'><ul></ul></div>";
				$("#slideshow").html(slideContent);
				globalData = data;
				$.each(globalData, function(index,value){
					liContent +="<li>"
							+"<div class='slidesInfoWrapper'>"
								+"<a href='" +value.path + "'>"
									+"<div class='slidesImage'><img src='" + value.field_image_link_value + "' alt='slideshowImage' /></div>"
								+"</a>"
								+"<div class='slidesInfoDesc " + value.field_color_selector_value +"'>"
									+"<a href='" +value.path + "'>"
										+"<div class='slidesTitle'>" + value.title + "</div>"
										+"<div class='slidesSubTitle'>"+value.subtitle +"</div>"
										+"<div class='slidesBody'>" + value.teaser + "</div>"
										+"<div class='slidesReadMore'><a href='"+ value.path + "'>read more</a></div>"
									+"</a>"
								+"</div>"
							+"</div></li>"
				});
				$("#div2 ul").html(liContent);
				var list = $("#div2 ul");
				var items = list.find("> li");
				var imagesNum = items.length;
				items.filter(":first").before(items.slice(-2).clone().addClass("clone"));
				items.filter(":last").after(items.slice(0, 2).clone().addClass("clone"));
				items = list.find("> li");
				$("#frontMiddle").append('<ul class ="imgNav">');
				for (var i = 1; i <= imagesNum; i++) {
					$("#frontMiddle ul").append("<li rel =" + i + ">" + i + "</li>")
				};
				$(".imgNav li:first").addClass("activeNav");
				var pNavs = $("#frontMiddle ul li");
				addStyle = function() {
					$("#div2").css({
						"width" : "100%",
						"postion" : "absolute",
						"overflow" : "hidden",
					});
					$("#div2 ul").css({
						"padding" : 0,
						"width" : contWidth * (imagesNum + 4),
						"position" : "relative",
						"overflow" : "hidden",
					});
					$("#div2 ul li").css({
						"width" : 980,
						"height" : 349,
						"position" : "relative",
						"list-style" : "none",
						"display" : "inline-block",
						"float" : "left",
					});
					$("#front").css({
						"width" : "100%",
						"position" : "absolute",
					});
					$("#frontLeft").css({
						"height" : 349,
						"float" : "left",
						"position" : "relative",
						"background-color" : "#211d1d",
						"opacity" : 0.83,
						"filter" : "alpha(opacity = 83)",
						"z-index" : 120,
					});
					$("#frontRight").css({
						"height" : 349,
						"right" : 0,
						"position" : "absolute",
						"float" : "left",
						"background-color" : "#211d1d",
						"opacity" : 0.83,
						"filter" : "alpha(opacity = 83)",
						"z-index" : 120,
					});
					$("#frontMiddle").css({
						"width" : 980,
						"height" : 349,
						"float" : "left",
					});
					$("#goLeft").css({
						"margin-top" : 156,
						"margin-left" : 15,
						"width" : 22,
						"position" : "absolute",
						"left" : 0,
						"z-index" : 120,
						"cursor" : "pointer",
					});
					$("#goRight").css({
						"margin-top" : 156,
						"margin-right" : 15,
						"width" : 22,
						"position" : "absolute",
						"right" : 0,
						"z-index" : 120,
						"cursor" : "pointer",
					});
					$(".imgNav").css({
						"position" : "relative",
						"top" : 318,
						"z-index" : 130,
					});
					$(".imgNav li").css({
						"width" : 12,
						"display" : "inline-block",
						"margin-left" : 10,
						"cursor" : "pointer",
					});
				};
				addStyle();
				styleFront = function() {
					if($(window).width() <= 980){
						$("#frontLeft").css("width", 0);
						$("#frontRight").css("width", 0);
						$("#div2").scrollLeft((currentImgNo + 1) * contWidth)
					} else {
					var frontWidth = $("#front").innerWidth();
					resWidth = Math.ceil((frontWidth - contWidth) / 2);
					(frontWidth % 2 == 0) ? (resWidthNew = resWidth) : (resWidthNew = resWidth - 1);					
					$("#frontRight").css("width", resWidth);
					$("#div2").scrollLeft((currentImgNo + 1) * contWidth - resWidth);
					}
				};
				styleFront();
				imgNav = function() {
					$.each(pNavs, function() {
						$(this).click(function() {
							var gotoNo = $(this).attr('rel');
							var jumpNo = gotoNo - pNavs.filter(".activeNav").attr("rel");
							if (jumpNo == 0) {
								jumpNo = 1
							};
							if ($(this).hasClass('activeNav')) {
								return false;
							} else {
								pNavs.removeClass("activeNav");
								$(this).addClass("activeNav");
								$("#div2").animate({
									scrollLeft : "+=" + contWidth * jumpNo
								}, 700, function() {
									currentImgNo += jumpNo;
									if (currentImgNo > imagesNum) {
										$("#div2").scrollLeft(contWidth * jumpNo - resWidth);
										currentImgNo = gotoNo;
									};
									if (currentImgNo < 1) {
										$("#div2").scrollLeft(contWidth * (imagesNum + 1) - resWidth);
										currentImgNo = imagesNum;
									};
								})
							}
						});
					});
				};
				imgNav();
				$("#goRight").click(function() {
					$("#div2").animate({
						scrollLeft : "+=" + contWidth
					}, 800, function(){
						currentImgNo += 1;
						if (currentImgNo > imagesNum) {
							$("#div2").scrollLeft(contWidth * 2 - resWidth);
							currentImgNo = 1
						};
						pNavs.removeClass("activeNav");
						pNavs.filter(':eq(' + (currentImgNo - 1) + ')').addClass("activeNav");
					})
				});
				$("#goLeft").click(function() {
					$("#div2").animate({
						scrollLeft : "-=" + contWidth
					}, 800, function(){
						currentImgNo -= 1;
						if (currentImgNo < 1) {
							$("#div2").scrollLeft(contWidth * (imagesNum + 1) - resWidth);
							currentImgNo = imagesNum
						};
						pNavs.removeClass("activeNav");
						pNavs.filter(':eq(' + (currentImgNo - 1) + ')').addClass("activeNav");
					})
				});
			}
		})
		$(window).resize(function(){
			if($(window).width() <= 980){
				$("#frontLeft").css("width", 0);
				$("#frontRight").css("width", 0);
				$("#div2").scrollLeft((currentImgNo + 1) * contWidth)
			} else {
				var frontWidth = $("#front").innerWidth();
				resWidth = (frontWidth - contWidth) / 2;
				$("#frontLeft").css("width", resWidth);
				$("#frontRight").css("width", resWidth);
				$("#div2").scrollLeft((currentImgNo + 1) * contWidth - resWidth)
			}
		});
		startAutoSlide = function() {
			var start = null;
			start = setInterval(function() {
				$("#goRight").click()
			}, 20000);
			$("#div2, #front").live({
				mouseenter: function() {
					clearInterval(start);
					start = null
				},
				mouseleave: function() {
					start = setInterval(function() {
						$("#goRight").click()
					}, 20000)
				}
			})
		};
	};
	$(document).ready(function() {
		headSlideShow({
			contentWidth : 980,
			theJsonLink : "/k_api/slds"
		});
		startAutoSlide()
	}); 
})(jQuery)