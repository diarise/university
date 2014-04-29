<?php 

	$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
	foreach ( $authors as $author ) {	$authors_name[] = l( t($author->name) , 'taxonomy/term/' . $author->tid); }	
	
	$secondary_parent_topics = array();
	foreach ($node->field_secondary_topic['und'] as $term) 	
	{ 
		if( sizeof( taxonomy_get_parents($term['taxonomy_term']->tid) ) == 0  )
		{
			$secondary_parent_topics[] = l( t($term['taxonomy_term']->name) , 'taxonomy/term/' . $term['taxonomy_term']->tid);
		}
	}
	
	$vocab_terms = _taxonomy_node_get_terms_by_vocabulary($node, 14 );
	foreach( $vocab_terms as $t )	{	$primary_topic = $t->name; }
	
	
	$membership_terms = _taxonomy_node_get_terms_by_vocabulary($node, 12 );
	foreach( $membership_terms as $t )	{	$membership = $t->name; }
	
	$title = $node->title;
	
	if( sizeof( $node->field_course_list) > 0  )
	{
		$course_list_title = $node->field_course_list['und'][0]['node']->title;
		$list_subtitle = $node->field_course_list['und'][0]['node']->field_subtitle['und'][0]['value'];
	}	
	if( sizeof( $node->field_event_list) > 0  ) 
	{
		$event_list_title = $node->field_event_list['und'][0]['node']->title;
		$list_subtitle = $node->field_event_list['und'][0]['node']->field_subtitle['und'][0]['value'];
	}	
	
	if( $course_list_title ) {	$course_title = $course_list_title;	} else { $course_title = $event_list_title;	}	

	// Video or Audio Display
	foreach ($node->field_type_of_lesson as $term) 	{ 	$field_type_of_lesson = $term[0]['taxonomy_term']->name; }
	?>
	<div id="wrapperVideoSection"><!--start video wrapper section-->
	<?php
	if( $field_type_of_lesson == 'Audio' ) { ?>
<?  } else if( $field_type_of_lesson == 'Video' ) { ?>

	<?php } 
	if (kabbalah_content_access_get_article_membership($membership) ) {?>	

	<div class="videocontent"><!--start of video content when user log in-->
		<?php
			
			if( $field_type_of_lesson == 'Audio' ) {
		?>
			<div id="audio-control"> 
				<?php print render($content['field_audio_link']); ?>
			</div>
		<?php 
				} else if( $field_type_of_lesson == 'Video' ) { 
		?>
		<div id="videoSocialIconeWrapper">
			<div id="video-control"> 
				<?php print render($content['field_lesson_video']);  } ?>
			</div>
			
				<?php if( $field_type_of_lesson == 'Audio' ) { ?>
				<div id="eSocial" class="audiosocialmedia"> 
				<?php }else {?>
				<div id="eSocial"> <!--start of social media icone-->
				<?php }?>
				<div class="sharethis">
					<span class='st_facebook_large' displayText='Facebook'></span>
					<span class='st_twitter_large' displayText='Tweet' st_via='kabbalahcentre'></span>
					<span class='st_googleplus_large' displayText='Google +'></span>
					<span class='st_pinterest_large' displayText='Pinterest'></span>
					<span class='st_email_large' displayText='Email'></span>
					<span class='st_sharethis_large' displayText='ShareThis'></span>
				</div>
			</div> <!--start of social media icone-->
		</div>
		
		<?php 	if( $field_type_of_lesson == 'Video' ) { ?>
		<div id="audioDownloadLink"><a href='http://twistassets.kabbalah.com/videos/<?php print $node->field_lesson_video['und'][0]['twistage_existing_videos'];?>/formats/Small_640x360_300kbps_64kbps_h264/file.mp3' target='_blank'>Download <span>AUDIO</span></a></div>		
		<?php } ?>
	
	
	
	</div><!--end of of video content when user log in-->
	<?php  } else {
		
		$course_nid= node_load($node->field_course_list['und'][0]['node']->nid);
		?>
		
		<div class="preVideoImg"><!--start preview video for user log out-->
			<?php if( $field_type_of_lesson == 'Video' ) {?>
		<img src="http://twistassets.kabbalah.com/videos/<?php print $node->field_lesson_video['und'][0]['twistage_existing_videos'];?>/screenshots/620w.jpg" alt="" > <!--image for video preview-->
		<?php } else{ ?>
			<img src="<?php print $course_nid->field_image_cdn_link['und'][0]['value']; ?>" alt="" /> <!--image for video preview-->
			<?php } ?>
		
		<div class="videotitles"><!--start of preview video description-->
			<div id="wrapperInfoMultimedia">
				<span id="titleMultimedia"><?php print $title; // Title ?></span>
				<span id="courseNameMultimedia"><?php  print $course_title;	?><?php if( $list_subtitle != "" ) print " | ".$list_subtitle; ?></span>
				<span class="pipe">|</span>
				<span id="primaryTopicMultimedia">
				<?php	
					echo $primary_topic;
					//echo implode( ", " , $secondary_parent_topics ); 
				?>
				</span>
			</div>
			<div id="wrapperAuthorDate">
				<span id="authorNameMultimedia">
				<?php	echo implode( ", " , $authors_name ); // Author name 	?>
				</span>
				<span id="dateMultimedia">
				<?php
					if( sizeof($node->field_recorded_date) > 0 ) print date('F jS, Y ',strtotime($node->field_recorded_date['und'][0]['value'])); // Date Node Changed
				?>
				</span>
			</div>
		</div><!--end of preview video description-->
			
		<?php if (user_is_logged_in() && !kabbalah_content_access_get_article_membership($membership) ) {?>		
			<div id="wrapperPrice">
				<span class="buttonMember"><a href="http://profile.kabbalah.com/user/dashboard">upgrade your membership</a></span>
			</div>
		<?php } elseif( !user_is_logged_in()) { ?>
			<div id="wrapperPrice">
				<span class="buttonMember"><a href="http://profile.kabbalah.com">become a member</a></span>
				<span class="priceLogin"><a href="http://university.kabbalah.com/saml_login">log-in</a></span>
			</div>
		<?php } ?>
			
		<div class="sharethis"><!--start of social media icone-->
			<span class='st_facebook_large' displayText='Facebook'></span>
			<span class='st_twitter_large' displayText='Tweet' st_via='kabbalahcentre'></span>
			<span class='st_googleplus_large' displayText='Google +'></span>
			<span class='st_pinterest_large' displayText='Pinterest'></span>
			<span class='st_email_large' displayText='Email'></span>
			<span class='st_sharethis_large' displayText='ShareThis'></span>
		</div><!--start of social media icone-->
	</div><!--end preview video for user log out-->
		
	<?php }	?>
	
