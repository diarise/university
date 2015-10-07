<?php

	function getCoursesByLiveEventsData() {
	
		$vnames = getTermNamesForApi( 17 );
		$result_array = array();
		foreach( $vnames as $id => $vname)	{
					
			$sql =  "SELECT n.nid,n.title,il.field_image_cdn_link_value,b.body_value,n.changed,ti.tid,td.name,d.field_event_date_value,d.field_event_date_value2 ".
					"FROM {node n} ".
					"LEFT JOIN {node_revision nr} ON ( n.nid = nr.nid and n.vid = nr.vid ) ".
					"LEFT JOIN {field_data_field_image_cdn_link il} ON ( nr.nid = il.entity_id AND nr.vid = il.revision_id ) ".
					"LEFT JOIN {field_revision_body b} ON ( nr.nid = b.entity_id AND nr.vid = b.revision_id ) ".
					"LEFT JOIN {field_data_field_event_date d} ON ( nr.nid = d.entity_id AND nr.vid = d.revision_id ) ".
					"LEFT JOIN {taxonomy_index ti} ON( nr.nid = ti.nid ) ".
					"LEFT JOIN {taxonomy_term_data td} ON( ti.tid = td.tid) ".
					"WHERE n.status =1 ".
					"AND td.vid = 17 ".
					"AND td.name = '".$vname."' ".
					"AND n.type in ('live_events') ".
					"ORDER BY d.field_event_date_value ASC";
			
			$result = db_query( $sql );	
		
			$vname_articles = array();
			foreach( $result as $record )	{
	
					$title = $record->title;
					$title = preg_replace("/&#?[a-z0-9]+;/i","",$title); // removes $nbsp
					$teaser  = getCleanBody( $record->body_value , 100 );
					$path = url(drupal_get_path_alias('node/' . $record->nid), array('absolute' => TRUE));	
					$node = node_load($record->nid , NULL, TRUE);
					$image_link = $record->field_image_cdn_link_value;
					
					$oDate = new DateTime($record->field_event_date_value);
					//$oDate->modify("-25200 second");
					$sDate = $oDate->format('F jS, Y'); // Event Start Date
					
					$oDate2 = new DateTime($record->field_event_date_value2);
					//$oDate2->modify("-25200 second");
					$sDate2 = $oDate2->format('F jS, Y'); // Event End Date
					
					$vocab_terms5 = _taxonomy_node_get_terms_by_vocabulary($node, 12 );
					foreach( $vocab_terms5 as $t )	{	$membership = $t->name; }
					
					$vocab_terms4 = _taxonomy_node_get_terms_by_vocabulary($node, $vid );
					foreach( $vocab_terms4 as $t )	{	$p_topic_description = $t->description; }
					
					$vocab_terms3 = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
					foreach( $vocab_terms3 as $t )	{	$author_name = $t->name; }
					
					$content_membership = "";
				    if( kabbalah_content_access_get_article_membership($membership) == FALSE ) $content_membership = $membership;
					
					
					$vname_articles[] = array(  'title' => $title , 
												'image_link' => $image_link ,
												'path' => $path , 
												'teaser' => $teaser , 
												'author' => $author_name , 
												'date_created' => $sDate ,
												'membership' => $content_membership,
												//'media_type' => $media_type
											  );							  	
			}
			
			$result_array[$vname] = array( "term_name" => $vname , "term_desc" =>  $p_topic_description  , "term_articles" => $vname_articles );
			
		}	
		
		echo json_encode( $result_array );
	}