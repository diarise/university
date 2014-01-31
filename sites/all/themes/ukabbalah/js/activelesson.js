/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    //code starts
    var href = $('.Video_link').attr('href');
    console.log(href);
    console.log(context.URL);
     if (href == context.URL){
     	$('.Video_link span').text('NOW PLAYING');
     }
     
     table.find('td.watch-width').each(function(){
     	var href = $('.Video_link').attr('href');
     	 if (href == context.URL){
     	$('.Video_link span').text('NOW PLAYING');
     }
        
    } );
    //code ends
  }
};
})(jQuery);