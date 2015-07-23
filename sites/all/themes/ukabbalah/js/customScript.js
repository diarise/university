
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
      $("#newHeaderMenuWrapper").stop().fadeTo(800); // fade back in
    } else {
      $("#newHeaderMenuWrapper").removeClass("menuScrolling");
      $("#newHeaderMenuWrapper").stop().fadeTo(800); // fade out
    }      
                
  });

    
      $(document).ready(function() {
        // $("#bannerMarketingPageImg").css('background-image', 'url(' + $("#bannerMarketingPageImg img").attr("src") + ')');
        $.each($(".courseMarketingPageContent"), function(){
            $(this).find(".courseMarketingPageContentImg").css('background-image', 'url(' + $(this).find("img:hidden").attr("src") + ')');
        });
        $(".courseMarketingPageContentImg").css({
                "height" : ($(".courseMarketingPageContent").find(".courseMarketingPageContentTextWrapper").outerHeight() + 1) ,
            });
        // $(".courseMarketingPageContentImg a").css({
        //         "margin-top" : ($(".courseMarketingPageContent").find(".courseMarketingPageContentTextWrapper").outerHeight() / 4) ,
        //     });
        // wind resize
        //if (($(window).width() <= 1450) && ($(window).width() >= 768))
        if ($(window).width() < 1450)  {
            $('#newHeaderWrapper, #newHeaderMenuWrapper').addClass('smallScreenHeader');
            $( "ul.nice-menu > li:last-child > a" ).replaceWith( "<a href='#' class='plusIcone'>+</a>" );
        } else if ($(window).width() >= 1450) {
            $('#newHeaderWrapper, #newHeaderMenuWrapper').removeClass('smallScreenHeader');
            $( "ul.nice-menu > li:last-child > a" ).replaceWith( "<a href='#'>KC Websites</a>" );
        }

        $(window).resize(function () {
            $(".courseMarketingPageContentImg").css({
                "height" : ($(".courseMarketingPageContent").find(".courseMarketingPageContentTextWrapper").outerHeight() + 1) ,
            });
            // $(".courseMarketingPageContentImg a").css({
            //     "margin-top" : ($(".courseMarketingPageContent").find(".courseMarketingPageContentTextWrapper").outerHeight() / 4) ,
            // });

            if ($(window).width() < 1450) {
                $('#newHeaderWrapper, #newHeaderMenuWrapper').addClass('smallScreenHeader');
                $( "ul.nice-menu > li:last-child > a" ).replaceWith( "<a href='#' class='plusIcone'>+</a>" );
            } else if ($(window).width() >= 1450) {
                $('#newHeaderWrapper, #newHeaderMenuWrapper').removeClass('smallScreenHeader');
                $( "ul.nice-menu > li:last-child > a" ).replaceWith( "<a href='#'>KC Websites</a>" );
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

          if ((".smallTextDesc").outerWidth() < 120 ) {

            $(".readMoreLinkMarketing").css({
                "display" : none
            });

          } else {

          $(".readMoreLinkMarketing").addClass( "removeExpand" );
          
          }
          

          //expand text ...

          $('#bannerMarketingPagedescription').find('a[href="#"]').on('click', function (e) {
          e.preventDefault();
          this.expand = !this.expand;
          $(this).text(this.expand?"close":"expand");
          $(this).closest('#bannerMarketingPagedescription').find('.smallTextDesc, .bigTextDesc').toggleClass('smallTextDesc bigTextDesc');
      });

      //end expend text ...

            $.each($("#loginWrapper"), function(){
                var loginWrapperWidth = $(this).outerWidth();
                $("#userInfoWrapper").css({
                    "width" : (loginWrapperWidth - 122),
                });
            });

            $("#newHeaderWrapperMainMenu").css({
                "width" : ($("#newHeaderWrapperMainMenu").find("ul#nice-menu-1").outerWidth() + 1) ,
            });

            // calculation of the twitter block width

            $("#fpSocialMediaBlock1").css({
                "width" : ($("#SocialMediaWrapper").find("#SocialMedia").outerWidth() - 500) ,
            });
            $("#fpSocialMediaBlock1 .fpSocialMediaWrapper").css({
                "width" : ($("#SocialMediaWrapper").find("#fpSocialMediaBlock1").outerWidth() - 45) ,
            });
            $(".fpSocialMediaWrapper .views-row.views-row-1.views-row-odd.views-row-first, .fpSocialMediaWrapper .views-row.views-row-2.views-row-even.views-row-last").css({
                "width" : ($("#SocialMediaWrapper").find("#fpSocialMediaBlock1 .fpSocialMediaWrapper").outerWidth() / 2 - 10) ,
            });

        });

        $(window).resize(function () {

            $("#newHeaderWrapperMainMenu").css({
                "width" : ($("#newHeaderWrapperMainMenu").find("ul#nice-menu-1").outerWidth() + 1) ,
            });

            // calculation of the twitter block width

            $("#fpSocialMediaBlock1").css({
                "width" : ($("#SocialMediaWrapper").find("#SocialMedia").outerWidth() - 500) ,
            });
             $("#fpSocialMediaBlock1 .fpSocialMediaWrapper").css({
                "width" : ($("#SocialMediaWrapper").find("#fpSocialMediaBlock1").outerWidth() - 45) ,
            });
            $(".fpSocialMediaWrapper .views-row.views-row-1.views-row-odd.views-row-first, .fpSocialMediaWrapper .views-row.views-row-2.views-row-even.views-row-last").css({
                "width" : ($("#SocialMediaWrapper").find("#fpSocialMediaBlock1 .fpSocialMediaWrapper").outerWidth() / 2 - 10) ,
            });

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