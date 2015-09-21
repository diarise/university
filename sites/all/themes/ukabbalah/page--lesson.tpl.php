<main id="pageregion">
	<?php print $messages; ?>
    <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
<?php 

	global $user;
	
	//Get all the authors for this node
	$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
	foreach ( $authors as $author ) {	$authors_name[] = l( t($author->name) , 'taxonomy/term/' . $author->tid); }	
	// end of all authors 

	// Get all the secondary topics for this node
	$secondary_parent_topics = array();
	foreach ($node->field_secondary_topic['und'] as $term) 	
	{ 
		if( sizeof( taxonomy_get_parents($term['taxonomy_term']->tid) ) == 0  )
		{
			$secondary_parent_topics[] = l( t($term['taxonomy_term']->name) , 'taxonomy/term/' . $term['taxonomy_term']->tid);
		}
	}
	// end of secondary topics

	// get it primary topic
	
	$primary_topic = array();
	foreach ($node->field_primary_topic['und'] as $term) 	
	{ 
		$primary_topic[] = l( t($term['taxonomy_term']->name) , 'taxonomy/term/' . $term['taxonomy_term']->tid);
		
	}

	//$vocab_terms = _taxonomy_node_get_terms_by_vocabulary($node, 14 );
	//foreach( $vocab_terms as $t )	{	$primary_topic = $t->name; }
	// end of primary topic

	// get it membership
	$membership_terms = _taxonomy_node_get_terms_by_vocabulary($node, 12 );
	foreach( $membership_terms as $t )	{	$membership = $t->name; }
	// end of membership

	// get cours title
	$title = $node->title;
	
	if( sizeof( $node->field_course_list) > 0  )
	{
		$course_list_title = $node->field_course_list['und'][0]['node']->title;
		$list_subtitle = $node->field_course_list['und'][0]['node']->field_subtitle['und'][0]['value'];
		$course_path = url(drupal_get_path_alias('node/' . $node->field_course_list['und'][0]['nid']), array('absolute' => TRUE));
	}	
	if( sizeof( $node->field_event_list) > 0  ) 
	{
		$event_list_title = $node->field_event_list['und'][0]['node']->title;
		$list_subtitle = $node->field_event_list['und'][0]['node']->field_subtitle['und'][0]['value'];
		$course_path = url(drupal_get_path_alias('node/' . $node->field_course_list['und'][0]['nid']), array('absolute' => TRUE));
	}	
	if( sizeof( $node->field_event_list) > 0  ) 
	{
		$event_list_title = $node->field_event_list['und'][0]['node']->title;
		$list_subtitle = $node->field_event_list['und'][0]['node']->field_subtitle['und'][0]['value'];
		$course_path = url(drupal_get_path_alias('node/' . $node->field_event_list['und'][0]['nid']), array('absolute' => TRUE));
	}	
	
	if( $course_list_title ) {	$course_title = $course_list_title;	} else { $course_title = $event_list_title;	}	
	// end of cours title
	
	// Video or Audio Display
	foreach ($node->field_type_of_lesson as $term) 	{ 	$field_type_of_lesson = $term[0]['taxonomy_term']->name; }
	
	?>



