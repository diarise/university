<?php  if ( user_is_logged_in() ) { ?>

<div id="bannerMarketingPage" class="bannerMarketingPageImgWrapper">
  <div id="bannerMarketingPageImg" class="bannerMarketingPagebg" style="background-image: url('<?php print $node->field_image_cdn_link['und'][0]['value']; ?>');">
	<div class="bannerMarketingPageImgTitle"><?php print $node->title; ?></div>
  </div>
<div class="bannerMarketingPageContent">
	<div id="bannerMarketingPageTeacherInfo"><div>Teachers:</div> 
		<span>
		<?php
			$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
			$authors_array = array();
			foreach ( $authors as $author ) 
			{
				$authors_array[] = $author->name;
			}
			echo implode(",</br>",$authors_array);
		?>	
		
		</span>
	</div> 
	<div id="bannerMarketingPagedescription"><div class='smallTextDesc'><?php print strip_tags($node->body['und'][0]['value']); ?></div><a class='readMoreLinkMarketing' href='#'>expand</a></div>
</div> 
</div>

<div id="courseMarketingPageContentWrapper">
	<div id="lessonListMarketing" class="courseMarketingPageContentWrapper">
		<!--<div id="courseMarketingPageListnbr">lessons in course</div>-->
	    <?php print render($page['marketingcourselessoncollection']); ?>
	</div>
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
