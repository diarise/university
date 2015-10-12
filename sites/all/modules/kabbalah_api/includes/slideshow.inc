<?php

	function getSlideshowData() {
	
		$sql = 	"SELECT n.nid,n.title,n.changed,il.field_event_image_cdn_link_value,b.body_value,plv.field_event_path_link_value,st.field_sub_title_value,cs.field_color_selector_value,dso.field_display_order_value ".
				"FROM node n ".
				"LEFT JOIN {node_revision nr} ON ( n.nid = nr.nid and n.vid = nr.vid ) ".
				"LEFT JOIN {field_revision_field_event_image_cdn_link il} ON ( nr.nid = il.entity_id AND nr.vid = il.revision_id ) ".
				"LEFT JOIN {field_revision_body b} ON ( nr.nid = b.entity_id AND nr.vid = b.revision_id ) ".
				"LEFT JOIN {field_revision_field_event_path_link plv} ON ( nr.nid = plv.entity_id AND nr.vid = plv.revision_id ) ".
				"LEFT JOIN {field_revision_field_sub_title st} ON ( nr.nid = st.entity_id AND nr.vid = st.revision_id ) ".
				"LEFT JOIN {field_revision_field_color_selector cs} ON ( nr.nid = cs.entity_id AND nr.vid = cs.revision_id ) ".
				"LEFT JOIN {field_revision_field_display_order dso} ON ( nr.nid = dso.entity_id AND nr.vid = dso.revision_id ) ".
				"WHERE n.status =1 ".
				"AND n.type = 'slideshow' ".
				"ORDER BY dso.field_display_order_value ASC,n.changed DESC";
	
		$result = db_query( $sql );
	
		$result_array = array();
			
		foreach ($result as $record) 
		{
			$path = $record->field_event_path_link_value;
			$title = $record->title;
			$title = preg_replace("/&#?[a-z0-9]+;/i","",$title); // removes $nbsp
			$subtitle = $record->field_sub_title_value;
			$subtitle = preg_replace("/&#?[a-z0-9]+;/i","",$subtitle); // removes $nbsp
			$teaser  = getCleanBody( $record->body_value , 0 );
			$result_array[] = array(  'path' => $path , 
									  'title' => $title , 
									  'subtitle' => $subtitle ,
									  'teaser' => $teaser,		
									  'field_color_selector_value' => $record->field_color_selector_value , 
									  'field_image_link_value' => image_style_url('slideshow_image', imagecache_external_generate_path( $record->field_event_image_cdn_link_value ) ) );	
		}
		echo json_encode( $result_array );	
	}
  
 