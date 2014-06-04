//hide popup when user is not login
(function($) {
  $(document).ready(function() {

	$( "#popupNotLogin" ).click(function() {
		  $( this ).hide( 1000, function() {
		    $( this ).remove();
		  });
		})
});
})(jQuery);
//end hidding popup