<!--Audio Section-->
<?php if( $field_type_of_lesson == 'Audio' ) { ?>
	<div id="wrapperVideoSection" class="wrapperPreviewLesson noLoginBg">
	<?php if ( kabbalah_content_access_get_article_membership($membership) ) { ?>
		
			<div class="videocontent">
				<div id="audio-control">
					<?php //print render($content['field_audio_link']); ?>
					<?php print render($page['content']); // audio player?>
				</div>
					<div id="wrapperDownloadAudio" class="audioWrapperDownload">
						<div class="buttonDownloadAudio">
							<a href='<?php print $node->field_audio_link['und'][0]['value'];?>' target='_blank'><span>Download audio	</span> <img alt="download audio" src="/sites/all/themes/ukabbalah/images/audioDownloadBtn.jpg"></a>
						</div>
					</div>
				</div>	<!--End of videocontent-->	
				
	<?php } else { ?>

	<?php //$course_nid = node_load($node->field_course_list['und'][0]['node']->nid); ?>
	<?php 
	
		
		if( sizeof( $node->field_course_list) > 0  ) $course_nid = node_load($node->field_course_list['und'][0]['node']->nid); 
		if( sizeof( $node->field_event_list) > 0  )  $course_nid = node_load($node->field_event_list['und'][0]['node']->nid); 
	?>
		
		<div class="preVideoImg">
					<div class="overImageOpacity"></div>
					<img src="<?php print $course_nid->field_image_cdn_link['und'][0]['value']; ?>" alt="" > <!--image for audio preview-->					
				</div><!--end of preVideoImg-->
				<div class="preVideoDetail">
					<div class="wrapperVideoDetailText">
						<div id="titleMultimedia"><?php print $title; // Title ?></div>
						<div class="courseTitlePrev">course: <a href="<?php print $course_path; ?>"> <?php  print $course_title;	?></a><?php if( $list_subtitle != "" ) print " | ".$list_subtitle; ?></div>
						<div class="courseTeacherPrev">
							<span class="lessonTeacherName">teacher: <?php	echo implode( ", " , $authors_name ); // Author name 	?></span>
							<span class="gutter">|</span>
							<span class="lessonTtopicName">topic: <?php	echo implode( ", " , $primary_topic ); ?></span> 
						</div>
						<div class="wrapperVideoInfo">date:
							<?php
								if( sizeof($node->field_recorded_date) > 0 ) print date('F jS, Y ',strtotime($node->field_recorded_date['und'][0]['value'])); // Date Node Changed
							?>
							</div>
					</div>
					<div class="wrapperVideoDetailButton">
						<?php if (user_is_logged_in() && !kabbalah_content_access_get_article_membership($membership) ) {?>		
						
							<span class="buttonMemberDesc upgradeLesson">This is a <?php print $membership; ?> lesson</span>
							<span class="buttonMember upgradeLesson"><a href="https://idp.kabbalah.com/user/<?php print $user->uid; ?>/manage-subscription">upgrade your membership</a></span>
						
					<?php } elseif( !user_is_logged_in()) { ?>
						
							<span class="buttonMember"><a href="https://idp.kabbalah.com">Become a member</a></span>
							<span class="priceLogin"><a href="https://university.kabbalah.com/user/login?destination=<?php echo get_current_url(); ?>">Log in</a></span>
						
					<?php } ?>
					</div>
				</div>

	<?php }?>
	</div>
<?php } ?>
<!--End of audio Section-->

<!-- Video section -->
<?php if( $field_type_of_lesson == 'Video' ) { ?>
	
	<?php if ( kabbalah_content_access_get_article_membership($membership) ) { ?>
		<div id="wrapperVideoSection" class="wrapperPreviewLesson">
			<div id="videoSocialIconeWrapper">
				<div id="video-control">
					<?php print render($page['content']); // video player?>
				</div>
					
			</div>
		</div>
	<?php } else { ?>
		<div id="wrapperVideoSection" class="wrapperPreviewLesson noLoginBg">
				<div class="preVideoImg">
					<div class="overImageOpacity"></div>
					<img src="http://twistassets.kabbalah.com/videos/<?php print $node->field_lesson_video['und'][0]['twistage_existing_videos'];?>/screenshots/620w.jpg" alt="" > <!--image for video preview-->					
				</div><!--end of preVideoImg-->
				<div class="preVideoDetail">
					<div class="wrapperVideoDetailText">
						<div id="titleMultimedia"><?php print $title; // Title ?></div>
						<div class="courseTitlePrev">course: <a href="<?php print $course_path; ?>"> <?php  print $course_title;	?></a><?php if( $list_subtitle != "" ) print " | ".$list_subtitle; ?></div>
						<div class="courseTeacherPrev">
							<span class="lessonTeacherName">teacher: <?php	echo implode( ", " , $authors_name ); // Author name 	?></span>
							<span class="gutter">|</span>
							<span class="lessonTtopicName">topic: <?php	echo implode( ", " , $primary_topic ); ?></span> 
						</div>
						<div class="wrapperVideoInfo">date:
							<?php
								if( sizeof($node->field_recorded_date) > 0 ) print date('F jS, Y ',strtotime($node->field_recorded_date['und'][0]['value'])); // Date Node Changed
							?>
							</div>
					</div>
					<div class="wrapperVideoDetailButton">
						<?php if (user_is_logged_in() && !kabbalah_content_access_get_article_membership($membership) ) {?>		
						
							<span class="buttonMemberDesc upgradeLesson">This is a <?php print $membership; ?> lesson</span>
							<span class="buttonMember upgradeLesson"><a href="https://idp.kabbalah.com/user/<?php print $user->uid; ?>/manage-subscription">upgrade your membership</a></span>
						
					<?php } elseif( !user_is_logged_in()) { ?>
						
							<span class="buttonMember"><a href="http://idp.kabbalah.com">Become a member</a></span>
							<span class="priceLogin"><a href="https://idp.kabbalah.com/user/login?destination=<?php echo get_current_url(); ?>">Log in</a></span>
						
					<?php } ?>
					</div>
				</div>
				<div class="transcript">
					<div class="wrapperTranscript">
						Transcript is available	
					</div>
				</div>
			</div>
	<?php }?>
	
<?php } ?>
<!--End of Video Section-->

<!-- Title Section for logged in user -->
<?php  if (user_is_logged_in() || isset($membership) === FALSE ) { ?>

<?php } ?>
<!-- End of Title Section for logged in user -->
</main>






