(function ($) {

/**
 * Terminology:
 *
 *   "Link" means "Everything which is in flag.tpl.php" --and this may contain
 *   much more than the <A> element. On the other hand, when we speak
 *   specifically of the <A> element, we say "element" or "the <A> element".
 */

/**
 * The main behavior to perform AJAX toggling of links.
 */
Drupal.flagLink = function(context) {
  /**
   * Helper function. Updates a link's HTML with a new one.
   *
   * @param element
   *   The <A> element.
   * @return
   *   The new link.
   */
  function updateLink(element, newHtml) {
    var $newLink = $(newHtml);

    // Initially hide the message so we can fade it in.
    $('.flag-message', $newLink).css('display', 'none');

    // Reattach the behavior to the new <A> element. This element
    // is either whithin the wrapper or it is the outer element itself.
    var $nucleus = $newLink.is('a') ? $newLink : $('a.flag', $newLink);
    $nucleus.addClass('flag-processed').click(flagClick);

    // Find the wrapper of the old link.
    var $wrapper = $(element).parents('.flag-wrapper:first');
    // Replace the old link with the new one.
    $wrapper.after($newLink).remove();
    Drupal.attachBehaviors($newLink.get(0));

    $('.flag-message', $newLink).fadeIn();
    setTimeout(function(){ $('.flag-message.flag-auto-remove', $newLink).fadeOut() }, 3000);
    return $newLink.get(0);
  }

  /**
   * A click handler that is attached to all <A class="flag"> elements.
   */
  function flagClick(event) {
    // Prevent the default browser click handler
    event.preventDefault();

    // 'this' won't point to the element when it's inside the ajax closures,
    // so we reference it using a variable.
    var element = this;

    // While waiting for a server response, the wrapper will have a
    // 'flag-waiting' class. Themers are thus able to style the link
    // differently, e.g., by displaying a throbber.
    var $wrapper = $(element).parents('.flag-wrapper');
    if ($wrapper.is('.flag-waiting')) {
      // Guard against double-clicks.
      return false;
    }
    $wrapper.addClass('flag-waiting');

    // Hide any other active messages.
    $('span.flag-message:visible').fadeOut();

    // Send POST request
    $.ajax({
      type: 'POST',
      url: element.href,
      data: { js: true },
      dataType: 'json',
      success: function (data) {
        data.link = $wrapper.get(0);
        $.event.trigger('flagGlobalBeforeLinkUpdate', [data]);
        if (!data.preventDefault) { // A handler may cancel updating the link.
          data.link = updateLink(element, data.newLink);
        }

        // Find all the link wrappers on the page for this flag, but exclude
        // the triggering element because Flag's own javascript updates it.
        var $wrappers = $('.flag-wrapper.flag-' + data.flagName.flagNameToCSS() + '-' + data.contentId).not(data.link);
        var $newLink = $(data.newLink);

        // Hide message, because we want the message to be shown on the triggering element alone.
        $('.flag-message', $newLink).hide();

        // Finally, update the page.
        $wrappers = $newLink.replaceAll($wrappers);
        Drupal.attachBehaviors($wrappers.parent());

        $.event.trigger('flagGlobalAfterLinkUpdate', [data]);
      },
      error: function (xmlhttp) {
        alert('An HTTP error '+ xmlhttp.status +' occurred.\n'+ element.href);
        $wrapper.removeClass('flag-waiting');
      }
    });
  }

  $('a.flag-link-toggle:not(.flag-processed)', context).addClass('flag-processed').click(flagClick);
};

/**
 * Prevent anonymous flagging unless the user has JavaScript enabled.
 */
Drupal.flagAnonymousLinks = function(context) {
  $('a.flag:not(.flag-anonymous-processed)', context).each(function() {
    this.href += (this.href.match(/\?/) ? '&' : '?') + 'has_js=1';
    $(this).addClass('flag-anonymous-processed');
  });
}

String.prototype.flagNameToCSS = function() {
  return this.replace(/_/g, '-');
}

/**
 * A behavior specifically for anonymous users. Update links to the proper state.
 */
Drupal.flagAnonymousLinkTemplates = function(context) {
  // Swap in current links. Cookies are set by PHP's setcookie() upon flagging.

  var templates = Drupal.settings.flag.templates;

  // Build a list of user-flags.
  var userFlags = Drupal.flagCookie('flags');
  if (userFlags) {
    userFlags = userFlags.split('+');
    for (var n in userFlags) {
      var flagInfo = userFlags[n].match(/(\w+)_(\d+)/);
      var flagName = flagInfo[1];
      var contentId = flagInfo[2];
      // User flags always default to off and the JavaScript toggles them on.
      if (templates[flagName + '_' + contentId]) {
        $('.flag-' + flagName.flagNameToCSS() + '-' + contentId, context).after(templates[flagName + '_' + contentId]).remove();
      }
    }
  }

  // Build a list of global flags.
  var globalFlags = document.cookie.match(/flag_global_(\w+)_(\d+)=([01])/g);
  if (globalFlags) {
    for (var n in globalFlags) {
      var flagInfo = globalFlags[n].match(/flag_global_(\w+)_(\d+)=([01])/);
      var flagName = flagInfo[1];
      var contentId = flagInfo[2];
      var flagState = (flagInfo[3] == '1') ? 'flag' : 'unflag';
      // Global flags are tricky, they may or may not be flagged in the page
      // cache. The template always contains the opposite of the current state.
      // So when checking global flag cookies, we need to make sure that we
      // don't swap out the link when it's already in the correct state.
      if (templates[flagName + '_' + contentId]) {
        $('.flag-' + flagName.flagNameToCSS() + '-' + contentId, context).each(function() {
          if ($(this).find('.' + flagState + '-action').size()) {
            $(this).after(templates[flagName + '_' + contentId]).remove();
          }
        });
      }
    }
  }
}

/**
 * Utility function used to set Flag cookies.
 *
 * Note this is a direct copy of the jQuery cookie library.
 * Written by Klaus Hartl.
 */
Drupal.flagCookie = function(name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    // NOTE Needed to parenthesize options.path and options.domain
    // in the following expressions, otherwise they evaluate to undefined
    // in the packed version for some reason...
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

Drupal.behaviors.flagLink = {};
Drupal.behaviors.flagLink.attach = function(context) {
  // For anonymous users with the page cache enabled, swap out links with their
  // current state for the user.
  if (Drupal.settings.flag && Drupal.settings.flag.templates) {
    Drupal.flagAnonymousLinkTemplates(context);
  }

  // For all anonymous users, require JavaScript for flagging to prevent spiders
  // from flagging things inadvertently.
  if (Drupal.settings.flag && Drupal.settings.flag.anonymous) {
    Drupal.flagAnonymousLinks(context);
  }

  // On load, bind the click behavior for all links on the page.
  Drupal.flagLink(context);
};

})(jQuery);
;
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
						"position" : "absolute",
						"left" : 0,
						"z-index" : 120,
						"cursor" : "pointer",
					});
					$("#goRight").css({
						"margin-top" : 156,
						"margin-right" : 15,
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
					resWidth = (frontWidth - contWidth) / 2;
					$("#frontLeft").css("width", resWidth);
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
})(jQuery);
(function($){
	$.fn.UkabCarousel = function(option){
		var jsonUrl = option.jsonLink;
		var divId = $(this);
		var contsDisplayNum = 3;
		var rowContent = "";

		$.ajax({
			url: jsonUrl,
			type: "GET",
			dataType: "json",
			success: function(data){

				var contsLists = "";
				var theSlideWrapper= "<div class = 'imageslide'><div class = 'rowStyle'><img class='leftArrowStyleHome' src='/sites/all/modules/ukabbalah_fp_carousals/images/arrow-left.png'/><div class = 'slideWrapper'><ul class = 'ulStyle carrouselFix'></ul></div><img class='rightArrowStyleHome' src='/sites/all/modules/ukabbalah_fp_carousals/images/arrow-right.png'/></div></div>";
				divId.html(theSlideWrapper);
				var startDisplay = function(){
                    var setSlideContent = divId.find("ul");
              
                        $.each(data, function(i){      // add all images of each row

                            rowContent += "<li>"
                                            + "<div class = 'contWrapper'>"   
                                                + "<img src = " + data[i].image + " class = 'theImage'>"
                                                + "<a href =" + data[i].path + ">"                       
                                                	+ "<span class ='theDescCont'>"

                                                        + "<span class='theTitle'>"
                                                            + "<span class='vidImg'>"
                                                            + "</span>"
                                                            + "<span class='"+data[i].membership +"'>"
                                                            + "</span>"
                                                            
                                                            + "<span class = 'theJsonTitle'>"
                                                                    + data[i].title
                                                            + "</span>" 
                                                        + "</span>"

                                                        + "<span class='theDate'>"
                                                            + data[i].author
                                                            + " | "
                                                            + data[i].created
                                                        + "</span>"

                                                        + "<span class='theTeaser'>"
                                                            + data[i].teaser 
                                                                + "<span class ='readMore'>"
                                                                    + " read more"
                                                            + "</span>" 
                                                        + "</span>"
                                                    + "</span>"
                                                + "</a>"
                                            + "</div>" 
                                       + "</li>";    
                        });
                        
                    setSlideContent.html(rowContent);
				}
				if(data !== null)
					startDisplay();
			},
			complete: function(){
				var imageWidth = 320;
				var globalImgCount = divId.find("ul").children("li").length;
				var rightImgCount = globalImgCount- contsDisplayNum;
				var leftImgCount = 0;

				divId.find(".leftArrowStyleHome").hide();
				if(rightImgCount <= 0) {
					divId.find(".rightArrowStyleHome").hide()
				} else {
					divId.find(".rightArrowStyleHome").show()
				};

				var styleCarousel = function(){
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
				}
				styleCarousel();

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
       			})
			}
		});
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
	})

})(jQuery);
(function($){
/**
 * To make a form auto submit, all you have to do is 3 things:
 *
 * ctools_add_js('auto-submit');
 *
 * On gadgets you want to auto-submit when changed, add the ctools-auto-submit
 * class. With FAPI, add:
 * @code
 *  '#attributes' => array('class' => array('ctools-auto-submit')),
 * @endcode
 *
 * If you want to have auto-submit for every form element,
 * add the ctools-auto-submit-full-form to the form. With FAPI, add:
 * @code
 *   '#attributes' => array('class' => array('ctools-auto-submit-full-form')),
 * @endcode
 *
 * If you want to exclude a field from the ctool-auto-submit-full-form auto submission,
 * add the class ctools-auto-submit-exclude to the form element. With FAPI, add:
 * @code
 *   '#attributes' => array('class' => array('ctools-auto-submit-exclude')),
 * @endcode
 *
 * Finally, you have to identify which button you want clicked for autosubmit.
 * The behavior of this button will be honored if it's ajaxy or not:
 * @code
 *  '#attributes' => array('class' => array('ctools-use-ajax', 'ctools-auto-submit-click')),
 * @endcode
 *
 * Currently only 'select', 'radio', 'checkbox' and 'textfield' types are supported. We probably
 * could use additional support for HTML5 input types.
 */

Drupal.behaviors.CToolsAutoSubmit = {
  attach: function(context) {
    // 'this' references the form element
    function triggerSubmit (e) {
      var $this = $(this);
      if (!$this.hasClass('ctools-ajaxing')) {
        $this.find('.ctools-auto-submit-click').click();
      }
    }

    // the change event bubbles so we only need to bind it to the outer form
    $('form.ctools-auto-submit-full-form', context)
      .add('.ctools-auto-submit', context)
      .filter('form, select, input:not(:text, :submit)')
      .once('ctools-auto-submit')
      .change(function (e) {
        // don't trigger on text change for full-form
        if ($(e.target).is(':not(:text, :submit, .ctools-auto-submit-exclude)')) {
          triggerSubmit.call(e.target.form);
        }
      });

    // e.keyCode: key
    var discardKeyCode = [
      16, // shift
      17, // ctrl
      18, // alt
      20, // caps lock
      33, // page up
      34, // page down
      35, // end
      36, // home
      37, // left arrow
      38, // up arrow
      39, // right arrow
      40, // down arrow
       9, // tab
      13, // enter
      27  // esc
    ];
    // Don't wait for change event on textfields
    $('.ctools-auto-submit-full-form input:text, input:text.ctools-auto-submit', context)
      .filter(':not(.ctools-auto-submit-exclude)')
      .once('ctools-auto-submit', function () {
        // each textinput element has his own timeout
        var timeoutID = 0;
        $(this)
          .bind('keydown keyup', function (e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID && clearTimeout(timeoutID);
            }
          })
          .keyup(function(e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID = setTimeout($.proxy(triggerSubmit, this.form), 500);
            }
          })
          .bind('change', function (e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID = setTimeout($.proxy(triggerSubmit, this.form), 500);
            }
          });
      });
  }
}
})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row)
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

