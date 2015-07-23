<?php  if ( user_is_logged_in() ) { ?>

<?php 

	//Get all the authors for this node
	$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
	foreach ( $authors as $author ) {	$authors_name[] = l( t($author->name) , 'taxonomy/term/' . $author->tid); }	
	// end of all authors 

?>

<div id="bannerMarketingPage" class="bannerMarketingPageImgWrapper">
	<div id="bannerMarketingPageImg" class="videoWrapper">
	  <div id="playerVideo">
		<?php print render($page['content']); // video player ?>
	  </div>
	</div>
	<div class="bannerMarketingPageContent">
		<div class="videoTitle">
			<h1><?php print $node->title; ?></h1>
		</div>     
		<div class="videoInfo">
			<div class="videoInfoTeacher">
				<div><span>teacher: </span><?php	echo implode( ", " , $authors_name ); // Author name 	?></div>
				<!--<div><span>duration:</span> 18 min</div>-->
			</div>
			<div class="videoSocialMedia">
				<div id="courseDescription" class="sharethis">
					<span class='st_facebook_large' displayText='Facebook'></span>
					<span class='st_twitter_large' displayText='Tweet' st_via='kabbalahcentre'></span>
					<span class='st_googleplus_large' displayText='Google +'></span>
					<span class='st_pinterest_large' displayText='Pinterest'></span>
					<span class='st_email_large' displayText='Email'></span>
					<span class='st_sharethis_large' displayText='ShareThis'></span>
				</div>
			</div>
		</div> 
		<div class="videoDescriptionWrapper">
			<?php  	print strip_tags($node->body['und'][0]['value']); ?>
		</div> 
		
		<?php if( sizeof( $node->field_lesson_resources) > 0  ) { ?>
		<div class="videoResourses">
			<span>RESOURCES </span>
			<?php
				// This is a way to display multiple entries for field collections 
				$wrapper = entity_metadata_wrapper('node', $node);
				 foreach ($wrapper->field_lesson_resources as $i)
				 {
					print "<a href='".$i->field_file_link->value()."' target='_blank' ><img src='/sites/all/themes/ukabbalah/images/pdfIcon.png' alt='resourceImg'/></a><a href='".$i->field_file_link->value()."' target='_blank' >".$i->field_file_description->value()."</a>";
					//print "<span class='resourceTitle'><a href='".$i->field_file_link->value()."' target='_blank' >".$i->field_file_description->value()."</a></span>";
				 }
			?>		
		</div>
		<?php }  ?>
		
	</div> 
</div>


<div id="courseMarketingPageContentWrapper" class="lessonsCourseListWrapper">
	<div class="lessonsCourseList"><p>more lessons in this course</p></div> 
	<?php print render($page['marketinglessonlessoncollection']); ?>
</div>

<div id="contactMarketingPageContentWrapper">
<div>Interested in learning more?</div>
<div><a href="www.kabbalah.com/student-support">Contact us</a></div>
</div>

<?php } else { ?>

<div class="nlvwrapperLoginBloc">
	<div class="wrapperLoginBloc" id="wrapperPrice">
		<div class="loginText">Join Kabbalah University to watch this video. Members get access to thousands of courses and events</div>
		<span class="buttonMember"><a href="http://idp.kabbalah.com">Become a member</a></span>
		<span class="priceLogin logColor"><a href="http://idp.kabbalah.com/user/login">Log in</a></span>
	</div>
</div>

<?php } ?> 