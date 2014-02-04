(function($){

 $(document).ready(function(){

        var titleHeight = 0;
        var dateHeight = 0;

        $.each($(".masonry li"), function(){
          
		  setTimeout ( function () {
			titleHeight = $(this).find(".theJsonTitle").outerHeight();
			dateHeight = $(this).find(".teachingsTopicAndDate").outerHeight();
		  }, 1);
      
		  console.log( "titleHeight : " + titleHeight);
		  console.log( "dateHeight : " + dateHeight);	
	  
          $(this).find(".theDescCont").css ({
              "margin-top": -(titleHeight + dateHeight + 13),
			  "padding" : 0,
          }); 

          $(this).hover(

          function(){

            $(this).find(".theDescCont").stop().animate({
             marginTop: "-180px",
            },220);

           },

           function(){

            titleHeight = $(this).find(".theJsonTitle").outerHeight();
            dateHeight = $(this).find(".teachingsTopicAndDate").outerHeight();

            $(this).find(".theDescCont").stop().animate({
             "margin-top": -(titleHeight + dateHeight + 13),
            },220);
          })
        });
		
});

})(jQuery);