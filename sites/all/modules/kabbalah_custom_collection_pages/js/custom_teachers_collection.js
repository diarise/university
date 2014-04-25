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
                globalData = data;
                                     
                startPoint = function(){                    
                    var setSlideContent = $("#"+ elem[0].id + " " + ".imageslide .carousel");
                  
                    $.each(globalData,function(headObj, headObjCont){
                        var newHeadObj = headObj.replace(/\s+/g, "-");      // remove the "whit space" and "$" in Json         
                        var setCont = $("#" + headObj[0]+ headObj[1] + headObj[2]);
                        rowContent += "<div id = " + headObj[0]+ headObj[1] + headObj[2] + " class = 'rowStyle'" + ">"          
                                        + "<img class='leftArrowStyle' src='/sites/all/modules/kabbalah_custom_collection_pages/images/arrow-left.png'/>"
                                        + "<div class = 'parent_topic'>" 
                                            + "<span class = 'authors_name'>"
                                            + headObj
                                            + "</span>"
                                            + "<span class = 'viewAll'>"
                                            + "<a href = " + '/authors'+ '/' + newHeadObj + ">"
                                            + "see all"
                                            + "</a>"
                                            + "</span>"
                                        + "</div>" 
                                        + "<div class = 'slideWrapper'>"                                      
                                        + "<ul class = 'ulStyle'>";

                        $.each(headObjCont, function(index, value){      // add all images of each row
                            rowContent += "<li class = 'eachCont'>"
                                            + "<span class = 'imagesCont'>"
                                                + "<img src = " + value.image_link + " class = 'theImage'>"
                                                + "<a href =" + value.path + ">" 
                                                    + "<span class ='theDescCont'>"
                                                        + "<span class='theTitle'>"
                                                            + "<span class= '" + value.media_type +"'></span>"                                                      
                                                            + "<span class = 'theJsonTitle'>"
                                                                + value.title
                                                            + "</span>" 
                                                        + "</span>"

                                                        + "<span class='teachingsTopicAndDate'>"
                                                            + value.primary_topic
                                                            + " | "
                                                            + value.date_created
															+ "<span class= '" + value.membership +"'></span>"
                                                        + "</span>"														
                                                        + "<span class='theTeaser'>";
														
								if( value.teaser !== null) rowContent += "<p>" +value.teaser + "</p>";						
                                                            
								rowContent  += "<span class = 'readMore'>"
                                                  + "read more" 
                                                  + "</span>"
                                              + "</span>"
                                            + "</span>"
                                                +"</a>"
                                            + "</span>"  
                                        + "</li>";

                        });
                        rowContent += "</ul>" + "</div>"+ "<img class='rightArrowStyle' src='/sites/all/modules/kabbalah_custom_collection_pages/images/arrow-right.png'/>"  + "</div>" ;

                    });
                    setSlideContent.html(rowContent);

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
                                "margin-top": 106,
                                "left": 0,
                                "cursor": "pointer",
                                "opacity": 0.5,
                                "z-index": 10,
                                "visibility": visOpt 
                            });

                         $(".rightArrowStyle").css({
                                "float": "right",
                                "position": "relative",
                                "margin-top": -140,
                                "right": 0,
                                "cursor": "pointer",
                                "opacity": 0.5,
                                "z-index": 10
                            });

                         $(".theDescCont").css ({
                                "width": imageSizeWidth,
                                "height": 180,
                            });
                    };
                    addStyle();

                    $.each($(".eachCont"), function(){
                        titleHeight = $(this).find(".theJsonTitle").outerHeight();
                        topicHeight = $(this).find(".teachingsTopicAndDate").outerHeight();
                    
                        $(this).find(".theDescCont").css ({
                            "margin-top": -(titleHeight + topicHeight + 10),
                        });                                

                        $(this).find(".imagesCont").hover(         //hove effect of the each image                                                
                            function () {
                                titleHeight = $(this).find(".theJsonTitle").outerHeight();
                                topicHeight = $(this).find(".teachingsTopicAndDate").outerHeight();

                                $(this).find(".theDescCont").stop().animate({ 
                                    marginTop: -180
                                }, 350);

                            },

                            function () {
                                titleHeight = $(this).find(".theJsonTitle").outerHeight();
                                topicHeight = $(this).find(".teachingsTopicAndDate").outerHeight();
                                
                                $(this).find(".theDescCont").stop().animate({ 
                                    marginTop: -(titleHeight + topicHeight + 10)
                                }, 350);    
                            }
                        );

                    });

                   windowLoad = function(){        // give the default width of slideshow once window is loaded
                       var num = 0;

                        if ($(window).width() >= 1580) {
                            num = imageNum;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;  
                            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580 && $(window).width() >= 1580 - (imageSizeWidth + marginLeft + marginRight)) {
                            num = imageNum - 1;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580- (imageSizeWidth + marginLeft + marginRight) && $(window).width() >= 1580- (imageSizeWidth + marginLeft + marginRight)*2) {
                            num = imageNum - 2; 
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580- (imageSizeWidth + marginLeft + marginRight)*2 && $(window).width() >= 980) {
                            num = 3;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                        }
                    };
                    windowLoad();

                    $(window).resize(function() {       // the number of images changes while the window is resizing
                        var num = 0;
                        
                        if ($(window).width() >= 1580) { 
                            num = imageNum;    
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num; 
                            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580 && $(window).width() >= 1580 - (imageSizeWidth + marginLeft + marginRight)) {
                            num = imageNum - 1;
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580- (imageSizeWidth + marginLeft + marginRight) && $(window).width() >= 1580- (imageSizeWidth + marginLeft + marginRight)*2) {
                             num = imageNum - 2;  
                            getContWidth = (imageSizeWidth + marginLeft + marginRight)*num;
                            $(".slideWrapper, .parent_topic, #teachingsControlSection, #teachingsSectionHeaderBar").css("width", getContWidth);
                        }
                        else if ($(window).width() < 1580- (imageSizeWidth + marginLeft + marginRight)*2 && $(window).width() >= 980) {
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

                }; // end of startPoint function
                startPoint();

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
                            var getTotalWidth = getImageWidth * ($(this).prev().find("ul").find("li:visible").length);

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

                        var getTotalWidth = getImageWidth * ($(this).prev().find("ul").find("li:visible").length);
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
                                $(this).next().next().find("ul").animate({
                                    left: "+=" + getContWidth + "px",   
                                }, 500,  
                                (function(callee) {
                                    return function() {
                                        $(this).parent().prev().prev().click(callee);
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
                           
            }  // end of success function           
        }); // end of ajax


    }; //end of render function
}; // end of Slide function

$(document).ready(function(){

    // Creating Carousals
    SlideShow (
        $("#teachingResultSection"),
        {
            json_URL: "/k_api/tchrs",
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
        var topic_name = $("#teachings_topicDD option:selected").text().replace(/\W/g, " ").replace(/\s+/g, "-");
        //$(this).target = "_self";
        //window.open(url+'/taxonomy/term/'+cat_id,'_self',false);
        window.open('/primary-topics/'+topic_name,'_self',false);
            
    });

    $('#teachings_teachersDD').change(function() {     // dropdown 
                                
        var cat = $("#teachings_teachersDD").val();
        var cat_id = cat.replace('cat', '');
        var url = "http://livingwisdom.kabbalah.com";
        var author_name = $("#teachings_teachersDD option:selected").text().replace(' ','-');
       //$(this).target = "_self";
        window.open('/authors/'+author_name,'_self',false);
            
    }); 
    
    
    
})

})(jQuery)