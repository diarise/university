<?php
	$membership_terms = _taxonomy_node_get_terms_by_vocabulary($node, 12 );
	foreach( $membership_terms as $t )	{	$membership = $t->name; }
	
	global $user;
?>

<div id="wrapperVideoSection">
	<div class="wrapperCours">
		<div id="contentAuthorImages">
			<img src="<?php print $node->field_image_cdn_link['und'][0]['value']; ?>" alt="" />
		</div>
		<div id="contentAuthorInfo">
				<div id="wrapperInfoCour">
					<div id="titleCourse"><?php print $node->title; ?></div>
					<?php if( sizeof( $node->field_subtitle ) > 0  ) { ?>
					<span id="supTitleCourse">
						<?php  print $node->field_subtitle['und'][0]['value']; ?>
					</span>
					<?php } ?>
					<span id="topicCourseTitle"> Topic:</span>
					<span id="topicCourse"> 
					<?php	
						foreach ($node->field_primary_topic as $term) 	{ $primary_topic = l( t($term[0]['taxonomy_term']->name) , 'taxonomy/term/' . $term[0]['taxonomy_term']->tid); }
						print $primary_topic; // Primary Topic 
					?>
					</span>
					<span class = "theCourseAuthorTitle">Teacher:
						<span class = "theCourseAuthor">
						<?php
							$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
							foreach ( $authors as $author ) {	echo "  <a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. "</a><span class='divider'> - </span>"; }	
						?>	
						</span>
					</span>
					
				</div>
		
			<?php if (user_is_logged_in() && !kabbalah_content_access_get_article_membership($membership)) {?>		
				<div id="wrapperPrice">
					<span class="buttonMemberDesc">This is a <?php print $membership; ?> course</span>
					<span class="buttonMember"><a href="https://idp.kabbalah.com/user/<?php print $user->uid; ?>/manage-subscription">upgrade your membership</a></span>
				</div>
			<?php } elseif( !user_is_logged_in()) { ?>
				<div id="wrapperPrice">
					<span class="buttonMember"><a href="https://idp.kabbalah.com">become a member</a></span>
					<span class="priceLogin"><a href="https://idp.kabbalah.com/user/login">log-in</a></span>
				</div>
			<?php } ?>
			
			
			<?php if( sizeof( $node->field_prerequisites ) > 0 )  { ?>
			<?php
				$prereq_array = array();
				foreach( $node->field_prerequisites['und'] as $p )
				{
					$prereq_array[] = "<a href='/node/".$p['nid']."'>".$p['node']->title ."</a>";
				}
			?>
				<!-- <span id="preReqsTitle"> Prerequisites Courses :</span>
				<span id="preReqs"><?php //print implode(", " , $prereq_array ); ?></span> --> 
			<?php } ?>

		</div>
	</div>
</div>

<?php if( $node->body['und'][0]['value'] != "" ) { ?>
	<div id="courseDescription">
		 	<div id="eSocial">
		 		<div id="language"><?php if($node->field_subtitles_present['und'][0]['value']) { ?>Language: EN | Selected classes have subtitles*<?php } ?></div>
				<div class="sharethis">
					<span class='st_facebook_large' displayText='Facebook'></span>
					<span class='st_twitter_large' displayText='Tweet' st_via='kabbalahcentre'></span>
					<span class='st_googleplus_large' displayText='Google +'></span>
					<span class='st_pinterest_large' displayText='Pinterest'></span>
					<span class='st_email_large' displayText='Email'></span>
					<span class='st_sharethis_large' displayText='ShareThis'></span>
				</div>
			</div>
			<div class="courseDescriptionWrapper">  
			<?php print $node->body['und'][0]['value']; // Course Description ?>
			</div>
	</div>
<?php } ?>