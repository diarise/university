<!-- test log in  -->

<?php				
	$oDate = new DateTime($node->field_event_date['und'][0]['value']);
	//$oDate->modify("-25200 second");
	$sDate = $oDate->format('F jS, Y g:i A'); // Event Start Date Y H:i A
		
	$oDate2 = new DateTime($node->field_event_date['und'][0]['value2']);
	//$oDate2->modify("-25200 second");
	$sDate2 = $oDate2->format('F jS, Y g:i A'); // Event End Date
?>

<?php

	function checkLock() {
		if (user_is_logged_in() && get_membership_based_content_body( $node->nid ) ) { return true; }else{ return false; };
	}
	print (checkLock());
	
	$membership_terms = _taxonomy_node_get_terms_by_vocabulary($node, 12 );
	foreach( $membership_terms as $t )	{	$membership = $t->name; }	
	    
?>



<?php if ( checkLock() || ($membership == "") ) {?>	

<!-- video wrapper -->
<div id="wrapperVideoSection">
	<!--start of video content when user log in-->
		<div id="videoSocialIconeWrapper">
			<div id="video-control"> 
			
			<?php
				// Video Player Code
				$streamer_url = check_plain($node->field_streamer_link['und'][0]['value']); 
				$height= 392;
				$width=640;
				$html="<script src='http://jwpsrv.com/library/N_wSnHeyEeKNTyIACp8kUw.js'></script>";
				$html .= '<div id="liveEventsPlayer"><span id="player2">'.$ima.'</span></div>';
				$html .= '<script type="text/javascript">
							  jwplayer("player2").setup({
									file:"'.$streamer_url.'",
									title: "'.$node->title.'",
									height: "'.$height.'",
									width: '.$width.',   
									fallback: "false",
									ga: "{}"
							});</script>';
				print $html;		
				// End of Video Player Code
			?>
			</div>

			<div id="eSocial"> <!--start of social media icone-->
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
</div><!--end of of video content when user log in-->




<!-- video content info -->
	<div id="videoTitlesWrapper"> <!--strat for video description when user log in-->
		<div class="videotitles">
			<div id="wrapperInfoMultimedia">
				<span id="titleMultimedia"><?php print $title; // Title ?></span>
				<span id="courseNameMultimedia"><?php
							$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
							foreach ( $authors as $author ) {	echo "  <span>" .$author->name. "</span><span class='divider'> - </span>"; }	
						?></span>
				
			</div>
			<div id="wrapperAuthorDate">
				<span id="authorNameMultimedia">
				<?php
					$locations = _taxonomy_node_get_terms_by_vocabulary($node, 17 );
					$location_name = "";
					foreach ( $locations as $location ) {	
						$location_name = $location->name;
						echo $location->name; 
					}	
				?>
				</span>
				<span id="dateMultimedia">
				<span class="eventsDate"> Start Date: <span><?php print $sDate." (".$location_name. " time)";?></span></span>
				<span class="eventsDate"> End Date: <span><?php print $sDate2." (".$location_name." time)";?></span></span>
				</span>
			</div>
			<span class="bookmark">
				<?php //print flag_create_link('bookmarks', $node->nid); ?>
			</span>
		</div>
	</div><!--end of video description when user log in-->


<!--  -->





<div class="videoContent">
		
		<!-- Class Description -->
		<?php 
		
		if( sizeof( $node->body) > 0  ) {
		if( $node->body['und'][0]['value'] != "" ) { ?>
			<div id="classesDescription">
				<input type="checkbox" id="ac-0">
				<label  class="titleDescription" for="ac-0">event description</label>
				<span class="accordion"><?php  	print $node->body['und'][0]['value']; ?></span>
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
			<span class="accordion"><?php print $node->field_lesson_highlights['und'][0]['value']; ?></span>
		</div>
		<?php } ?>
		<?php } ?>
		
		
		<!-- Class Agenda -->
		<?php if( sizeof( $node->field_agenda) > 0  ) { ?>
		<div class="titleDescription">Agenda</div>
		<div id="classAgenda">
			<table>
			<tbody>
			<tr>
				<th class="eventsDataHeader">EVENT DATE</th>
				<th class="eventsDataHeader">AGENDA ITEM</th>
			</tr>
			<?php
				// This is a way to display multiple entries for field collections 
				$wrapper1 = entity_metadata_wrapper('node', $node);
				 foreach ($wrapper1->field_agenda as $i)
				 {
					$start_date = "";
					foreach ( $i->field_date_time->value() as $k => $v ) {
						$start_date = date( 'F jS, Y g:i A' , strtotime($v) );
						break;
					}
					echo "<tr><td class='eventsData'>".$start_date."</td><td class='eventsData'>".$i->field_agenda_item->value()."</td></tr>";
		
				 }
			?>
			<tbody>
			</table>
		</div>	
		<?php } ?>
		<!-- End of Class Agenda -->
			
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


	<?php } else { ?>


		<div id="wrapperVideoSection">
	<div class="wrapperCours">
		<div id="contentAuthorImages">
			<img src="<?php print $node->field_image_cdn_link['und'][0]['value']; ?>">
		</div>
		<div id="contentAuthorInfo">
				<div id="wrapperInfoCour">
					<span id="titleCourse"><?php print $node->title; ?> </span>
					
					
					<span class="eventsLocation">Teacher:
						<span class = "theCourseAuthor">
							<?php
							$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
							foreach ( $authors as $author ) {	echo "  <span>" .$author->name. "</span><span class='divider'> - </span>"; }	
						?>
						</span>
					</span>

					<span class="eventsLocation">Location:
						<span class = "theCourseAuthor">
							<?php
							$locations = _taxonomy_node_get_terms_by_vocabulary($node, 17 );
							foreach ( $locations as $location ) {	echo $location->name; }	
						?>
						</span>
					</span>
					
					<span class="eventsDate"> Start Date: <span><?php print $sDate." (".$location_name. " time)";?></span></span>
					<span class="eventsDate"> End Date: <span><?php print $sDate2." (".$location_name." time)";?></span></span>
					
					
				</div>
		
			<?php if (user_is_logged_in() && get_membership_based_content_body( $node->nid )===false) {?>		
				<div id="wrapperPrice">
					<span class="buttonMember"><a href="http://profile.kabbalah.com/user/dashboard">upgrade your membership</a></span>
				</div>
			<?php } elseif( !user_is_logged_in()) { ?>
				<div id="wrapperPrice">
					<span class="buttonMember"><a href="http://profile.kabbalah.com">become a member</a></span>
					<span class="priceLogin"><a href="http://university.kabbalah.com/saml_login">log-in</a></span>
				</div>
			<?php } ?>
			
		</div>
	</div>
</div>




	<?php if( $node->body['und'][0]['value'] != "" ) { ?>
		<div id="courseDescription">
			 	<div id="eSocial">
			 		<!-- <div id="language">Language: EN | Selected classes have subtitles*</div> -->
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



	<?php }	?>