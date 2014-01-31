/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    //code starts
    var href = $('.Video_link').attr('href');
    console.log(href);
    console.log(settings);
    console.log(context.URL);
     if (href == Drupal.settings.nodeinfo.nodepath){
     	$('.Video_link span').text('NOW PLAYING');
     }
    //code ends
  }
};
})(jQuery);