</div><!--end of video wrapper section-->

<?php  if (user_is_logged_in()) {?>

	<div id="videoTitlesWrapper"> <!--strat for video description when user log in-->
		<div class="videotitles">
			<div id="wrapperInfoMultimedia">
				<span id="titleMultimedia"><?php print $title; // Title ?></span>
				<span id="courseNameMultimedia"><?php  print $course_title;	?><?php if( $list_subtitle != "" ) print " | ".$list_subtitle; ?></span>
				<span class="pipe">|</span>
				<span id="primaryTopicMultimedia">
				<?php	
					echo $primary_topic;
					//echo implode( ", " , $secondary_parent_topics ); 
				?>
				</span>
			</div>
			<div id="wrapperAuthorDate">
				<span id="authorNameMultimedia">
				<?php echo implode( ", " , $authors_name ); // Author name ?>
				</span>
				<span id="dateMultimedia">
				<?php
					if( sizeof($node->field_recorded_date) > 0 ) print date('F jS, Y',strtotime($node->field_recorded_date['und'][0]['value'])); // Date Node Changed
				?>
				</span>
			</div>
			<span class="bookmark">
				<?php print flag_create_link('bookmarks', $node->nid); ?>
			</span>
		</div>
	</div><!--end of video description when user log in-->

<?php } ?>

	<div class="videoContent">
		
		<!-- Class Description -->
		<?php 
		
		if( sizeof( $node->body) > 0  ) {
		if( $node->body['und'][0]['value'] != "" ) { ?>
			<div id="classesDescription">
				<input type="checkbox" id="ac-0">
				<label  class="titleDescription" for="ac-0">class description</label>
				<div class="accordion"><?php  	print $node->body['und'][0]['value']; ?></div>
			</div>
		<?php } 
		}
		?>
		
		<!-- Class Highlights -->
		<?php if( sizeof( $node->field_lesson_highlights) > 0  ) { ?>
		<?php if( $node->field_lesson_highlights['und'][0]['value'] != "" ) { ?>
		<div id="classHighlights">
			<input type="checkbox" id="ac-1">
			<label class="titleDescription" for="ac-1">Highlights</label>
			<div class="accordion"><?php print $node->field_lesson_highlights['und'][0]['value']; ?></div>
		</div>
		<?php } ?>
		<?php } ?>
		
		<!-- Class Rsources -->
		<?php if( sizeof( $node->field_lesson_resources) > 0  ) { ?>
		<div class="titleDescription">Resources</div>
		<div id="classResources">
			<?php
				// This is a way to display multiple entries for field collections 
				$wrapper = entity_metadata_wrapper('node', $node);
				 foreach ($wrapper->field_lesson_resources as $i)
				 {
					print "<a href='".$i->field_file_link->value()."' target='_blank' ><span class='resourceFile'></span></a>";
					print "<span class='resourceTitle'><a href='".$i->field_file_link->value()."' target='_blank' >".$i->field_file_description->value()."</a></span>";
				 }
			?>
		</div>	
		<?php } ?>
		<?php if($secondary_parent_topics) { ?>
		<div class='keywords'><?php echo implode( ", " , $secondary_parent_topics ); ?></div>		
		<?php } ?>
	</div><!--end of videocontent-->

