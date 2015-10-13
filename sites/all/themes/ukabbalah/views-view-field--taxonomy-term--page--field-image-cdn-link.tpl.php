<?php 

	if( $row->_field_data['nid']['entity']->type == "lesson")
	{	
		if( $row->_field_data['nid']['entity']->field_type_of_lesson['und'][0]['tid']== 554 ) 
		{ 
			if( sizeof( $row->_field_data['nid']['entity']->field_course_list) > 0  ) $course_nid = node_load($row->_field_data['nid']['entity']->field_course_list['und'][0]['nid']); 
			if( sizeof( $row->_field_data['nid']['entity']->field_event_list) > 0  )  $course_nid = node_load($row->_field_data['nid']['entity']->field_event_list['und'][0]['nid']); 	
			$image_url = $course_nid->field_image_cdn_link['und'][0]['value'];
			$output = theme('imagecache_external', array('path' => $image_url ,'style_name'=> 'carousal_image', )); 
		} 
	}
	//if($output)	print "<span class = 'imagesCont'><img src ='".$output."' class = 'theImage'  alt=''/>";
	if($output)	print "<span class = 'imagesCont'>".$output;
	else print $output;	
	
?>