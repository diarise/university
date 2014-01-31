/**
 * @author kabbalah kabbalah
 */
(function($) {
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    //code starts
    var href = $(Video_link).attr('href');
     if (href == Drupal.settings.nodepath){
     	$('.Video_link span').text('NOW PLAYING');
     }
    //code ends
  }
};
})(jQuery);