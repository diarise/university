<?php

	function getBeginnersCoursesDataArray() {
	
		$sql = "SELECT *
				FROM {node n}
				LEFT JOIN {node_revision nr} ON ( n.nid = nr.nid AND n.vid = nr.vid )
				LEFT JOIN {field_revision_field_beginner_course_ bc} ON ( bc.entity_id = nr.nid AND bc.revision_id = nr.vid )
				LEFT JOIN {field_data_field_course_language cl} ON ( nr.nid = cl.entity_id AND nr.vid = cl.revision_id )
				WHERE n.status =1
				AND n.type = 'course'
				AND bc.field_beginner_course__value = 1
				AND cl.field_course_language_tid IS NULL
				ORDER BY n.changed DESC limit 10";
				
		$result = db_query( $sql );
		$result_array = array();
		foreach ($result as $record) 
		{
			$node = node_load($nid = $record->nid );
			$author = taxonomy_term_load($node->field_author['und'][0]['tid']);
			$path = url(drupal_get_path_alias('node/' . $record->nid), array('absolute' => TRUE));
			$title = $node->title;
			$title = preg_replace("/&#?[a-z0-9]+;/i","",$title); // removes $nbsp
			$membership = taxonomy_term_load($node->field_lesson_group['und'][0]['tid']);
			$teaser="";
			if( sizeof($node->body) > 0 ) $teaser  = getCleanBody( $node->body['und'][0]['value'] , 100 );
			if( sizeof($node->field_this_course_contains) > 0 )
			{
				if( $node->field_this_course_contains['und'][0]['value'] == 1 ) $media_type = 'audioImg';
				else if( $node->field_this_course_contains['und'][0]['value'] == 0 ) $media_type = 'vidImg';
				else $media_type = 'bothAdVdImg';
			} else {

				$media_type = 'bothAdVdImg';
			}
			
			$content_membership = "";
			if( kabbalah_content_access_get_article_membership($membership->name) == FALSE ) $content_membership = $membership->name;
			
			$result_array[] = array(  'title' => $title , 
									  'image_link' => image_style_url('carousal_image', imagecache_external_generate_path( $node->field_image_cdn_link['und'][0]['value'] ) ) ,
									  'path' => $path ,
									  'teaser' => $teaser,		
									  'author' => $author->name ,
									  'date_created' => date('F jS, Y',$node->created),
									  'membership' => $content_membership,
									  'media_type' => $media_type
								    );	
		}
		return $result_array;				
	}

	function getCoursesData() {
	
		$vnames = getTermNamesForApi( 14 );
		$result_array = array();
		$resultHTML = "";
		$counter = 1;
		$beginners_courses = getBeginnersCoursesDataArray();
		$result_array['Beginners Courses'] = array( "term_name" => 'Beginner\'s Courses' , "term_desc" => 'If you are new to the teachings of The Kabbalah Centre, start here' , "term_articles" => $beginners_courses );
		foreach( $vnames as $id => $vname)	
		{			
			$result = runPageQueryForApi( 14 , $vname , 562 ); // Basic Course : 562
			$vname_articles = array();
			$vname_articles	= processPageQueryResultsForApi( $result , 14 ) ; 
			$result_array[$vname] = array( "term_name" => $vname , "term_desc" =>  $vname_articles['term_description'] , "term_articles" => $vname_articles['articles'] );	
		}	
		echo json_encode( $result_array );
	}
