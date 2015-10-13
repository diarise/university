<?php

	function getTeachersData() {
	
		$vnames = getTermNamesForApi( 7 );
		$result_array = array();
		foreach( $vnames as $id => $vname)	{
					
			$result = runPageQueryForApi( 7 , $vname , 562 ); // Basic Course : 562
			foreach( $result as $record ) {
			
				$title = $record->title;
				$title = preg_replace("/&#?[a-z0-9]+;/i","",$title); // removes $nbsp
				$teaser  = getCleanBody( $record->body_value , 100 );
				$path = url(drupal_get_path_alias('node/' . $record->nid), array('absolute' => TRUE));	
				
				$node = node_load($record->nid , NULL, TRUE);
				$vocab_terms3 = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
				foreach( $vocab_terms3 as $t )	{	$author_name = $t->name; }
				
				$vocab_terms4 = _taxonomy_node_get_terms_by_vocabulary($node, 14 );
				foreach( $vocab_terms4 as $t )	{	$primary_topic = $t->name; }

				if( $node->type == "course" ) {
				
					if( sizeof($node->field_lesson_group) > 0 )	{
					
						$membership = taxonomy_term_load($node->field_lesson_group['und'][0]['tid']);
						$membership = $membership->name;
					}
				}
				
				if( $node->type == "course" ) {
				
					if( sizeof($node->field_this_course_contains) > 0 )  {
					
						if( $node->field_this_course_contains['und'][0]['value'] == 1 ) $media_type = 'audioImg';
						else if( $node->field_this_course_contains['und'][0]['value'] == 0 ) $media_type = 'vidImg';
						else $media_type = 'bothAdVdImg';
					} else {

						$media_type = 'bothAdVdImg';
					}
				}
				
				$content_membership = "";
				if( kabbalah_content_access_get_article_membership($membership) == FALSE ) $content_membership = $membership;
					
				$result_array[$vname][] = array( 'title' => $title , 
												 'image_link' => image_style_url('carousal_image', imagecache_external_generate_path( $record->field_image_cdn_link_value ) ),
												 'path' => $path , 
												 'teaser' => $teaser , 
												 'author' => $author_name , 
												 'date_created' => date( 'F jS, Y',$record->changed ),
												 'primary_topic' => $primary_topic ,
												 'membership' => $content_membership,
												 'media_type' => $media_type												 
										  ); 
			}
		}	
		echo json_encode( $result_array );
	}

	