<script type="text/javascript" src="https://kabbalah.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e/en_USlqrrzf-1988229788/6251/82/1.4.5/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?collectorId=74d29eca"></script>
	<!-- HEADER -->
		<div id="topHeaderWrapper">
			<div class="topHeader">
				<div id="topImageCont"><a href="http://kabbalah.com"><img src="http://ukabbalah.com.vhost.zerolag.com/sites/all/themes/spukabbalah/images/kabbalahcenterlogo.png" alt="Kabbalah Center logo" /></a></div>
					<div id="headerSearchLinksWrapper">
					<div id="headerLinks">	
						<?php //if ($user->uid == 0) {?>
						<!--<a href="/saml_login">Log In</a>  <a href="/cart">Cart</a>-->  
						<!--<a href="/user/login">Help</a>-->  

						<!--<a href="/cart">Language</a>-->
						<!--<?php //} else {?>
							<a href="/logout">Log Out</a>  <a href="/cart">Cart</a>  <a href="/user/login">Help</a>  <a href="/cart">Language</a>
						<?php //}?>-->
						<!--universalMenu-->
						<?php print render($page['universalMenu']);?>
						<!--end of universalMenu-->
						<div class="donate"><a href="/donate" target="_blank">donate</a></div>
					</div>
				</div>		
			</div> <!-- End of topHeader -->
		</div> <!-- End of topHeader Wrapper -->
		<!-- END OF HEADER -->
		
		
	<div id="outerMenu">
		<div id="mainOuterContentLogoMenuWrapper">
			<div class="topHeader">
				<div id="mainContentMenuPersist">
					<div id="newMainContentLogoTitle"><a href="/">KABBALAH UNIVERSITY :</a></div>
					<div id="mainContentMenu">
						<?php print render($page['menu']);?>
					</div>
					<div class="donateFloat"><a target="_blank" href="http://kabbalah.com/donate">Donate</a></div>
					<div id="headerSearch"><?php print render($page['search']); ?></div>
				</div>	
			</div><!--end of topHeader-->
		</div> <!-- End of mainContentLogoMenuWrapper -->
	</div>
   
   <div id="pageregion">
    <?php print $messages; ?>
    <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
    <?php //if ($title): ?><!--<h1 class="title" id="page-title">--><?php //print $title; ?><!--</h1>--><?php //endif; ?>
    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
    <?php print render($page['content']); ?>
	</div><!-- end of pageregion -->
	
	<!-- <div id="lessonCollectionSection">
		<?php //print render($page['pagelessoncollection']); ?>
	</div> -->

	<div class="lessonCollectionSection">
		<?php print render($page['courselessoncollection']); ?>
	</div>

	<div class="lessonCollectionSection">
		<?php print render($page['eventlessoncollection']); ?>
	</div>
  
<div id="SocialMediaWrapper">
		<div id="SocialMedia">
			<div id="fpSocialMediaBlock1"><span class="icon-twitter"></span><?php  print render($page['ktweet']);?></div>
			<div id="fpSocialMediaBlock2"><?php  print render($page['kfacebook']);?></div>
	      	<div id="fpSocialMediaBlock3"><span class="icon-testimonial"></span><?php  print render($page['ktestimonials']);?></div>	      	
		</div>
</div>

	<div id="footer">
		<div id="footerwrapper">
			<div id="footerlinks">
		    <div id="footer1" class="footerlinks"><?php  print render($page['footer1']);?></div>
			<div id="footer2" class="footerlinks"><?php  print render($page['footer2']);?></div>
			<div id="footer3" class="footerlinks"><?php  print render($page['footer3']);?></div>
			<div id="footer4" class="footerlinks"><?php  print render($page['footer4']);?></div>
			</div><!--end of footerlinks-->
			<div id="copywrite">
				<?php  print render($page['copywrite']);?>
			</div><!--end of copywrite-->
		</div><!--end of footerwrapper-->
	</div><!--end of footer-->



<?php 
print $vocab_terms = _taxonomy_node_get_terms_by_vocabulary($node, 14 );
?>




