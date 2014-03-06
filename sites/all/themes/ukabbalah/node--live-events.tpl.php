<div id="wrapperVideoSection">
	<div class="wrapperCours">
		<div id="contentAuthorImages">
			<img src="<?php print $node->field_image_cdn_link['und'][0]['value']; ?>">
		</div>
		<div id="contentAuthorInfo">
				<div id="wrapperInfoCour">
					<span id="titleCourse"><?php print $node->title; ?> </span>
					
					
					<span class="theCourseAuthorTitle">Teacher:
						<span class = "theCourseAuthor">
							<?php
							$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
							foreach ( $authors as $author ) {	echo "  <a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. "</a><span class='divider'> - </span>"; }	
						?>
						</span>
					</span>
					
					<?php
					
						$oDate = new DateTime($node->field_event_date['und'][0]['value']);
						//$oDate->modify("-25200 second");
						$sDate = $oDate->format('F jS, Y H:i'); // Event Start Date Y H:i A
						
						$oDate2 = new DateTime($node->field_event_date['und'][0]['value2']);
						//$oDate2->modify("-25200 second");
						$sDate2 = $oDate2->format('F jS, Y H:i'); // Event End Date
					
					
					?>
					
					<span id="topicCourseTitle"> Start Date:</span>
					<span id="topicCourse"><?php print $sDate;?> ( 24 hr clock ) </span>
					
					<span id="topicCourseTitle"> End Date:</span>
					<span id="topicCourse"><?php print $sDate2;?> ( 24 hr clock ) </span>
					
					
					<span class="theCourseAuthorTitle">Location:
						<span class = "theCourseAuthor">
							<?php
							$locations = _taxonomy_node_get_terms_by_vocabulary($node, 17 );
							foreach ( $locations as $location ) {	echo $location->name; }	
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



<?php if( $node->body['und'][0]['value'] != "" ) { ?>
	<div id="courseDescription">
		 	<div id="eSocial">
		 		<div id="language">Language: EN | Selected classes have subtitles*</div>
				<div class="sharethis">
					<span displaytext="Facebook" class="st_facebook_large" st_processed="yes"><span style="text-decoration:none;color:#000000;display:inline-block;cursor:pointer;" class="stButton"><span class="stLarge" style="background-image: url(&quot;http://w.sharethis.com/images/facebook_32.png&quot;);"></span><img src="http://w.sharethis.com/images/check-big.png" style="position: absolute; top: -7px; right: -7px; width: 19px; height: 19px; max-width: 19px; max-height: 19px; display: none;"></span></span>
					<span st_via="kabbalahcentre" displaytext="Tweet" class="st_twitter_large" st_processed="yes"><span style="text-decoration:none;color:#000000;display:inline-block;cursor:pointer;" class="stButton"><span class="stLarge" style="background-image: url(&quot;http://w.sharethis.com/images/twitter_32.png&quot;);"></span><img src="http://w.sharethis.com/images/check-big.png" style="position: absolute; top: -7px; right: -7px; width: 19px; height: 19px; max-width: 19px; max-height: 19px; display: none;"></span></span>
					<span displaytext="Google +" class="st_googleplus_large" st_processed="yes"><span style="text-decoration:none;color:#000000;display:inline-block;cursor:pointer;" class="stButton"><span class="stLarge" style="background-image: url(&quot;http://w.sharethis.com/images/googleplus_32.png&quot;);"></span><img src="http://w.sharethis.com/images/check-big.png" style="position: absolute; top: -7px; right: -7px; width: 19px; height: 19px; max-width: 19px; max-height: 19px; display: none;"></span></span>
					<span displaytext="Pinterest" class="st_pinterest_large" st_processed="yes"><span style="text-decoration:none;color:#000000;display:inline-block;cursor:pointer;" class="stButton"><span class="stLarge" style="background-image: url(&quot;http://w.sharethis.com/images/pinterest_32.png&quot;);"></span><img src="http://w.sharethis.com/images/check-big.png" style="position: absolute; top: -7px; right: -7px; width: 19px; height: 19px; max-width: 19px; max-height: 19px; display: none;"></span></span>
					<span displaytext="Email" class="st_email_large" st_processed="yes"><span style="text-decoration:none;color:#000000;display:inline-block;cursor:pointer;" class="stButton"><span class="stLarge" style="background-image: url(&quot;http://w.sharethis.com/images/email_32.png&quot;);"></span><img src="http://w.sharethis.com/images/check-big.png" style="position: absolute; top: -7px; right: -7px; width: 19px; height: 19px; max-width: 19px; max-height: 19px; display: none;"></span></span>
					<span displaytext="ShareThis" class="st_sharethis_large" st_processed="yes"><span style="text-decoration:none;color:#000000;display:inline-block;cursor:pointer;" class="stButton"><span class="stLarge" style="background-image: url(&quot;http://w.sharethis.com/images/sharethis_32.png&quot;);"></span><img src="http://w.sharethis.com/images/check-big.png" style="position: absolute; top: -7px; right: -7px; width: 19px; height: 19px; max-width: 19px; max-height: 19px; display: none;"></span></span>
				</div>
			</div>
			<div class="courseDescriptionWrapper">  
			<?php print $node->body['und'][0]['value']; // Course Description ?>			
			</div>
	</div>
<?php } ?>


