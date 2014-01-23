(function($){

 $(document).ready(function(){

        var titleHeight = 0;
        var dateHeight = 0;

        $.each($(".topicwrapper"), function(){
                titleHeight = $(this).find(".topicItemTitle").outerHeight();
                dateHeight = $(this).find(".topicTermnDate").outerHeight();
            
                $(this).children(".topicTextWrapper").css ({
                    "margin-top": -(titleHeight + dateHeight + 10),
                }); 



    $(".topicwrapper").hover(

       function(){


        $(this).children(".topicTextWrapper").stop().animate({
         marginTop: "-180px",
        },220);

       },

       function(){

        titleHeight = $(this).find(".topicItemTitle").outerHeight();
        dateHeight = $(this).find(".topicTermnDate").outerHeight();


        $(this).children(".topicTextWrapper").stop().animate({
         "margin-top": -(titleHeight + dateHeight + 19),
        },220);
      })

  });

});

})(jQuery);
