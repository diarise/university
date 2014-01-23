<?php
// $Id: page.tpl.php,v 1.4.2.6 2011/02/18 05:26:30 andregriffin Exp $
?>
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
					<div id="mainContentMenu" class="highlightHome">
						<?php print render($page['menu']);?>
					</div>
					<div class="donateFloat"><a target="_blank" href="http://kabbalah.com/donate">Donate</a></div>
					<div id="headerSearch"><?php print render($page['search']); ?></div>
				</div>	
			</div><!--end of topHeader-->
		</div> <!-- End of mainContentLogoMenuWrapper -->
	</div>
	<div id="slideshow">
		<?php  print render($page['slideshow']);?>
	</div> <!--end of slideshow-->
	
	
	<div id="carousal1Wrapper">
		<?php  print render($page['fpbeginnerscourses']);?>
	</div> <!--end of carousal1-->
	
	<div id="carousal2Wrapper">
		<?php  print render($page['fprecentlyadded']);?>
	</div> <!--end of carousal2-->
	
	<div id="carousal3Wrapper">
		<?php  print render($page['fprecommendedcourses']);?>
	</div> <!--end of carousal3-->
	
	<div id="carousal4Wrapper">
		<?php  print render($page['fpfreelessons']);?>
	</div> <!--end of carousal4-->
	
	
	<div id="kfpinfo">
		<?php  print render($page['locationinfo']);?>
	</div><!--end of kfpinfo-->
	<div id="fplocationevents">
		<?php  print render($page['fpevents']);?>
	</div><!--end of fplivingwisdom-->
	<div id="fplocationclasses">
		<?php  print render($page['fpclasses']);?>
	</div><!--end of fplearn-->
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

