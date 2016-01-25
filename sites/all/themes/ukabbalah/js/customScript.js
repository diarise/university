(function ($) {
    Drupal.behaviors.customScript = {
        attach: function (context, settings) {

            //hide pop up  aflter click on no login
            $("#popupNotLogin").click(function () {
                $(this).hide(1000, function () {
                    $(this).remove();
                });
            });

            // expand text description on cours and lesson page
            var maxheight = 210;
            var showText = " expand";
            var hideText = " collapse";

            $('.description, .highlightsWrapper').each(function () {
                var text = $(this);
                if (text.height() > maxheight) {
                    text.css({
                        'overflow': 'hidden',
                            'height': maxheight + 'px'
                    });

                    var link = $('<a id="expand" href="#">' + showText + '</a>');
                    var linkDiv = $('<div class="expand"></div>');
                    linkDiv.append(link);
                    $(this).after(linkDiv);

                    link.click(function (event) {
                        event.preventDefault();
                        if (text.height() > maxheight) {
                            $(this).html(showText);
                            text.css('height', maxheight + 'px');
                        } else {
                            $(this).html(hideText);
                            text.css('height', 'auto');
                        }
                    });
                }
            });

            $(".expand a").click(function () {
                $(this).toggleClass("collapse");
            });

            //$(".bookmark .flag-wrapper.flag-bookmarks input").append( "<label for='compare-cb'></label>" );

            $( "input.compare-cb" ).attr("id", "bookmarkCheck");
            $( "<label for='bookmarkCheck'></label>" ).insertBefore( "#bookmarkCheck" );

            $("#courseDescription .bookmark label").click(function () {
                $(this).toggleClass("checked");
            });

            $('#courseDescription .bookmark a.flagged, #courseDescription .bookmark a.unflag-action').each(function(){
                $(this).closest('.flag-wrapper.flag-bookmarks').toggleClass("bookmarkChecked");
            });
            $(".bookmarkChecked").find("label").addClass("checked");

            $("#courseDescription .bookmark label + label, .form-item .description").remove();

            //

            $("div.view-lesson-collection .view-filters").addClass("searchThisCourse");
            $('.searchThisCourse input[name$="title"]').attr('placeholder', 'search this course');

            function setPanelHeight() {

                $(".lessonCollectionSection .view-content").addClass("mCustomScrollbar fluid light");
                $(".lessonCollectionSection .view-content").attr('data-mcs-theme', 'inset-2-dark');

                var panelHeight = $("#wrappperBloc").find("#wrappperRightBloc").outerHeight();

                if ($("#wrappperBloc").find("#wrappperRightBloc").outerHeight() <= 390) {

                    $("#wrappperBloc").find(".lessonCollectionSection .view-content").css({
                        "max-height": 390,
                            "width": 462
                    });

                } else {

                    $("#wrappperBloc").find(".lessonCollectionSection .view-content").css({
                        "max-height": panelHeight - 102,
                            "width": 462
                    });

                }
            }

            setPanelHeight();

            // making div clickable
            $(".wrapperLesson").click(function () {
                window.location = $(this).find("a").attr("href");
                return false;
            });

            $("select.trans-lang-select").change(function () {
                if ($(this).val() !== "none") {
                    $(".transcript-content").addClass("openTranscript");
                } else {
                    $(".transcript-content").removeClass("openTranscript");
                }
            });

            //added class to highlight active lesson
            $('.wrapperLesson').each(function () {

                var lessonhref = $(this).find('.wrappercontentLesson a').attr('href');

                if (lessonhref == context.URL) {

                    $(this).addClass("activeLesson");

                }

            });


           // $(function() {

           //      $.each($("ul.masonry li"), function () {
           //          var masonryHeight = $(this).outerHeight();
           //          $(this).css({
           //              "height": masonryHeight
           //          });
           //      });

           //  });

                // get the highest height and then apply to all other blocks (this methode help us to fix an issue from the  masonry plugin)

                // var masonryHeight = $("li.masonry-brick").map(function() {

                //     return $(this).height();

                // }).get(),

                // maxHeight = Math.max.apply(null, masonryHeight);

                // $("li.masonry-brick").css({
                //   "min-height": maxHeight,
                // });

                // end get max height

                $('.masonry').masonry({ 
                    itemSelector: 'ul.masonry li',
                    isFitWidth: true,
                    animationOptions: {
                        duration: 400
                    }
                    
                });

                $('.masonry').isotope({
                    itemSelector: 'ul.masonry li',
                    layoutMode : 'fitRows',
                });

                


                $(".masonry").css({
                    "min-width": 586,
                });

                $(".title").css({
                    "overflow": "hidden",
                        "margin-left": "auto",
                        "margin-right": "auto",
                        "margin-bottom": "18px",
                        "width": $(".masonry").width() - 20,
                });

                $("#mainContentWrapper .view-filters").css({
                    "border-bottom": "1px solid #ccc",
                        "margin-bottom": 50,
                        "overflow": "hidden",
                        "margin-left": "auto",
                        "margin-right": "auto",
                        "width": $(".masonry").width() - 20,
                        "height": 80,
                });

                $(".termDesc").css({
                    "overflow": "hidden",
                        "margin-left": "auto",
                        "margin-right": "auto",
                        "width": $(".masonry").width() - 20,
                });




            jQuery(window).resize(function (e) {

                $("#mainContentWrapper h1, #courseByParentWrapper h1").css({
                    "width": $(".masonry").width() - 20
                });

                $("#mainContentWrapper .view-filters,#mainContentWrapper .termDesc").css({
                    "width": $(".masonry").width() - 20
                });
            });

            //style selct dropdown
            function showDD() {
                if (!$.browser.opera) {
                    $('#views-exposed-form-search-page select,.lessonCollectionSection form select,#teachings_teachersDD,#teachings_topicDD,#views-exposed-form-taxonomy-term-page select,#views-exposed-form-beginners-course-collection-page select, #views-exposed-form-free-lessons-page select, #views-exposed-form-taxonomy-term-lesson-page select').each(function () {
                        var title = $(this).attr('title');
                        if ($('option:selected', this).val() != '') title = $('option:selected', this).text();

                        $(this).parent().find('span').remove();
                        $(this)
                            .css({
                            'z-index': 10,
                                'opacity': 0,
                                '-khtml-appearance': 'none'
                        })
                            .after('<span class="lessonsCourse customSelectDd">' + title + '</span>')
                            .change(function () {
                            val = $('option:selected', this).text();
                            $(this).next().text(val);
                        })
                    });
                };
            }

            showDD();
            //$('#views-exposed-form-events-page', context).ajaxStart(function(){ showDD(); });
            $('#views-exposed-form-lesson-collection-block.views-exposed-widget', context).ajaxSuccess(function () {
                showDD();
            });



            //style selct dropdown for transcription
            function customSelectDropdown() {
                if (!$.browser.opera) {
                    $('.transcription select').each(function () {
                        var title = $(this).attr('title');
                        if ($('option:selected', this).val() != '') title = $('option:selected', this).text();

                        $(this).parent().find('span').remove();
                        $(this)
                            .css({
                            'z-index': 10,
                                'opacity': 0,
                                '-khtml-appearance': 'none'
                        })
                            .after('<span class="customSelectDropdown">' + title + '</span>')
                            .change(function () {
                            val = $('option:selected', this).text();
                            $(this).next().text(val);
                        })
                    });
                };
            }

            customSelectDropdown();

            $(window).scroll(function () {

                if ($("#popupNotLogin").length) {
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

            $.each($(".courseMarketingPageContent"), function () {
                $(this).find(".courseMarketingPageContentImg").css('background-image', 'url(' + $(this).find("img:hidden").attr("src") + ')');
            });
            $(".courseMarketingPageContentImg").css({
                "height": ($(".courseMarketingPageContent").find(".courseMarketingPageContentTextWrapper").outerHeight() + 1),
            });

            if ($(window).width() < 1660) {
                $('#newHeaderWrapper, #newHeaderMenuWrapper').addClass('smallScreenHeader');
                $("ul.nice-menu > li:last-child > a").replaceWith("<a href='#' class='plusIcone'>+</a>");
            } else if ($(window).width() >= 1660) {
                $('#newHeaderWrapper, #newHeaderMenuWrapper').removeClass('smallScreenHeader');
                $("ul.nice-menu > li:last-child > a").replaceWith("<a href='#'>KC Websites</a>");
            }

            $(window).resize(function () {
                $(".courseMarketingPageContentImg").css({
                    "height": ($(".courseMarketingPageContent").find(".courseMarketingPageContentTextWrapper").outerHeight() + 1),
                });


                if ($(window).width() < 1660) {
                    $('#newHeaderWrapper, #newHeaderMenuWrapper').addClass('smallScreenHeader');
                    $("ul.nice-menu > li:last-child > a").replaceWith("<a href='#' class='plusIcone'>+</a>");
                } else if ($(window).width() >= 1660) {
                    $('#newHeaderWrapper, #newHeaderMenuWrapper').removeClass('smallScreenHeader');
                    $("ul.nice-menu > li:last-child > a").replaceWith("<a href='#'>KC Websites</a>");
                }
            });

            // end windows resize

            if ($(".smallTextDesc").text().length < 310) {

                $(".readMoreLinkMarketing").addClass("removeExpand");

            } else {

                //$(".readMoreLinkMarketing").addClass( "removeExpand" );

            }

            //expand text ...

            $('#bannerMarketingPagedescription').find('a[href="#"]').on('click', function (e) {
                e.preventDefault();
                this.expand = !this.expand;
                $(this).text(this.expand ? "close" : "expand");
                $(this).closest('#bannerMarketingPagedescription').find('.smallTextDesc, .bigTextDesc').toggleClass('smallTextDesc bigTextDesc');
            });

            //end expend text ...

            $.each($("#loginWrapper"), function () {
                var loginWrapperWidth = $(this).outerWidth();
                $("#userInfoWrapper").css({
                    "width": (loginWrapperWidth - 122),
                });
            });

            // calculation of the twitter block width

            $("#fpSocialMediaBlock1").css({
                "width": ($("#SocialMediaWrapper").find("#SocialMedia").outerWidth() - 500),
            });
            $("#fpSocialMediaBlock1 .fpSocialMediaWrapper").css({
                "width": ($("#SocialMediaWrapper").find("#fpSocialMediaBlock1").outerWidth() - 45),
            });
            $(".fpSocialMediaWrapper .views-row.views-row-1.views-row-odd.views-row-first, .fpSocialMediaWrapper .views-row.views-row-2.views-row-even.views-row-last").css({
                "width": ($("#SocialMediaWrapper").find("#fpSocialMediaBlock1 .fpSocialMediaWrapper").outerWidth() / 2 - 10),
            });

            $(window).resize(function () {


                // calculation of the twitter block width

                $("#fpSocialMediaBlock1").css({
                    "width": ($("#SocialMediaWrapper").find("#SocialMedia").outerWidth() - 500),
                });
                $("#fpSocialMediaBlock1 .fpSocialMediaWrapper").css({
                    "width": ($("#SocialMediaWrapper").find("#fpSocialMediaBlock1").outerWidth() - 45),
                });
                $(".fpSocialMediaWrapper .views-row.views-row-1.views-row-odd.views-row-first, .fpSocialMediaWrapper .views-row.views-row-2.views-row-even.views-row-last").css({
                    "width": ($("#SocialMediaWrapper").find("#fpSocialMediaBlock1 .fpSocialMediaWrapper").outerWidth() / 2 - 10),
                });

                $.each($("#loginWrapper"), function () {
                    var loginWrapperWidth = $(this).outerWidth();
                    $("#userInfoWrapper").css({
                        "width": (loginWrapperWidth - 122),
                    });
                });

            });

            setTimeout(function () {
                if ($(window).width() <= 980) {

                    $("#leftColTeachersPage").css({
                        "width": $("#mainTeachersPage").find("#mainContentTeachersPage").outerWidth(),
                    });

                } else {

                    $("#leftColTeachersPage").css({
                        "width": 240,
                    });
                }
            }, 1000)

            var resizeTimer;
            $(window).resize(function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {

                    $("#mainContentWrapper h1, #courseByParentWrapper h1").css({
                        "width" : $(".masonry").width() - 20
                    });

                    $("#mainContentWrapper .view-filters,#mainContentWrapper .termDesc").css({
                        "width" : $(".masonry").width() - 20
                    });

                    if ($(window).width() <= 980) {

                        $("#leftColTeachersPage").css({
                            "width": $("#mainTeachersPage").find("#mainContentTeachersPage").outerWidth(),
                        });

                    } else {

                        $("#leftColTeachersPage").css({
                            "width": 240,
                        });
                    }
                }, 200);

            });
        }
    };
})(jQuery);