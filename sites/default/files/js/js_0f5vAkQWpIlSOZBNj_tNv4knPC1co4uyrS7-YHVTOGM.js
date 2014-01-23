(function($){
var SlideShow = function(elem, options){
    var createSlide = new Slide(elem, options);
    createSlide.render();
};

var Slide = function(elem, options){
    this.render = function(){
        var jsonLink = options.json_URL;    // get json data from the link
        var globalData = [];      // json data array
        var rowContent = "";      // add slide content to each data array from json 
        var getContWidth = 0;     // resizeable sliding width, this one will change with window changes 
        var getImageWidth = 0;      // for each image width in the slide
        var arrowNum = 1;           // give both arrows an order in each slide.
        var imageSizeWidth = options.imageWidth;        // give the image width
        var imageSizeHeight = options.imageHeight;      // give the image height
        var getTotalWidth = 0;      // total widht of each slide of all images
        var imageNum = options.imageNumbers;       // number of images shows in a row, is should be greater than 3
        var marginLeft = options.marginToLeft;      // give the margin-left to each images
        var marginRight = options.marginToRight;    // give the margin-right to each images
        var titleHeight = 0;
        var topicHeight = 0;
        var scrollMode = "hidden";
        var visOpt = "visible";
        var displayModeFlag = true; 
        if("ontouchstart" in document.documentElement){
            scrollMode = "scroll";
            visOpt = "hidden";
        }      

        elem.html('<div class = "imageslide" ><div class = "carousel" ></div></div>');       // give the basic structure to each slide 

        $.ajax({
            url: jsonLink,
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function(data){
                globalData = data;
                                     
                startPoint = function(){                    
                    var setSlideContent = $("#"+ elem[0].id + " " + ".imageslide .carousel");
                  
                    $.each(globalData,function(headObj, headObjCont){
						//var newHeadObj = headObj.replace(/\W/g, " ").replace(/\s+/g, "-");      // remove the "whit space" and "$" in Json         
                        var newHeadObj = headObj.replace(/\s+/g, "-");      // remove the "whit space" and "$" in Json         
						var setCont = $("#" + headObj[0]+ headObj[1] + headObj[2]);
                        rowContent += "<div id = " + headObj[0]+ headObj[1] + headObj[2] + " class = 'rowStyle'" + ">"          
                                        + "<img id= " + 'leftArrow' + arrowNum + " class='leftArrowStyle' src='/sites/all/modules/ukabbalah_topics/images/arrow-left.png'/>"
                                        + "<div class = 'parent_topic'>" 
                                            + "<a href = " + '/primary-topics'+ '/' + newHeadObj + ">"
                                            + headObj
                                            + "</a>"
                                            + "<span class = 'viewAll'>"
                                            + "<a href = " + '/primary-topics'+ '/' + newHeadObj + ">"
                                            + "see all"
                                            + "</a>"
                                            + "</span>"
                                        + "</div>"
                                        + "<div class= 'descriptionEvents'>"
                                        + "</div>" 
                                        + "<div class = 'slideWrapper'>"                                      
                                        + "<ul class = 'ulStyle'>";

                        $.each(headObjCont, function(index, value){      // add all images of each row
                            rowContent += "<li class = " + '"' + "eachCont" + " " + value.node_type + '"' + ">"
                                            + "<div class = 'imagesCont'>"
                                                    + "<a href =" + value.path + ">" 
                                                        + "<img src = " + value.image_link + " class = 'imageStyle'>"
                                                    
                                                + "<div class ='descCont'>"
                                                    + "<div class='titleWrapper'>"
                                                        + "<div class='articleImg'>"
                                                        + "</div>"

                                                        + "<div class = 'jsonTitle'>"
                                                            + "<a href =" + value.path + ">" 
                                                                + value.title
                                                            + "</a>"
                                                        + "</div>" 
                                                    + "</div>"

                                                    + "<div class='teachingsTopicAndDate'>"
                                                        + value.author
                                                        + " | "
                                                        + value.date_created

                                                    + "</div>"

                                                    + "<div class='teaser'>"
                                                        + "<p>" +value.teaser + "</p>"
                                                        + "<span class = 'teachersPath'>"
                                                            + "<a href =" + value.path + ">"
                                                                + "read more" 
                                                            + "</a>"
                                                        + "</span>"
                                                    + "</div>"
                                                + "</div>"
                                            + "</div>" 
                                            + "</a>"  
                                        + "</li>";

                        });
                        rowContent += "</ul>" + "</div>"+ "<img id= " + 'rightArrow' + arrowNum + " class='rightArrowStyle' src='/sites/all/modules/ukabbalah_topics/images/arrow-right.png'/>"  + "</div>" ;
                        arrowNum ++;
                    });
                    setSlideContent.html(rowContent);

                    $.each($(".eachCont"), function(){
                        titleHeight = $(this).find(".jsonTitle").outerHeight();
                        topicHeight = $(this).find(".teachingsTopicAndDate").outerHeight();
                    
                        $(this).find(".imagesCont").children(".descCont").css ({
                            "margin-top": -(titleHeight + topicHeight + 19),
                        });                                

                        $(this).find(".imagesCont").hover(         //hove effect of the each image                                                
                            function () {
                                titleHeight = $(this).find(".jsonTitle").outerHeight();
                                topicHeight = $(this).find(".teachingsTopicAndDate").outerHeight();

                                $(this).children(".descCont").stop().animate({ 
                                    marginTop: -180,
                                    paddingTop:20,
                                }, 350);

                            },

                            function () {
                                titleHeight = $(this).find(".jsonTitle").outerHeight();
                                topicHeight = $(this).find(".teachingsTopicAndDate").outerHeight();
                                
                                $(this).children(".descCont").stop().animate({ 
                                    marginTop: -(titleHeight + topicHeight + 19),
                                    paddingTop:0,
                                }, 350);    
                            }
                        );

                    });
                }
                startPoint();
            },  // end of success function           
            complete: function(){  
                $("#list").bind("click", function(){
                    if(displayModeFlag){
                        return false;
                    } else {
                        $.each($(".slideWrapper"), function(){
                        var ulWidth = getImageWidth*($(this).children("ul").children("li").length);
                        $(this).children("ul").css({
                            "width": ulWidth
                            })
                        });

                        $(".eachCont").css({
                            "float":"left"
                        });

                        $(".slideWrapper").css({
                            "overflow": scrollMode,
                            "-webkit-overflow-scrolling": "touch",
                        });

                        $(".leftArrowStyle").css({
                                "visibility": visOpt 
                        });

                         $(".rightArrowStyle").css({
                                "visibility": "visible" 
                        });
                        displayModeFlag = true;
                    } 
                   
                });
                $("#grid").bind("click", function(){
                    if(displayModeFlag){
                        $.each($(".slideWrapper"), function(){
                            var theItems = $(this).children("ul").children("li");
                            var itemNums = theItems.length;
                            if(itemNums > 10){
                                theItems.eq(9).nextAll().hide();
                            }
                        });

                        $(".eachCont").css({
                            "float":"none"
                        });
                        $(".ulStyle").css({
                            "width":"100%",
                        });
                        $(".slideWrapper").css({
                            "overflow": "none",
                            "-webkit-overflow-scrolling": "touch",
                        });
                        $(".leftArrowStyle").css({
                                "visibility": "hidden" 
                        });
                         $(".rightArrowStyle").css({
                                "visibility": "hidden" 
                        });
                        displayModeFlag = false;
                    } else {
                        return false;
                    }

                });

                var displayAsList = function(){
                    addStyle = function(){      // style the slide show.
                        $(".imageStyle").css({
                                "width": imageSizeWidth,
                                "height": imageSizeHeight
                            });

                        $(".eachCont").css({
                                "width": imageSizeWidth,
                                "height": imageSizeHeight,
                                "display": "inline-block",
                                "float": "left",
                                "margin-right": marginRight,
                                "margin-left":marginLeft,
                                "margin-bottom": 20,                                
                                "overflow": "hidden"
                            });

                        $(".ulStyle").css({
                            "position": "relative",
                        });

                        $(".slideWrapper").css({
                                "overflow": scrollMode,
                                "-webkit-overflow-scrolling": "touch",
                                "margin-bottom": 20,
                                "margin-left": "auto",
                                "margin-right": "auto",
                            });

                        $(".leftArrowStyle").css({
                                "float": "left",
                                "position": "absolute",
                                "margin-top": 124,
                                "left": 0,
                                "cursor": "pointer",
                                "opacity": 0.5,
                                "z-index": 10,
                                "visibility": visOpt 
                            });

                         $(".rightArrowStyle").css({
                                "float": "right",
                                "position": "relative",
                                "margin-top": -160,
                                "right": 0,
                                "cursor": "pointer",
                                "opacity": 0.5,
                                "z-index": 10,
                                "visibility": "visible"
                            });

                         $(".descCont").css ({
                                "width": imageSizeWidth,
                                "height": 180,
                            });
                         $(".descriptionEvents").css({
                            "margin": "0 auto"
                         });
                    };
                    addStyle();

                    windowLoad = function(){        // give the default width of slideshow once window is loaded
                       var num = 0;

                        if ($(window).width() >= 1580) {
                            num = imageNum;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;  
                            $(".slideWrapper, .parent_topic, .descriptionEvents").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580 && $(window).width() >= 1580 - (imageSizeWidth + marginLeft + marginRight)) {
                            num = imageNum - 1;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, .descriptionEvents").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580- (imageSizeWidth + marginLeft + marginRight) && $(window).width() >= 1580- (imageSizeWidth + marginLeft + marginRight)*2) {
                            num = imageNum - 2; 
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, .descriptionEvents").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580- (imageSizeWidth + marginLeft + marginRight)*2 && $(window).width() >= 980) {
                            num = 3;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, .descriptionEvents").css("width", getContWidth);
                        }
                    };
                    windowLoad();

                    $(window).resize(function() {       // the number of images changes while the window is resizing
                        var num = 0;
                        
                        if ($(window).width() >= 1580) { 
                            num = imageNum;    
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num; 
                            $(".slideWrapper, .parent_topic, .descriptionEvents").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580 && $(window).width() >= 1580 - (imageSizeWidth + marginLeft + marginRight)) {
                            num = imageNum - 1;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, .descriptionEvents").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580- (imageSizeWidth + marginLeft + marginRight) && $(window).width() >= 1580- (imageSizeWidth + marginLeft + marginRight)*2) {
                             num = imageNum - 2;  
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, .descriptionEvents").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580- (imageSizeWidth + marginLeft + marginRight)*2 && $(window).width() >= 980) {
                            num = 3;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, .descriptionEvents").css("width", getContWidth);
                        }
                        else {
                            num = 3;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, .descriptionEvents").css("margin", "0 auto");
                        }
                        reziseRightArrow(); 
                    });

                    slideStart = function(btnPara){        //function of two arrows and slideshow
                        getLeftArrows = $(".leftArrowStyle");
                        getRightArrows = $(".rightArrowStyle");
                        getImageWidth = imageSizeWidth + marginLeft + marginRight;
                        var getLeftWidth = [];
                        var getRightWidth = [];

                        reziseRightArrow = function(){          // the right arrow will hide or show depending on if there still has images
                                                            // including validation functionality of filter button "video" and "articles" 
                            $.each(getRightArrows, function(i){
                                $(this).parent().show();
                                var getTotalWidth = getImageWidth * ($(this).prev().find("ul").children("li:visible").length);

                                if (getTotalWidth !== 0){       // if the content of this filter is empty, then hide whole category
                                    $(this).parent().show();
                                }
                                else {
                                    $(this).parent().hide();
                                }

                                if(getTotalWidth - getContWidth -getLeftWidth[i] > 0) {     //show or hide the right arrow when resize the window
                                    $(this).show();
                                }                                
                                else {
                                    $(this).hide();
                                }                               
                            });
                        };  

                        $.each(getRightArrows, function(i){     //right arrow

                            var getTotalWidth = getImageWidth * ($(this).prev().find("ul").children("li:visible").length);
                            $(this).prev().find("ul").css("width", +getTotalWidth+ "px"); 
                            getLeftWidth[i] = 0;

                            if (getTotalWidth <= getContWidth){
                                getRightWidth[i] = 0;
                            }
                            else {
                                getRightWidth[i] = getTotalWidth - getContWidth;
                            }

                            if(getLeftWidth[i] + getContWidth >= getTotalWidth) {
                                $(this).hide();
                            }
                            if (getLeftWidth[i] <= 0) {
                                $(".leftArrowStyle").css("display", "none");
                            }

                            $(this).click(function() {
                                
                                windowLoad();
                                
                                if (getTotalWidth-getContWidth - getLeftWidth[i] >= getImageWidth) {
                                    $(this).parent().find(".leftArrowStyle").fadeIn(1500);
                                    getLeftWidth[i] += getContWidth;
                                    getRightWidth[i] -= getContWidth;
                                    $(this).unbind();
                                    $(this).prev().find("ul").animate({
                                        left: "-=" + getContWidth + "px",                                 
                                    }, 500, 
                                    (function(callee) {

                                        return function() {
                                            $(this).parent().next().click(callee);
                                        };
                                    })(arguments.callee));
                                    if (getTotalWidth - getContWidth - getLeftWidth[i] < getImageWidth ) {
                                        $(this).fadeOut(350);
                                    }
                                }                              
                            });

                        });
                                 
                        $.each(getLeftArrows, function(i){      //left arrow
                           
                            reziseRightArrow();
                            $(this).click(function() {
                                windowLoad();

                                if (getLeftWidth[i] < getContWidth) {
                                        getContWidth = getLeftWidth[i];
                                    }

                                if (getLeftWidth[i] >= getImageWidth) {                                  
                                    getLeftWidth[i] -= getContWidth;
                                    getRightWidth[i] += getContWidth;
                                    $(this).unbind();
                                    $(this).parent().find("ul").animate({
                                        left: "+=" + getContWidth + "px",   
                                    }, 500,  
                                    (function(callee) {
                                        return function() {
                                            $(this).parent().parent().find(".leftArrowStyle").click(callee);
                                        };
                                    })(arguments.callee));

                                    if (getLeftWidth[i] <= getImageWidth) {
                                        $(this).fadeOut(350);
                                    }
                                    if(getRightWidth[i] > 0){
                                        $(this).parent().find(".rightArrowStyle").fadeIn(350);
                                    }
                                }
                            });     
                        });       
                    };// end of arrow click function
                    slideStart();
                }
                displayAsList();  
            }
        }); // end of ajax

        /* Adding Click events for Filter */             
            $("#allBtn").click(function() {
                $("#articlesBtn, #videoBtn").css("color", "#999999");
                $(this).css("color", "#D50524");
                $(".video").css("display", "inline-block");
                $(".article").css("display", "inline-block");
                reziseRightArrow();                         
            });

            $("#articlesBtn").click(function() {
                $("#allBtn, #videoBtn").css("color", "#999999");
                $(this).css("color", "#D50524");
                $(".video").css("display", "none");
                $(".article").css("display", "inline-block");
                reziseRightArrow(); 
             
            });
            
            
            $("#videoBtn").click(function() {
                $("#articlesBtn, #allBtn").css("color", "#999999");
                $(this).css("color", "#D50524");
                $(".article").css("display", "none");
                $(".video").css("display", "inline-block");
               reziseRightArrow(); 
                                    
            });                                
        /* End of Click events */  

        $(".familyWrapper").hover(      // hove effect for family pics, only used for page with family pics
            function () {
                $(this).children(".familyTextWrapper").stop().animate({
                    marginTop: "-220px",
                }, 220);

                $(this).children(".views-row-1 .familyTextWrapper, .views-row-2 .familyTextWrapper").stop().animate({
                    marginTop: "-350px",
                }, 220);

            },

            function () {
                $(this).children(".familyTextWrapper").stop().animate({
                    marginTop: -imageSizeHeight/6, 
                }, 220);

            }
        ); // end of hover
    }; //end of render function
}; // end of Slide function

$(document).ready(function(){

    // Creating Carousals
    SlideShow (
        $("#teachingResultSection"),
        {
            json_URL: "/k_api/tps",
            imageWidth: 300,
            imageHeight: 170,
            marginToLeft: 10,
            marginToRight: 10,
            imageNumbers: 5
        });

    window.onload = function() {
        if("ontouchstart" in document.documentElement){
            var div = document.getElementsByClassName("rowStyle");
            $.each(div, function(i){
                div[i].ontouchstart = function(){
                    $(this).find(".rightArrowStyle").css({
                        "visibility": "hidden",
                    });
                };
            });       
        }
    };

    $('#teachings_topicDD').change(function() {     // dropdown 
                                
        var cat = $("#teachings_topicDD").val();
        var cat_id = cat.replace('cat', '');
        //var url = "http://livingwisdom.kabbalah.com";
        //var topic_name = $("#teachings_topicDD option:selected").text().replace(/\W/g, " ").replace(/\s+/g, "-");
		var topic_name = $("#teachings_topicDD option:selected").text().replace(/\s+/g, "-");
		//$(this).target = "_self";
        //window.open(url+'/taxonomy/term/'+cat_id,'_self',false);
		window.open('/primary-topics/'+topic_name,'_self',false);
            
    });

	$('#teachings_teachersDD').change(function() {     // dropdown 
                                
        var cat = $("#teachings_teachersDD").val();
        var cat_id = cat.replace('cat', '');
		var author_name = $("#teachings_teachersDD option:selected").text().replace(' ','-');
	   //$(this).target = "_self";
        window.open('/authors/'+author_name,'_self',false);
            
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
