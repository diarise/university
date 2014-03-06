<div id="wrapperVideoSection">
	<div class="wrapperCours">
		<div id="contentAuthorImages">
			<img src="<?php print $node->field_image_cdn_link['und'][0]['value']; ?>">
		</div>
		<div id="contentAuthorInfo">
				<div id="wrapperInfoCour">
					<span id="titleCourse"><?php print $node->title; ?> </span>
					
					<span id="topicCourseTitle"> Topic:</span>
					<span id="topicCourse"> 
					
					</span>
					<span class="theCourseAuthorTitle">Teacher:
						<span class = "theCourseAuthor">
						<?php
							$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
							foreach ( $authors as $author ) {	echo "  <a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. "</a><span class='divider'> - </span>"; }	
						?>	
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



