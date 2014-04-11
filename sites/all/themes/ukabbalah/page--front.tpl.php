	<div id="slideshow">
		<?php  print render($page['slideshow']);?>
	</div> <!--end of slideshow-->
	
	
	<div id="carousal2Wrapper">
		<?php  print render($page['fprecentlyadded']);?>
	</div> <!--end of carousal2-->

	<div id="carousal1Wrapper">
		<?php  print render($page['fpbeginnerscourses']);?>
	</div> <!--end of carousal1-->
	
	<div id="carousal3Wrapper">
		<?php  print render($page['fprecommendedcourses']);?>
	</div> <!--end of carousal3-->
	
	<div id="carousal4Wrapper">
		<?php  print render($page['fpfreelessons']);?>
	</div> <!--end of carousal4-->
	
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

