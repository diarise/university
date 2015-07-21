<div id="bannerMarketingPage" class="bannerMarketingPageImgWrapper">
  <div id="bannerMarketingPageImg" style="background-image: url("<?php print $node->field_image_cdn_link['und'][0]['value']; ?>");"></div>
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
	<div><a href="#">Contact us</a></div>
</div>