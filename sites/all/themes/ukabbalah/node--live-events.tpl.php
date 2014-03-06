<div id="wrapperVideoSection">
	<div class="wrapperCours">
		<div id="contentAuthorImages">
			<img src="<?php print $node->field_image_cdn_link['und'][0]['value']; ?>">
		</div>
		<div id="contentAuthorInfo">
				<div id="wrapperInfoCour">
					<span id="titleCourse"><?php print $node->title; ?> </span>
					<?php //if( sizeof( $node->field_subtitle ) > 0  ) { ?>
					<span id="topicCourseTitle"> Topic:</span>
					<span id="topicCourse"> 
					<?php	
						foreach ($node->field_primary_topic as $term) 	{ $primary_topic = l( t($term[0]['taxonomy_term']->name) , 'taxonomy/term/' . $term[0]['taxonomy_term']->tid); }
						print $primary_topic; // Primary Topic 
					?>
					</span>
					<span class="theCourseAuthorTitle">Teacher:
						<span class="theCourseAuthor">
						  <a class="Eitan Yardeni" href="javascript:void(0)">teacher text</a>	
						</span>
					</span>
					
				</div>
		
				<div id="wrapperPrice">
						<span class="buttonMember"><a href="#">become a member</a></span>
						<span class="priceLogin"><a href="#">log-in</a></span>
				</div>
			
			
			
		</div>
	</div>
</div>



