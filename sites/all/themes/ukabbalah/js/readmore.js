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


      // add class when thanscription is select
      // $('.trans-lang-select.form-select').data( $('.trans-lang-select.form-select').val());
      // $('.trans-lang-select.form-select').change(function() {
      //     var $this = $(this);
      //     var newClass = $this.val();
      //     var oldClass = $this.data('oldVal');
      //     $this.data('oldVal', newClass);
          
      //     $('.transcript-content').addClass(newClass);
      // });
      $('.transcript-time').parent().addClass('openTranscript');

      
           
});
})(jQuery);




(function($){

 //$(document).ready(function(){
  $(window).load(function() {

     //$( "#video-control .sublimevideo-View.sublimevideo-VideoView" ).addClass( "testet" );
      // $( "#video-control .sublimevideo-View.sublimevideo-VideoView" ).css({
      //   "margin": "auto", 
      //   //"background": "#0ff",                
      // });
      // $('.sublimevideo-View.sublimevideo-VideoView').attr('style', function(i, style)
      // {
      // return style.replace(/margin[^;]+;?/g, '');
      // }); 


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