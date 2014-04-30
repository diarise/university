<?php

	function getRecentlyAddedLessonsByMembershipData( $membership ) {
	
		$sql = "SELECT *
				FROM {node n}
				LEFT JOIN {node_revision nr} ON ( n.nid = nr.nid AND n.vid = nr.vid )
				LEFT JOIN {taxonomy_index ti} ON( nr.nid = ti.nid )
				LEFT JOIN {taxonomy_term_data td} ON( ti.tid = td.tid)
				WHERE n.status =1
				AND td.vid = 12";
		
		if( $membership == "Free" )       	$sql .=	" AND td.name IN('Free')";
		if( $membership == "Basic" )        $sql .= " AND td.name IN('Free','Basic')";
		if( $membership == "Premium" ) 		$sql .=	" AND td.name IN('Free','Basic','Premium')";
		if( $membership == "Premium Plus" ) $sql .=	" AND td.name IN('Free','Basic','Premium','Premium Plus')";
		
		$sql .=	" AND n.type = 'lesson'
				 ORDER BY n.changed DESC LIMIT 10";
				
		$result = db_query( $sql );
		$result_array = array();
		foreach ($result as $record) 
		{
			
			$node = node_load($nid = $record->nid  );
			$author = taxonomy_term_load($node->field_author['und'][0]['tid']);
			$path = url(drupal_get_path_alias('node/' . $record->nid), array('absolute' => TRUE));
			$title = $node->title;
			$title = preg_replace("/&#?[a-z0-9]+;/i","",$title); // removes $nbsp
			$membership_term = taxonomy_term_load($node->field_lesson_group['und'][0]['tid']);
			$teaser="";
			if( sizeof($node->body) > 0 ) $teaser  = getCleanBody( $node->body['und'][0]['value'] , 100 );
			$media_type = taxonomy_term_load($node->field_type_of_lesson['und'][0]['tid']);
			
			$result_array[] = array(  'node_type' => $node->type,
									  'title' => $title , 
									  'author' => $author->name ,
									  'path' => $path , 
									  'teaser' => $teaser,		
									  'membership' => $membership_term->name,
									  'image' => 'http://twistassets.kabbalah.com/videos/'.$node->field_lesson_video['und'][0]['twistage_existing_videos'].'/screenshots/300w.jpg' ,
									  'created' => date('F jS, Y',$node->changed),
									  'media_type' => $media_type->name
									);
								
		}
		echo json_encode( $result_array );
		
	}