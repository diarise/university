<?php

	function getLiveEventsData() {
	
		$result_array = array();				
		
		$sql =  "SELECT n.nid,n.title,il.field_image_cdn_link_value,b.body_value,n.changed,d.field_event_date_value,d.field_event_date_value2 ".
				"FROM {node n} ".
				"LEFT JOIN {node_revision nr} ON ( n.nid = nr.nid and n.vid = nr.vid ) ".
				"LEFT JOIN {field_data_field_image_cdn_link il} ON ( nr.nid = il.entity_id AND nr.vid = il.revision_id ) ".
				"LEFT JOIN {field_revision_body b} ON ( nr.nid = b.entity_id AND nr.vid = b.revision_id ) ".
				"LEFT JOIN {field_data_field_event_date d} ON ( nr.nid = d.entity_id AND nr.vid = d.revision_id ) ".
				"WHERE n.status =1 ".
				"AND n.type in ('live_events') ".
				"ORDER BY d.field_event_date_value ASC";
		
		$result = db_query( $sql );	
		foreach( $result as $record )	
		{
				$title = $record->title;
				$title = preg_replace("/&#?[a-z0-9]+;/i","",$title); // removes $nbsp
				$teaser  = getCleanBody( $record->body_value , 100 );
				$path = url(drupal_get_path_alias('node/' . $record->nid), array('absolute' => TRUE));	
				$node = node_load($record->nid , NULL, TRUE);
				$image_link = $record->field_image_cdn_link_value;
				
				$oDate = new DateTime($record->field_event_date_value);
				$sDate = $oDate->format('F jS, Y'); // Event Start Date
				
				$oDate2 = new DateTime($record->field_event_date_value2);
				$sDate2 = $oDate2->format('F jS, Y'); // Event End Date
				
				$vocab_terms5 = _taxonomy_node_get_terms_by_vocabulary($node, 12 );
				foreach( $vocab_terms5 as $t )	{	$membership = $t->name; }
			
				
				$vocab_terms3 = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
				foreach( $vocab_terms3 as $t )	{	$author_name = $t->name; }
				
				$vocab_terms4 = _taxonomy_node_get_terms_by_vocabulary($node, 17 );
				foreach( $vocab_terms4 as $t )	{	$location_name = $t->name; }

				$result_array[] = array(  'title' => $title , 
											'image_link' => $image_link ,
											'path' => $path , 
											'teaser' => $teaser , 
											'author' => $author_name , 
											'date_created' => $sDate ,
											'membership' => $membership,
											'location' => $location_name
										  );							  	
		}
	
		echo json_encode( $result_array );
	}