/**
 * Attaches the AJAX behavior to Views exposed filter forms and key View links.
 */
Drupal.behaviors.ViewsAjaxView = {};
Drupal.behaviors.ViewsAjaxView.attach = function() {
  if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
    $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
      Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
    });
  }
};

Drupal.views = {};
Drupal.views.instances = {};

/**
 * Javascript object for a certain view.
 */
Drupal.views.ajaxView = function(settings) {
  var selector = '.view-dom-id-' + settings.view_dom_id;
  this.$view = $(selector);

  // Retrieve the path to use for views' ajax.
  var ajax_path = Drupal.settings.views.ajax_path;

  // If there are multiple views this might've ended up showing up multiple times.
  if (ajax_path.constructor.toString().indexOf("Array") != -1) {
    ajax_path = ajax_path[0];
  }

  // Check if there are any GET parameters to send to views.
  var queryString = window.location.search || '';
  if (queryString !== '') {
    // Remove the question mark and Drupal path component if any.
    var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
    if (queryString !== '') {
      // If there is a '?' in ajax_path, clean url are on and & should be used to add parameters.
      queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
    }
  }

  this.element_settings = {
    url: ajax_path + queryString,
    submit: settings,
    setClick: true,
    event: 'click',
    selector: selector,
    progress: { type: 'throbber' }
  };

  this.settings = settings;

  // Add the ajax to exposed forms.
  this.$exposed_form = $('form#views-exposed-form-'+ settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
  this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

  // Add the ajax to pagers.
  this.$view
    // Don't attach to nested views. Doing so would attach multiple behaviors
    // to a given element.
    .filter(jQuery.proxy(this.filterNestedViews, this))
    .once(jQuery.proxy(this.attachPagerAjax, this));
};

Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
  var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
  button = button[0];

  this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
};

