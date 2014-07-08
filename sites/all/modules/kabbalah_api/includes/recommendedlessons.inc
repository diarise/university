<?php

	function getRecommendedLessosnsData( $month = 0 , $week = 0 ) {
	
		if( $month == 1 )
		{
			$sql = "SELECT *
					FROM {node n}
					LEFT JOIN {node_revision nr} ON ( n.nid = nr.nid AND n.vid = nr.vid )
					LEFT JOIN {field_data_field_recommened_for_month rm} ON ( rm.entity_id = nr.nid AND rm.revision_id = nr.vid )
					WHERE n.status =1 AND n.type = 'lesson'
					AND rm.field_recommened_for_month_value = 0
					ORDER BY n.created DESC";
		}	

		if( $week == 1 )
		{
			$first_day_of_week     = date('Y-m-d',strtotime('sunday last week'));
			$last_day_of_week      = date('Y-m-d',strtotime('saturday this week'));
			
			$sql = "SELECT *
					FROM {node n}
					LEFT JOIN {node_revision nr} ON ( n.nid = nr.nid AND n.vid = nr.vid )
					JOIN {field_revision_field_recommended_date rd} ON ( rd.entity_id = nr.nid AND rd.revision_id = nr.vid )
					WHERE n.status =1 
					AND n.type = 'lesson'
					AND field_recommended_date_value BETWEEN '".$first_day_of_week."' AND '".$last_day_of_week."'
					ORDER BY n.created DESC";
		}		
				
		$result = db_query( $sql );
		$result_array = array();
		foreach ($result as $record) 
		{
			$node = node_load($nid = $record->nid );			
			$author = taxonomy_term_load($node->field_author['und'][0]['tid']);
			
			// added by rohan
			
				$author_names = array();
				if( sizeof($node->field_author) > 0 )
				{
					foreach( $node->field_author['und'] as $author )	
					{	
						$author = taxonomy_term_load( $author['tid'] );
						$author_names[] = $author->name; 
					}
					$comma_separated_author_names = implode( ", " , $author_names );
				}
				
				$comma_separated_add_author_names = "";
				$additional_author_names = array();
				if( sizeof($node->field_additiona_authors) > 0 )
				{
					foreach( $node->field_additiona_authors['und'] as $add_author )	
					{	
						$add_author = taxonomy_term_load( $add_author['tid'] );
						$additional_author_names[] = $add_author->name; 
					}
					$comma_separated_add_author_names = implode( ", " , $additional_author_names );
				}
				
				$comma_separated_add_author_names = "";
				$additional_author_names = array();
				if( sizeof($node->field_additiona_authors) > 0 )
				{
					foreach( $node->field_additiona_authors['und'] as $add_author )	
					{	
						$add_author = taxonomy_term_load( $add_author['tid'] );
						$additional_author_names[] = $add_author->name; 
					}
					$comma_separated_add_author_names = implode( ", " , $additional_author_names );
				}
				
				$vocab_terms = _taxonomy_node_get_terms_by_vocabulary($node, 14 );
				foreach( $vocab_terms as $t )	{	$primary_topic = $t->name; }
				
				$secondary_topics = array();
				$vocab_terms1 = _taxonomy_node_get_terms_by_vocabulary($node, 13 );
				foreach( $vocab_terms1 as $t )	{	$secondary_topics[] = $t->name; }
				
				if( $record->field_event_date_value == NULL )
				{
					$sDate = "";
				} 
				else
				{
					$oDate = new DateTime($record->field_event_date_value);
					//$sDate = $oDate->format('F jS, Y'); // Event Start Date
					$sDate = $oDate->getTimestamp(); // Event Start Date
				}
				
				if( $record->field_event_date_value2 == NULL )
				{
					$sDate2 = "";
				} 
				else
				{
					$oDate2 = new DateTime($record->field_event_date_value2);
					//$sDate2 = $oDate2->format('F jS, Y'); // Event End Date
					$sDate2 = $oDate2->getTimestamp();
				}
			
			// added by rohan
			
			$path = url(drupal_get_path_alias('node/' . $record->nid), array('absolute' => TRUE));
			$title = $node->title;
			$title = preg_replace("/&#?[a-z0-9]+;/i","",$title); // removes $nbsp
			$membership = taxonomy_term_load($node->field_lesson_group['und'][0]['tid']);
			
			$teaser="";
			if( sizeof($node->body) > 0 ) $teaser  = getCleanBody( $node->body['und'][0]['value'] , 100 );
			
			$recommended_date = $node->field_recommended_date['und'][0]['value'];
			$recommended_date_month = date('m',strtotime($recommended_date));
			$recommended_date_year = date('Y',strtotime($recommended_date));
			
			$media_type = taxonomy_term_load($node->field_type_of_lesson['und'][0]['tid']);
			
			if( $media_type->name == 'Video' ) 
			{
				$image_link = "http://twistassets.kabbalah.com/videos/".$node->field_lesson_video['und'][0]['twistage_existing_videos']."/screenshots/300w.jpg";
			} 
			else
			{
				$course_nid= node_load( $nid = $node->field_course_list['und'][0]['nid'] );
				if(!$course_nid) $course_nid = node_load( $nid = $node->field_event_list['und'][0]['nid'] );
				
				$image_link = $course_nid->field_image_cdn_link['und'][0]['value'];	
			}
			
			$recorded_date = strtotime($node->field_recorded_date['und'][0]['value']);
			if( $recorded_date == "" ) $recorded_date = $node->changed;
			
			
			
			if( $month == 1)
			{
				if( $recommended_date_month == date('m',time()) && $recommended_date_year == date('Y',time()) )
				{
					$result_array[] = array(  'node_type' => $node->type,
											  'title' => $title , 
											  'author' => $author->name ,
											  'path' => $path , 
											  'teaser' => $teaser,		
											  'membership' => $membership->name,
											  'image' => $image_link,
											  'created' => date('F jS, Y',$recorded_date),
											  'media_type' => $media_type->name,
											  'authors_array' => $author_names ,
											  'additional_authors' => $comma_separated_add_author_names ,	
											  'additional_authors_array' => $additional_author_names ,	
											  'primary_topic' => $primary_topic,
											  'secondary_topics' => implode( ", " , $secondary_topics ),					
											  'secondary_topics_array' => $secondary_topics,					
											  'web_path' => $path ,					  
											  'created_ts' => $node->created,
											  'modified_ts' => $node->changed,
											  'event_start_date' => $sDate,
											  'event_end_date' => $sDate2 
											);
				}
			}

			if( $week == 1)
			{
					$result_array[] = array(  'node_type' => $node->type,
											  'title' => $title , 
											  'author' => $author->name ,
											  'path' => $path , 
											  'teaser' => $teaser,		
											  'membership' => $membership->name,
											  'image' => $image_link,
											  'created' => date('F jS, Y',$recorded_date),
											  'media_type' => $media_type->name ,
											  'authors_array' => $author_names ,
											  'additional_authors' => $comma_separated_add_author_names ,	
											  'additional_authors_array' => $additional_author_names ,	
											  'primary_topic' => $primary_topic,
											  'secondary_topics' => implode( ", " , $secondary_topics ),					
											  'secondary_topics_array' => $secondary_topics,					
											  'web_path' => $path ,					  
											  'created_ts' => $node->created,
											  'modified_ts' => $node->changed,
											  'event_start_date' => $sDate,
											  'event_end_date' => $sDate2
											);
			}
	
		}
		echo json_encode( $result_array );				
	
	
	}