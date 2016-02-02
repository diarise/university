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
    var displayModeFlag = true;
    var currentListView = []; 
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
              
                $.each(data, function(headObj, headObjCont){
                   
                        //var newHeadObj = headObj.replace(/\s+/g, "-");      // remove the "whit space" and "$" in Json         
                        var newHeadObj = headObj.replace(/\W/g, " ").replace(/\s+/g, "-");      // remove the "whit space" and "$" in Json
                        
                  var listCont = headObjCont.term_articles;
                  var termName = headObjCont.term_name;
                  var titleSpan = "";
                      
                  if(termName === "Beginner's Courses") {
                      titleSpan = "<div class = 'parent_topic'>" 
                                      + "<a href = /" + newHeadObj + ">"
                                      + headObj
                                      + "</a>"
                                      + "<span class = 'viewAll'>"
                                      + "<a href = /" + newHeadObj + ">"
                                      + "see all"
                                      + "</a>"
                                      + "</span>"
                                  + "</div>"
                  } else {
                      titleSpan = "<div class = 'parent_topic'>" 
                                      + "<a href = " + '/primary-topics'+ '/' + newHeadObj + ">"
                                      + headObj
                                      + "</a>"
                                      + "<span class = 'viewAll'>"
                                      + "<a href = " + '/primary-topics'+ '/' + newHeadObj + ">"
                                      + "see all"
                                      + "</a>"
                                      + "</span>"
                                  + "</div>"                            
                  }

                  rowContent += "<div class = 'rowStyle'>"
                                  +"<span class='leftArrowStyleHome'></span>"
                                  +"<span class='rightArrowStyleHome'></span>"
                                  + titleSpan
                                  + "<div class= 'descriptionEvents'>"
                                      + headObjCont.term_desc 
                                  + "</div>" 
                                  + "<div class = 'slideWrapper'>"                                      
                                  + "<ul class = 'ulStyle'>";

                  $.each(listCont, function(index, value){      // add all images of each row
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
                                                  + "<span>Teacher: </span>"
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
      
            })();
        },  // end of success function           
        complete: function(){  

          // style the slide show.
          (function(){     
              $(".eachCont").css({
                      "width": imageSizeWidth,
                      "display": "inline-block",
                      "float": "left",
                      "margin-right": marginRight,
                      "margin-left":marginLeft,
                      "margin-bottom": 16,                                
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

              $(".leftArrowStyleHome").css({
                      "float": "left",
                      "position": "absolute",
                      "margin-top": 145,
                      "left": 0,
                      "cursor": "pointer",
                      "z-index": 10,
                      "visibility": visOpt 
                  });

               $(".rightArrowStyleHome").css({
                      "position": "absolute",
                      "margin-top": 145,
                      "right": 0,
                      "cursor": "pointer",
                      "z-index": 10,
                      "visibility": "visible"
                  });

               $(".theDescCont").css ({
                      "width": imageSizeWidth,
                      "height": 180,
                  });
               $(".descriptionEvents").css({
                  "margin": "0 auto"
               });
          })();

          // list display
          $("#list").bind("click", function(){
              if(displayModeFlag){
                  return false;
              } else {
                  $.each($(".slideWrapper"), function(i){
                      var ulWidth = getImageWidth*($(this).children("ul").children("li").length);
                      $(this).children("ul").children("li").show();
                      $(this).children("ul").css({
                          "width": ulWidth,
                          "left": currentListView[i]
                      })
                  });

                  $(".eachCont").css({
                      "float":"left"
                  });

                  $(".slideWrapper").css({
                      "overflow": scrollMode,
                      "-webkit-overflow-scrolling": "touch",
                  });

                  $(".leftArrowStyleHome").css({
                          "visibility": visOpt 
                  });

                   $(".rightArrowStyleHome").css({
                          "visibility": "visible" 
                  });
                  displayModeFlag = true;
                  currentListView = [];                        
              } 
             
          });

          // grid display
          $("#grid").bind("click", function(){
              if(displayModeFlag){
                  $.each($(".slideWrapper"), function(){
                      var theItems = $(this).children("ul").children("li");
                      var itemNums = theItems.length;
                      var leftDistance = $(this).children("ul").css("left");
                      currentListView.push(leftDistance);
                      console.log(currentListView);
                      if(itemNums > 10){
                          theItems.eq(9).nextAll().hide();
                      }
                  });

                  $(".eachCont").css({
                      "float":"none",
                      "vertical-align": "top"
                  });
                  $(".ulStyle").css({
                      "width":"100%",
                      "left": 0
                  });
                  $(".slideWrapper").css({
                      "overflow": "none",
                      "-webkit-overflow-scrolling": "touch",
                  });
                  $(".leftArrowStyleHome").css({
                          "visibility": "hidden" 
                  });
                   $(".rightArrowStyleHome").css({
                          "visibility": "hidden" 
                  });
                  displayModeFlag = false;
              } else {
                  return false;
              }

          });

          // check window size
          checkWindowStatus();

          // bind window resize function
          $(window).resize(function() {       // the number of images changes while the window is resizing
              var num = 0;
              
              if ($(window).width() >= 1620) { 
                  num = imageNum;    
                  getContWidth = (imageSizeWidth + marginLeft + marginRight)*num; 
                  $(".slideWrapper, .parent_topic, .descriptionEvents, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
              }
              else if ($(window).width() < 1620 && $(window).width() >= 1620 - (imageSizeWidth + marginLeft + marginRight)) {
                  num = imageNum - 1;
                  getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                  $(".slideWrapper, .parent_topic, .descriptionEvents, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
              }
              else if ($(window).width() < 1620- (imageSizeWidth + marginLeft + marginRight) && $(window).width() >= 1620- (imageSizeWidth + marginLeft + marginRight)*2) {
                   num = imageNum - 2;  
                  getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                  $(".slideWrapper, .parent_topic, .descriptionEvents, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
              }
              else if ($(window).width() < 1620- (imageSizeWidth + marginLeft + marginRight)*2 && $(window).width() >= 980) {
                  num = 3;
                  getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                  $(".slideWrapper, .parent_topic, .descriptionEvents, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
              }
              else {
                  num = 3;
                  getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                  $(".slideWrapper, .parent_topic, .descriptionEvents, #teachingsControlSection, #teachingsSectionHeaderBar").css("margin", "0 auto");
              }
              reziseRightArrow(); 
          });

          slideStart();

        }
    }); // end of ajax

    function checkWindowStatus(){        
        var num = 0;
        var window_width = $(window).width();

        if ( window_width >= 1620) {
            num = imageNum;
            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;  
            $(".slideWrapper, .parent_topic, .descriptionEvents, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
        }
        else if (window_width < 1620 && window_width >= 1620 - (imageSizeWidth + marginLeft + marginRight)) {
            num = imageNum - 1;
            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
            $(".slideWrapper, .parent_topic, .descriptionEvents, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
        }
        else if (window_width < 1620- (imageSizeWidth + marginLeft + marginRight) && window_width >= 1620- (imageSizeWidth + marginLeft + marginRight)*2) {
            num = imageNum - 2; 
            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
            $(".slideWrapper, .parent_topic, .descriptionEvents, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
        }
        else if (window_width < 1620- (imageSizeWidth + marginLeft + marginRight)*2 && window_width >= 980) {
            num = 3;
            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
            $(".slideWrapper, .parent_topic, .descriptionEvents, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
        }
    };

    // the right arrow will hide or show depending on if there still has images left
    function reziseRightArrow (){         
      $.each($(".rightArrowStyleHome"), function(i){
          $(this).parent().show();
          var getTotalWidth = getImageWidth * ($(this).parent().find("ul").find("li:visible").length);

          if(getTotalWidth - getContWidth -getLeftWidth[i] > 0) {     //show or hide the right arrow when resize the window
              $(this).show();
          }                                
          else {
              $(this).hide();
          }                               
      });
    };  

    // bind arrow functions
    function slideStart(){       
        var getLeftArrows = $(".leftArrowStyleHome");
        var getRightArrows = $(".rightArrowStyleHome");

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
                $(".leftArrowStyleHome").css("display", "none"); // hide all
            }

            $(this).click(function() {

                $(this).unbind();

                checkWindowStatus();

                $(this).prev().fadeIn(1500);

                if (getTotalWidth - getContWidth - getLeftWidth[i] >= getImageWidth) {


                    getLeftWidth[i] += getContWidth;
                    getRightWidth[i] -= getContWidth;

                    $(this).parent().find("ul").animate({
                        left: "-=" + getContWidth + "px",                                 
                    }, 500, 
                    (function(callee) {
                        return function() {
                            $(this).parent().parent().find(".rightArrowStyleHome").click(callee);
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

                $(this).next().fadeIn(350);

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
                            $(this).parent().parent().find('.leftArrowStyleHome').click(callee);
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
            json_URL: "/k_api/rest/v__1/crs",
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
                    $(this).find(".rightArrowStyleHome").css({
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
        var topic_name = $("#teachings_topicDD option:selected").text().replace(/\W/g, " ").replace(/\s+/g, "-");
        //var topic_name = $("#teachings_topicDD option:selected").text().replace(/\s+/g, "-");
        //var newHeadObj = headObj.replace(/\W/g, " ").replace(/\s+/g, "-");      // remove the "whit space" and "$" in Json
        
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

})(jQuery)