Drupal.views.ajaxView.prototype.filterNestedViews= function() {
  // If there is at least one parent with a view class, this view
  // is nested (e.g., an attachment). Bail.
  return !this.$view.parents('.view').size();
};

/**
 * Attach the ajax behavior to each link.
 */
Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
  this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
  .each(jQuery.proxy(this.attachPagerLinkAjax, this));
};

/**
 * Attach the ajax behavior to a singe link.
 */
Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
  var $link = $(link);
  var viewData = {};
  var href = $link.attr('href');
  // Construct an object using the settings defaults and then overriding
  // with data specific to the link.
  $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
  );

  // For anchor tags, these will go to the target of the anchor rather
  // than the usual location.
  $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

  this.element_settings.submit = viewData;
  this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
};

Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
  // Scroll to the top of the view. This will allow users
  // to browse newly loaded content after e.g. clicking a pager
  // link.
  var offset = $(response.selector).offset();
  // We can't guarantee that the scrollable object should be
  // the body, as the view could be embedded in something
  // more complex such as a modal popup. Recurse up the DOM
  // and scroll the first element that has a non-zero top.
  var scrollTarget = response.selector;
  while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
    scrollTarget = $(scrollTarget).parent();
  }
  // Only scroll upward
  if (offset.top - 10 < $(scrollTarget).scrollTop()) {
    $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
  }
};

})(jQuery);
;
(function($){

	$(document).ready(function() {
		$("#kcomTestimonialsSlideshow > div:gt(0)").hide();

		setInterval(function() { 
		  $('#kcomTestimonialsSlideshow > div:first')
			.fadeOut(700)
			.next()
			.fadeIn(700)
			.end()
			.appendTo('#kcomTestimonialsSlideshow');
		},  5000);
	});	

})(jQuery);
