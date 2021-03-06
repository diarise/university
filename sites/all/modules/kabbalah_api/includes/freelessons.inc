<?php

	function getFreeLessonsData() {
	
		$sql = "SELECT *
				FROM {node n}
				LEFT JOIN {node_revision nr} ON ( n.nid = nr.nid AND n.vid = nr.vid )
				LEFT JOIN {taxonomy_index ti} ON( nr.nid = ti.nid )
				LEFT JOIN {taxonomy_term_data td} ON( ti.tid = td.tid)
				WHERE n.status =1
				AND n.type = 'lesson'
				AND td.vid = 12
				AND td.name = 'Free'
				ORDER BY n.created DESC LIMIT 6";
				
		$result = db_query( $sql );
		$result_array = array();
		foreach ($result as $record) 
		{	
			$node = node_load( $nid = $record->nid );
			$author = taxonomy_term_load($node->field_author['und'][0]['tid']);
			$path = url(drupal_get_path_alias('node/' . $record->nid), array('absolute' => TRUE));
			$title = $node->title;
			$title = preg_replace("/&#?[a-z0-9]+;/i","",$title); // removes $nbsp
			$membership = taxonomy_term_load($node->field_lesson_group['und'][0]['tid']);
			$teaser="";
			if( sizeof($node->body) > 0 ) $teaser  = getCleanBody( $node->body['und'][0]['value'] , 100 );
		
			if( sizeof($node->field_type_of_lesson) > 0 ) 
			{
				$media_type1 = taxonomy_term_load($node->field_type_of_lesson['und'][0]['tid']);
				$media_type = $media_type1->name;
			} else {

				$media_type = 'bothAdVdImg';
			}
			
			$recorded_date = strtotime($node->field_recorded_date['und'][0]['value']);
			if( $recorded_date == "" ) $recorded_date = $node->created;
			
			if( $media_type1->name == 'Video' ) 
			{
				$image_link = "http://twistassets.kabbalah.com/videos/".$node->field_lesson_video['und'][0]['twistage_existing_videos']."/screenshots/300w.jpg";
			} 
			else
			{
				$course_nid= node_load( $nid = $node->field_course_list['und'][0]['nid'] );
				if(!$course_nid) $course_nid = node_load( $nid = $node->field_event_list['und'][0]['nid'] );
				$image_link = $course_nid->field_image_cdn_link['und'][0]['value'];	
			}
			
			$image_link = image_style_url('carousal_image', imagecache_external_generate_path($image_link) ) ;
			
			$result_array[] = array(  'node_type' => $node->type,
										  'title' => $title , 
										  'author' => $author->name ,
										  'path' => $path , 
										  'teaser' => $teaser,		
										  'membership' => $membership->name,
										  'image' => $image_link,
										  'created' => date('F jS, Y',$recorded_date),
										  'media_type' => $media_type
										);														
		}
		echo json_encode( $result_array );				
	}

	