<?php 

	// Video or Audio Display
	foreach ($node->field_type_of_lesson as $term) 	{ 	$field_type_of_lesson = $term[0]['taxonomy_term']->name; }
	
	if( $field_type_of_lesson == 'Audio' ) { 

	print render($content['field_audio_link']);

	}elseif( $field_type_of_lesson == 'Video' ) {

	print render($content['field_lesson_video']);

	}

?>
