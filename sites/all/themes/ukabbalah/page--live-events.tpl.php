<?php
// $Id: page.tpl.php,v 1.4.2.6 2011/02/18 05:26:30 andregriffin Exp $
	global $user;
	$username = $user->name;
?>
	<!-- HEADER -->
		<div id="topHeaderWrapper">
			<div class="topHeader">
				<div id="topImageCont"><a href="http://kabbalah.com"><img src="/sites/all/themes/ukabbalah/images/kabbalahcenterlogo.png" alt="Kabbalah Center logo" /></a></div>
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
						<div class="donate"><a href="https://kabbalah.com/donate" target="_blank">donate</a></div>
						<div class="searchLogo"><a href="/search"><img src="/sites/all/themes/ukabbalah/images/search_logo.png"></a></div>
					</div>
				</div>		
			</div> <!-- End of topHeader -->
		</div> <!-- End of topHeader Wrapper -->
		<!-- END OF HEADER -->
		
		
	<div id="outerMenu">
		<div id="mainOuterContentLogoMenuWrapper">
			<div class="topHeader">
				<div id="mainContentMenuPersist">
					<div id="newMainContentLogoTitle"><a href="/">KABBALAH UNIVERSITY:</a></div>
					<div id="mainContentMenu" class="highlightAuthors">
						<?php print render($page['menu']);?>
					</div>
					<div class="donateFloat"><a target="_blank" href="https://kabbalah.com/donate">Donate</a></div>
					<div id="headerSearch">
					<?php if ( user_is_logged_in() ) {?>
						<a href="http://profile.kabbalah.com/saml_login"><?php print $username; ?></a> <br> <a href="/user/logout"> Log Out</a>
					<?php } else {?>
						<a href="http://university.kabbalah.com/saml_login">Log In</a> / <a href="http://profile.kabbalah.com">Signup</a>
					<?php }?>
					<?php //print render($page['search']); ?>
					</div>
				</div>	
			</div><!--end of topHeader-->
		</div> <!-- End of mainContentLogoMenuWrapper -->
	</div>
     	
	<div id="pageregion">
		<div id="maincontentTopics">
		<?php print $messages; ?>
		<?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
		<?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
		<?php print render($page['content']); ?>
		<div class="liveEventCollectionSection">
		<?php print render($page['liveEventCollectionSection']); ?>
		</div>
		</div><!--end of maincontent-->
	</div><!-- end of pageregion -->
  
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








