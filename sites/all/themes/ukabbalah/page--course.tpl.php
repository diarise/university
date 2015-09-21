   <main id="pageregion">
		<?php print $messages; 
		global $user;?>
		<?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
		<?php //if ($title): ?><!--<h1 class="title" id="page-title">--><?php //print $title; ?><!--</h1>--><?php //endif; ?>
		<?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
		<?php //print render($page['content']); ?>	
		<?php
			$membership_terms = _taxonomy_node_get_terms_by_vocabulary($node, 12 );
			foreach( $membership_terms as $t )	{	$membership = $t->name; }
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
							<!-- <span id="topicCourseTitle"> Topic:</span>
							<span id="topicCourse"> 
							<?php	
								//foreach ($node->field_primary_topic as $term) 	{ $primary_topic = l( t($term[0]['taxonomy_term']->name) , 'taxonomy/term/' . $term[0]['taxonomy_term']->tid); }
								//print $primary_topic; // Primary Topic 
							?>
							</span> -->
							<span class = "theCourseAuthorTitle">Teacher:
								<span class = "theCourseAuthor">
								<?php
									$authors = _taxonomy_node_get_terms_by_vocabulary($node, 7 );
									foreach ( $authors as $author ) {	echo "  <a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. "</a><span class='divider'>, </span>"; }	
								?>	
								</span>
							</span>
							
						</div>
					<?php if (user_is_logged_in() ) {?>
						<div id="wrapperPrice">
							<div class="socialMediaIcon">
								<div class="sharethis">
									<span class='st_facebook_large' displayText='Facebook'></span>
									<span class='st_twitter_large' displayText='Tweet' st_via='kabbalahcentre'></span>
									<span class='st_googleplus_large' displayText='Google +'></span>
									<span class='st_pinterest_large' displayText='Pinterest'></span>
									<span class='st_email_large' displayText='Email'></span>
									<span class='st_sharethis_large' displayText='ShareThis'></span>
								</div>
							</div>
						</div>
					<?php } if (user_is_logged_in() && !kabbalah_content_access_get_article_membership($membership)) {?>		
						<div id="wrapperPrice">
							<span class="buttonMemberDesc">This is a <?php print $membership; ?> course</span>
							<span class="buttonMember"><a href="https://idp.kabbalah.com/user/<?php print $user->uid; ?>/manage-subscription">upgrade your membership</a></span>
						</div>
					<?php } elseif( !user_is_logged_in()) { ?>
						<div id="wrapperPrice">
							<div class="loginText">Join Kabbalah University to watch this video.<br/>
		Members get access to thousands of courses and events</div>
							<span class="buttonMember"><a href="https://idp.kabbalah.com">Become a member</a></span>
							<span class="priceLogin logColor"><?php print get_current_url();?></span>
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





	</main><!-- end of pageregion -->
	
<div id="wrappperBloc">
	<div id="wrappperLeftBloc">
		<?php
			if ( sizeof( $node->field_type_of_course) > 0 && $node->field_type_of_course['und'][0]['tid']==562){
		?>
		<div class="lessonCollectionSection">
			<?php print render($page['courselessoncollection']); ?>
		</div>
		<?php
		}else{
		?>
		<div class="lessonCollectionSection">
			<?php print render($page['lessonsineventcoursepage']); ?>
		</div>
	  	<?php }?>
	</div>

	<div id="wrappperRightBloc">	
		<div id="tabs">
		  <ul>
		    <li><a href="#fragment-1"><span>Course details</span></a></li>
		    <li><a href="#fragment-2"><span>F A Q</span></a></li>
		  </ul>
		  <div id="fragment-1">
		  <div class="wrapperTitle">
		  	<?php print $node->title; ?>
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
										
										if (preg_match('/David Mats/',$author->name)) 
										echo "<span class='authorImage'><a href='javascript:void(0)' class = '".$author->name."'><img src='/sites/all/themes/ukabbalah/images/David_Mats.jpg' alt='".$author->name."' ></a><a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. " </a></span>"; 	
										elseif (preg_match('/Yitzhak Sinwani/',$author->name)) 
										echo "<span class='authorImage'><a href='javascript:void(0)' class = '".$author->name."'><img src='/sites/all/themes/ukabbalah/images/Yitzhak_Sinwani.jpg' alt='".$author->name."' ></a><a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. " </a></span>"; 	
										else
										echo "<span class='authorImage'><a href='javascript:void(0)' class = '".$author->name."'><img src='/sites/all/themes/ukabbalah/images/".$name.".jpg' alt='".$author->name."' ></a><a href='javascript:void(0)' class = '".$author->name."'>" .$author->name. " </a></span>"; 
									}	
								
								?>	
				</div>


		    <!-- <p>Course Description</p> -->
				<div class="description">
		    		<?php print $node->body['und'][0]['value']; // Course Description ?>
				</div>
		    
		  </div>
		  <div id="fragment-2">
		    <a class="faq" href="http://kabbalah.com/faq" target="_blanc">Click here for FAQ </a>
		  </div>
		</div>
		<?php if (user_is_logged_in() && !kabbalah_content_access_get_article_membership($membership)) {?>		
						<div class="wrapperLoginBloc" id="wrapperPrice">
							<span class="buttonMemberDesc">This is a <?php print $membership; ?> course</span>
							<span class="buttonMember"><a href="https://idp.kabbalah.com/user/<?php print $user->uid; ?>/manage-subscription">upgrade your membership</a></span>
						</div>
					<?php } elseif( !user_is_logged_in()) { ?>
						<div class="wrapperLoginBloc" id="wrapperPrice">
							<div class="loginText">Join Kabbalah University to watch this video.
		Members get access to thousands of courses and events</div>
							<span class="buttonMember"><a href="https://idp.kabbalah.com">Become a member</a></span>
							<span class="priceLogin logColor"><?php print get_current_url();?></span>
						</div>
					<?php } ?>
		 
		<script>
		$( "#tabs" ).tabs();
		
		</script>
		
	</div>
</div>