<div id="wrappperBloc">
	<div id="wrappperLeftBloc">
		<?php
			 $course_list_title ="";
			 $event_list_title = "";
		 
			 if( sizeof( $node->field_course_list) > 0  ) $course_list_title = $node->field_course_list['und'][0]['node']->title;
			 if( sizeof( $node->field_event_list) > 0  ) $event_list_title = $node->field_event_list['und'][0]['node']->title;

			if($course_list_title != ""){
		?>
			<div class="lessonCollectionSection">
				<?php print render($page['courselessoncollection']); ?>
			</div>

		<?php }

			if($event_list_title !=""){?>

			<div class="lessonCollectionSection">
				<?php print render($page['lessoneventcollection']); ?>
			</div>

		  <?php } ?>
	</div>

	<div id="wrappperRightBloc">	
		<div id="tabs">
		  	<ul>
			    <?php if( $course_list_title ) {	?>                                  
					<li><a href="#fragment-1"><span>Course details</span></a></li>
			    <?php } else { ?>
					<li><a href="#fragment-1"><span>Event details</span></a></li>
				<?php } ?> 
				
				<?php if( $course_list_title ) {	?>                                  
					<li><a href="#fragment-2"><span>Lesson details</span></a></li>
			    <?php } else { ?>
					<li><a href="#fragment-2"><span>Lecture details</span></a></li>
				<?php } ?>
			    <li><a href="#fragment-3"><span>F A Q</span></a></li>
		  	</ul>
		  	<div id="fragment-1">
			  	<div class="wrapperTitle">
			  	<?php //print $node->title; ?>
			  	<?php print $course_title; ?><?php if( $list_subtitle != "" ) print " | ".$list_subtitle; ?>
			  	</div>
		  	
		  	<span id="topicCourseTitle"> Topic:</span>
			<span id="topicCourse"> 
				<?php	
					foreach ($node->field_primary_topic as $term) 	{ $primary_topic = l( t($term[0]['taxonomy_term']->name) , 'taxonomy/term/' . $term[0]['taxonomy_term']->tid); }
					print $primary_topic; // Primary Topic 
				?>
			</span>

				<div class="theCourseAuthor">
					<?php

						$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
						foreach ( $authors as $author ) {
							$name = str_replace(' ', '_', $author->name);
							//echo "<span class='authorImage'><a href='javascript:void(0)' class = '".$author->name."'><img src='/sites/all/themes/ukabbalah/images/".$name.".jpg' alt='".$author->name."' ></a><a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. " </a></span>"; 
							
							if (preg_match('/David Mats/',$author->name)) 
							echo "<span class='authorImage'><a href='javascript:void(0)' class = '".$author->name."'><img src='/sites/all/themes/ukabbalah/images/David_Mats.jpg' alt='".$author->name."' ></a><a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. " </a></span>"; 	
							elseif (preg_match('/Yitzhak Sinwani/',$author->name)) 
							echo "<span class='authorImage'><a href='javascript:void(0)' class = '".$author->name."'><img src='/sites/all/themes/ukabbalah/images/Yitzhak_Sinwani.jpg' alt='".$author->name."' ></a><a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. " </a></span>"; 	
							else
							echo "<span class='authorImage'><a href='javascript:void(0)' class = '".$author->name."'><img src='/sites/all/themes/ukabbalah/images/".$name.".jpg' alt='".$author->name."' ></a><a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. " </a></span>"; 
											
						}
					?>	
				</div>

				<div class="description">
		    		<?php //print $node->body['und'][0]['value']; // Course Description ?>
		    		<?php 
							if( sizeof( $node->field_course_list) > 0  ) print $node->field_course_list['und'][0]['node']->body['und'][0]['value']; 
							if( sizeof( $node->field_event_list) > 0  ) print $node->field_event_list['und'][0]['node']->body['und'][0]['value']; 
					?>
				</div>
		    
		    </div>

		    <div id="fragment-2">
			    	
						<div id="courseDescription">
							<div class="sharethis">
								<span class='st_facebook_large' displayText='Facebook'></span>
								<span class='st_twitter_large' displayText='Tweet' st_via='kabbalahcentre'></span>
								<span class='st_googleplus_large' displayText='Google +'></span>
								<span class='st_pinterest_large' displayText='Pinterest'></span>
								<span class='st_email_large' displayText='Email'></span>
								<span class='st_sharethis_large' displayText='ShareThis'></span>
							</div>
							<?php if (user_is_logged_in() ) {?>
							<div class="bookmark"><?php print flag_create_link('bookmarks', $node->nid); ?></div>
							<?php } ?>
						</div>
					

				<div class="wrapperTitle">
			  	    <?php print $node->title; ?>
			    </div>

			    <?php //if (user_is_logged_in() ) {?>
						<div class="lessonDetailsInfo">
							<label class="coursLabelBold">course: </label> 
							<?php  
									//$course_path = url(drupal_get_path_alias('node/' . $node->field_course_list['und'][0]['node']->nid), array('absolute' => TRUE));
									print "<a class='coursTitleBold' href='".$course_path."'>".$course_title."</a>";	
							?>
						</div>
						<div class="lessonDetailsInfo">
							<label>teacher: </label>
							<?php	echo implode( ", " , $authors_name ); // Author name 	?>							 
						</div>
						<div class="lessonDetailsInfo">
							<label>topic: </label>
							<?php	//echo implode( ", " , $primary_topic );
								foreach ($node->field_primary_topic as $term) 	{ $primary_topic = l( t($term[0]['taxonomy_term']->name) , 'taxonomy/term/' . $term[0]['taxonomy_term']->tid); }
								print $primary_topic; // Primary Topic 
							 ?>
						</div>
						<div class="lessonDetailsInfo">
							
							<label>date: </label>
								<?php
									if( sizeof($node->field_recorded_date) > 0 ) print date('F jS, Y ',strtotime($node->field_recorded_date['und'][0]['value'])); // Date Node Changed
								?>
						</div>
						<!-- <div class="lessonDetailsInfo">
							<label>subtitles: </label>
							<?php //print $node->field_lesson_video['und'][0]['default_language']; ?>
						</div> -->
			    <?php //} ?>
			    	
		    <div class="wrapperDescription">
		
			<!-- Class Description -->
			
			<div class="description">
				<?php 
				if( sizeof( $node->body) > 0  ) {
				if( $node->body['und'][0]['value'] != "" ) { ?>
					<span class="descriptionLabel"><?php if( $course_list_title ) {	print "class description";	} else { print "event description";	} ?></span>
					<?php  	print $node->body['und'][0]['value']; ?>

				    <?php } 
				}
				?>
			</div>
			<!-- End of Class Description -->
			
			<!-- Class Highlights -->
			<?php if( sizeof( $node->field_lesson_highlights) > 0  ) { ?>
			<?php if( $node->field_lesson_highlights['und'][0]['value'] != "" ) { ?>
			
				<span class="highlightsLabel">Highlights</span>
				<div class="highlightsWrapper"><?php print $node->field_lesson_highlights['und'][0]['value']; ?></div>
			<!-- </div> -->
			<?php } ?>
			<?php } ?>
			<!-- End of Class Highlights -->	
			
			<!-- Class Resources -->
			<?php if (user_is_logged_in() ) {?>
				<?php if( sizeof( $node->field_lesson_resources) > 0  ) { ?>
				<div class="resourcesLabel">Resources</div>
				<div class="wrapperResources">
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
			<?php } ?>	
			<!-- End of Class Resources -->
			
			<!-- Class Keywords -->
			<?php if($secondary_parent_topics) { ?>
				<div class="wrapperTags">
				<span class="tagsLabel">tags</span>
					<?php echo implode( ", " , $secondary_parent_topics ); ?>
				</div>		
			<?php } ?>
			<!-- End of Class Keywords -->
	
				</div>
		    </div>

		    <div id="fragment-3">
		    <a class="faq" href="http://kabbalah.com/faq" target="_blanc">Click here for FAQ </a>
		  	</div>
		</div>

		<?php if (user_is_logged_in() && !kabbalah_content_access_get_article_membership($membership)) {?>		
			<div class="wrapperLoginBloc upgradeLessonBottom" id="wrapperPrice">
				<span class="buttonMemberDesc">This is a <?php print $membership; ?> course</span>
				<span class="buttonMember"><a href="https://idp.kabbalah.com/user/<?php print $user->uid; ?>/manage-subscription">upgrade your membership</a></span>
			</div>
				<?php } elseif( !user_is_logged_in()) { ?>
			<div class="wrapperLoginBloc" id="wrapperPrice">
				<div class="loginText">Join Kabbalah University to watch this video. Members get access to thousands of courses and events</div>
				<span class="buttonMember"><a href="http://idps.kabbalah.com">Become a member</a></span>
				<span class="priceLogin logColor"><a href="https://idp.kabbalah.com/user/login?destination=<?php echo get_current_url(); ?>">Log in</a></span>
			</div>
				<?php } ?>
		 
		<script>
			$( "#tabs" ).tabs({ active: 1 });
		</script>
		
	</div>
</div>


<!-- comments section -->
<div class='commentsSection'>
	<div class="commentingText">Please share your thoughts with our online student community. 
	After posting, your comment will be submitted for approval and published soon. 
	For assistance with technical problems, using the site or with your account or to share suggestions, please contact <a href="mailto:care@ukabbalah.com" target="_blank">care@ukabbalah.com</a>.</div>
	<?php print render($page['comments']); ?>
</div>


