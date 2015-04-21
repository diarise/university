(function($){

 $(document).ready(function(){
  // $(window).load(function() {
      var maxheight=210;
      var showText = " expand";
      var hideText = " collapse";

      $('.description, .highlightsWrapper').each(function () {
        var text = $(this);
        if (text.height() > maxheight){
            text.css({ 'overflow': 'hidden','height': maxheight + 'px' });

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
      $( "#expand" ).click(function() {
        $( this ).toggleClass( "collapse" );
      });
      $( "div.view-lesson-collection .view-filters" ).addClass( "searchThisCourse" );
      $('.searchThisCourse input[name$="title"]').attr('placeholder','search this course');
      //$("#sv_player_0").css( "margin": "0 auto !important");

      
           
});
})(jQuery);




(function($){

 //$(document).ready(function(){
  $(window).load(function() {



      function setPanelHeight (){

        $( ".lessonCollectionSection .view-content" ).addClass( "mCustomScrollbar fluid light" );
        $( ".lessonCollectionSection .view-content" ).attr( 'data-mcs-theme','inset-2-dark' );

        var panelHeight = $("#wrappperBloc").find("#wrappperRightBloc").outerHeight();
        
        if ( $("#wrappperBloc").find("#wrappperRightBloc").outerHeight() <= 390 ) 
        {

            $("#wrappperBloc").find(".lessonCollectionSection .view-content").css ({
              "max-height": 390,
              "width": 475  
            });

        } else {

            $("#wrappperBloc").find(".lessonCollectionSection .view-content").css ({
              "max-height": panelHeight - 102,
              "width": 475
            });
          
        
      }
      }

      setPanelHeight();

      //$('.transcript-time').find('.transcript-content').addClass('openTranscript');
      //$('.transcript-time').parent().addClass('openTranscript');



      // making div clickable
    $(".wrapperLesson").click(function() {
        window.location = $(this).find("a").attr("href"); 
        return false;
    });

    //$(".transcript-time").parents(".transcript-content").addClass("openTranscript");
 //$(".transcript-content").addClass("openTranscript");
      $("select.trans-lang-select").change(function () {
          if ($(this).val() !== "none") {
              $(".transcript-content").addClass("openTranscript");
          } else {
              $(".transcript-content").removeClass("openTranscript");
          }
      });
      

    });
})(jQuery);




// (function($){

// $(document).ready(function() {
//   $(".lessonCollectionSection .view-content").customScrollbar({
//   skin: "default-skin", 
//   hScroll: false,
//   // updateOnWindowResize: true
//   });
// });
// })(jQuery);


/**
 * @author kabbalah kabbalah
 */ (function ($) {
    Drupal.behaviors.myBehavior = {
        attach: function (context, settings) {
            //code starts
            var className;

            $('.wrapperLesson').each(function () {

                var lessonhref = $(this).find('.wrappercontentLesson a').attr('href');

                if (lessonhref == context.URL) {

                    $(this).addClass("activeLesson");

                }

            });
            //code ends
        }
    };
})(jQuery);