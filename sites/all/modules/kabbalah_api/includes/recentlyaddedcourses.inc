<?php

	function getRecentlyAddedCoursesData() {
	
		$sql = "SELECT *
				FROM {node n}
				LEFT JOIN {node_revision nr} ON ( n.nid = nr.nid AND n.vid = nr.vid )
				WHERE n.status =1
				AND n.type = 'course'
				ORDER BY n.created DESC LIMIT 6";
				
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
			
			$result_array[] = array(  'node_type' => $node->type,
									  'title' => $title , 
									  'author' => $author->name ,
									  'path' => $path , 
									  'teaser' => $teaser,		
									  'membership' => $membership->name,
									  'image' => $node->field_image_cdn_link['und'][0]['value'] ,
									  'created' => date('F jS, Y',$node->created),
									  'media_type' => $media_type
									);
		}
		echo json_encode( $result_array );				
	}
