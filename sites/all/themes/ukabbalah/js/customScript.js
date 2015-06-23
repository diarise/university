
  $(function(){

    // making div clickable
    $(".contentTeachersPage").click(function() {
        window.location = $(this).find("a").attr("href"); 
        return false;
    });          
    
  });
 

  $(window).scroll(function() {
      //$('#newHeaderMenuWrapper').fadeIn(800);
    if ($("#popupNotLogin").length){
		 var scrollHeight = 104;
		} else {
		 var scrollHeight = 60;
		}

    var scroll = $(this).scrollTop();

    if (scroll >= scrollHeight) {
      $("#newHeaderMenuWrapper").addClass("menuScrolling");
      $("#newHeaderMenuWrapper").stop().fadeTo(800, 0.9); // fade back in
    } else {
      $("#newHeaderMenuWrapper").removeClass("menuScrolling");
      $("#newHeaderMenuWrapper").stop().fadeTo(800, 1); // fade out
    }      
                
  });

    // wind resize
      $(document).ready(function() {
        //if (($(window).width() <= 1450) && ($(window).width() >= 768))
        if ($(window).width() < 1450)  {
            $('#newHeaderWrapper, #newHeaderMenuWrapper').addClass('smallScreenHeader');
        } else if ($(window).width() >= 1450) {
            $('#newHeaderWrapper, #newHeaderMenuWrapper').removeClass('smallScreenHeader');
        }

        $(window).resize(function () {
            if ($(window).width() < 1450) {
                $('#newHeaderWrapper, #newHeaderMenuWrapper').addClass('smallScreenHeader');
            } else if ($(window).width() >= 1450) {
                $('#newHeaderWrapper, #newHeaderMenuWrapper').removeClass('smallScreenHeader');
            }
        });
 	    }); 
    // end windows resize

    (function($){
        if (($(window).width() <= 980) && ($(window).width() > 768)) {
        $('#mainContentTeachersPage').masonry({
              itemSelector: '.contentTeachersPage',
              columnWidth: 200,
              isAnimated: true,
              gutterWidth: 20,
              isFitWidth: true,
                
         }).masonry().masonry();


        } else if( ($(window).width() <= 768)  && ($(window).width() > 326) ){
             $('#mainContentTeachersPage').masonry({
              itemSelector: '.contentTeachersPage',
              columnWidth: 160,
              isAnimated: true,
              gutterWidth: 20,
              isFitWidth: true,
                
         }).masonry().masonry();


        }else if($(window).width() <= 326){
             $('#mainContentTeachersPage').masonry({
              itemSelector: '.contentTeachersPage',
              columnWidth: 140,
              isAnimated: true,
              gutterWidth: 20,
              isFitWidth: true,
                
         }).masonry().masonry();


        } else {
            $(function(){
                //masonry plugin

                $('#mainContentTeachersPage').masonry({
                  itemSelector: '.contentTeachersPage',
                  columnWidth: 300,
                  isAnimated: true,
                  gutterWidth: 20,
                  isFitWidth: true,
                  // isInitLayout: true
                }).masonry().masonry();
            });
        }

        $(window).load(function() {

            $.each($("#loginWrapper"), function(){
                var loginWrapperWidth = $(this).outerWidth();
                $("#userInfoWrapper").css({
                    "width" : (loginWrapperWidth - 122),
                });
            });

            $("#newHeaderWrapperMainMenu").css({
                "width" : ($("#newHeaderWrapperMainMenu").find("ul#nice-menu-1").outerWidth() + 1) ,
            });

        });

        $(window).resize(function () {



             $.each($("#loginWrapper"), function(){
                var loginWrapperWidth = $(this).outerWidth();
                $("#userInfoWrapper").css({
                    "width" : (loginWrapperWidth - 122),
                });
            });

             if (($(window).width() <= 980) && ($(window).width() > 768)) {
                $('#mainContentTeachersPage').masonry({
                      itemSelector: '.contentTeachersPage',
                      columnWidth: 200,
                      isAnimated: true,
                      gutterWidth: 20,
                      isFitWidth: true,
                        
                 }).masonry().masonry();


        } else if( ($(window).width() <= 768)  && ($(window).width() > 326) ){
             $('#mainContentTeachersPage').masonry({
              itemSelector: '.contentTeachersPage',
              columnWidth: 160,
              isAnimated: true,
              gutterWidth: 20,
              isFitWidth: true,
                
         }).masonry().masonry();


        }else if($(window).width() <= 326){
             $('#mainContentTeachersPage').masonry({
              itemSelector: '.contentTeachersPage',
              columnWidth: 140,
              isAnimated: true,
              gutterWidth: 20,
              isFitWidth: true,
                
         }).masonry().masonry();


        } else {
            $(function(){
                //masonry plugin

                $('#mainContentTeachersPage').masonry({
                  itemSelector: '.contentTeachersPage',
                  columnWidth: 300,
                  isAnimated: true,
                  gutterWidth: 20,
                  isFitWidth: true,
                  // isInitLayout: true
                }).masonry().masonry();
            });
        }

           

        });

    })(jQuery);

    (function($){
        setTimeout(function(){
                if ($(window).width() <= 980){

                    $("#leftColTeachersPage").css({
                        "width" : $("#mainTeachersPage").find("#mainContentTeachersPage").outerWidth(),
                    });

                } else {

                     $("#leftColTeachersPage").css({
                        "width" : 240,
                    });
                }
        }, 1000)

        var resizeTimer;
        $(window).resize(function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {

                if ($(window).width() <= 980){

                    $("#leftColTeachersPage").css({
                        "width" : $("#mainTeachersPage").find("#mainContentTeachersPage").outerWidth(),
                    });

                } else {

                     $("#leftColTeachersPage").css({
                        "width" : 240,
                    });
                }
            }, 1000);

        });
    })(jQuery);