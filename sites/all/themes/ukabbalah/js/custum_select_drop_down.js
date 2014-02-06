
// Reference : http://drupal.stackexchange.com/questions/31238/how-do-i-change-the-ajax-loading-behaviour-in-views

(function($) {
  
	function showDD() {	
		if (!$.browser.opera) {
			$('.lessonCollectionSection form select,.transcription select,#teachings_teachersDD,#teachings_topicDD,#views-exposed-form-taxonomy-term-page select,#views-exposed-form-beginners-course-collection-page select, #views-exposed-form-free-lessons-page select').each(function(){
				var title = $(this).attr('title');
				if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
						
					$(this).parent().find('span').remove();
					$(this)
						.css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})  
						.after('<span class="lessonsCourse">' + title + '</span>')
						.change(function(){
							val = $('option:selected',this).text();
							$(this).next().text(val);							
						})		
			});	
		};
	}
  
	Drupal.behaviors.events = {
		attach: function(context, settings) {
			showDD(); 
			//$('#views-exposed-form-events-page', context).ajaxStart(function(){ showDD(); });
			$('#views-exposed-form-lesson-collection-block.views-exposed-widget', context).ajaxSuccess(function(){ showDD(); });
		}
	};
  
})(jQuery);