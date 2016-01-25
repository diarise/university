(function($){

var Slide = function(elem, options){
    var jsonLink = options.json_URL;    // get json data from the link
    var rowContent = "";      // add slide content to each data array from json 
    var getContWidth = 0;     // resizeable sliding width, this one will change with window changes 
    var getImageWidth = 0;      // for each image width in the slide
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
    var getLeftWidth = [];
    var getRightWidth = [];

    if("ontouchstart" in document.documentElement){
        scrollMode = "scroll";
        visOpt = "hidden";
    }      

    elem.html('<div class = "imageslide" ><div class = "carousel" ><div id="loading" style ="text-align: center; padding-top: 100px"><img src = "/sites/all/modules/kabbalah_custom_slideshow/img/clocker.gif"></img></div></div></div>');       // give the basic structure to each slide 

    $.ajax({
        url: jsonLink,
        type: "GET",
        dataType: 'json',
        cache: false,
        success: function(data){   

            (function(){ 

                var setSlideContent = $("#"+ elem[0].id + " " + ".imageslide .carousel");
              
                $.each(data, function(name, content_detail){

                    var _trimName = name.replace(/\s+/g, "-");      // remove the "whit space" and "$" in Json 

                    rowContent += "<div class = 'rowStyle'>"          
                                    + "<span class='leftArrowStyle'></span>"
                                    + "<span class='rightArrowStyle'></span>"
                                    + "<div class = 'parent_topic'>" 
                                        + "<span class = 'authors_name'>"
                                        + name
                                        + "</span>"
                                        + "<span class = 'viewAll'>"
                                        + "<a href = " + '/course-language'+ '/' + _trimName + ">"
                                        + "see all"
                                        + "</a>"
                                        + "</span>"
                                    + "</div>" 
                                    + "<div class = 'slideWrapper'>"                                      
                                    + "<ul class = 'ulStyle'>";

                    $.each(content_detail.term_articles, function(index, value){      // add all images of each row
                        rowContent += "<li class = 'eachCont'>"
                                        + "<span class = 'lessonBlockWrapper'>"
                                            + "<a href =" + value.path + ">"
                                                + "<span class='lessonBlockImage'>"
                                                    + "<span class='lessonBlockImageHover'></span>"
                                                    + "<img src = " + value.image_link + " class = 'imageCover' />"
                                                + "</span>"
                                                + "<span class='lessonBlockTitle'>"
                                                    + value.title
                                                + "</span>"
                                                + "<span class='lessonBlockTeacherInfo'>"
                                                    
                                                    + "<span>"
                                                    + value.author
                                                    + "</span>"
                                                + "</span>"
                                                + "<span class='lessonBlockDetail'>"
                                                    + "<span class= '" + value.membership +"'></span>"
                                                    + "<span class= '" + value.media_type +"'></span>"
                                                    + "<span class='lessonBlockInfo'>"
                                                    + value.date_created
                                                    + "</span>"
                                                + "</span>"
                                            + "</a>"
                                        + "</span>" 
                                    + "</li>";

                    });

                    rowContent += "</ul></div></div>" ;

                });

                setSlideContent.html(rowContent);

            })()
                       
        },  // end of success function
        complete: function (){

             // 1. style the slide show.
            (function(){     
                $(".eachCont").css({
                        "width": imageSizeWidth,
                        //"height": imageSizeHeight,
                        "display": "inline-block",
                        "float": "left",
                        "margin-left": marginLeft,
                        "margin-right": marginRight,
                        "margin-bottom":16,
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
                        "margin-top": 145,
                        "left": 0,
                        "cursor": "pointer",
                        "z-index": 10,
                        "visibility": visOpt 
                    });

                $(".rightArrowStyle").css({
                        "position": "absolute",
                        "margin-top": 145,
                        "right": 0,
                        "cursor": "pointer",
                        "z-index": 10
                    });
            })()

            // 2. bind window resize event
            $(window).resize(function() {       // the number of images changes while the window is resizing
                var num = 0;
                var window_width = $(window).width();

                if (window_width >= 1580) { 
                    num = imageNum;    
                    getContWidth = (imageSizeWidth + marginLeft + marginRight)*num; 
                    $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                }
                else if (window_width < 1580 && window_width >= 1580 - (imageSizeWidth + marginLeft + marginRight)) {
                    num = imageNum - 1;
                    getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                    $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                }
                else if (window_width < 1580- (imageSizeWidth + marginLeft + marginRight) && window_width >= 1580- (imageSizeWidth + marginLeft + marginRight)*2) {
                     num = imageNum - 2;  
                    getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                    $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                }
                else if (window_width < 1580- (imageSizeWidth + marginLeft + marginRight)*2 && window_width >= 980) {
                    num = 3;
                    getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                    $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                }
                else {
                    num = 3;
                    getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                    $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("margin", "0 auto");
                }
                reziseRightArrow(); 
            });

            // 3. checking window size
            checkWindowStatus();

            // 4. apply slideshow;
            slideStart();

        }         
    }); // end of ajax

    // the right arrow will hide or show depending on if there still has images left
    function reziseRightArrow (){         
      $.each($(".rightArrowStyle"), function(i){
          $(this).parent().show();
          var getTotalWidth = getImageWidth * ($(this).parent().find("ul").find("li:visible").length);

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

    // give the default width of slideshow depending on window size
    function checkWindowStatus(){        
        var num = 0;
        var window_width = $(window).width();

        if ( window_width >= 1580) {
            num = imageNum;
            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;  
            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
        }
        else if (window_width < 1580 && window_width >= 1580 - (imageSizeWidth + marginLeft + marginRight)) {
            num = imageNum - 1;
            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
        }
        else if (window_width < 1580- (imageSizeWidth + marginLeft + marginRight) && window_width >= 1580- (imageSizeWidth + marginLeft + marginRight)*2) {
            num = imageNum - 2; 
            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
        }
        else if (window_width < 1580- (imageSizeWidth + marginLeft + marginRight)*2 && window_width >= 980) {
            num = 3;
            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
        }
    };

    // bind arrow functions
    function slideStart(){       
        var getLeftArrows = $(".leftArrowStyle");
        var getRightArrows = $(".rightArrowStyle");

        getImageWidth = imageSizeWidth + marginLeft + marginRight;  

        $.each(getRightArrows, function(i){     //right arrow

            var getTotalWidth = getImageWidth * ($(this).parent().find("ul").find("li:visible").length);

            $(this).parent().find("ul").css("width", +getTotalWidth+ "px"); 

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
                $(".leftArrowStyle").css("display", "none"); // hide all
            }

            $(this).click(function() {

                $(this).unbind();

                checkWindowStatus();

                $(this).parent().find(".leftArrowStyle").fadeIn(1500);

                if (getTotalWidth - getContWidth - getLeftWidth[i] >= getImageWidth) {


                    getLeftWidth[i] += getContWidth;
                    getRightWidth[i] -= getContWidth;

                    $(this).parent().find("ul").animate({
                        left: "-=" + getContWidth + "px",                                 
                    }, 500, 
                    (function(callee) {
                        return function() {
                            $(this).parent().prev().prev().click(callee);
                        };
                    })(arguments.callee));

                    if (getTotalWidth - getContWidth - getLeftWidth[i] < getImageWidth ) {
                        $(this).fadeOut(350);
                    }
                }                              
            });

        });
                     
        $.each(getLeftArrows, function(i){      //left arrow
           
            $(this).click(function() {

                $(this).unbind();

                $(this).parent().find(".rightArrowStyle").fadeIn(350);

                checkWindowStatus();

                if (getLeftWidth[i] < getContWidth) {
                        getContWidth = getLeftWidth[i];
                    }

                if (getLeftWidth[i] >= getImageWidth) {                                  
                    getLeftWidth[i] -= getContWidth;
                    getRightWidth[i] += getContWidth;

                    $(this).parent().find("ul").animate({
                        left: "+=" + getContWidth + "px",   
                    }, 500,  
                    (function(callee) {
                        return function() {
                            $(this).parent().parent().find('.leftArrowStyle').click(callee);
                        };
                    })(arguments.callee));

                    if (getLeftWidth[i] <= getImageWidth) {
                        $(this).fadeOut(350);
                    }

                }
            });     
        });   

    };

}; // end of Slide function

$(document).ready(function(){

    // Creating Carousals
    Slide (
        $("#teachingResultSection"),
        {
            json_URL: "/k_api/rest/v__1/lngs",
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
        var topic_name = $("#teachings_topicDD option:selected").text().replace(/\W/g, " ").replace(/\s+/g, "-");

        window.open('/primary-topics/'+topic_name,'_self',false);
            
    });

    $('#teachings_teachersDD').change(function() {     // dropdown 
                                
        var cat = $("#teachings_teachersDD").val();
        var cat_id = cat.replace('cat', '');
        var author_name = $("#teachings_teachersDD option:selected").text().replace(' ','-');

        window.open('/authors/'+author_name,'_self',false);
            
    }); 
    
    
    
})

})(jQuery)