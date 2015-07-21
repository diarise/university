<?php 
	
	print "HELLO WORLD ____________";
	
	
	// Video or Audio Display
	foreach ($node->field_type_of_lesson as $term) 	{ 	$field_type_of_lesson = $term[0]['taxonomy_term']->name; }

	print $field_type_of_lesson." Test";
	
	if( $field_type_of_lesson == 'Audio' ) { 

	print render($content['field_audio_link']);

	}elseif( $field_type_of_lesson == 'Video' ) {

	print render($content['field_lesson_video']);

	}

?>
