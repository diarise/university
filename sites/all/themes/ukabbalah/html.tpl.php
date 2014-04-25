<?php
// $Id: html.tpl.php,v 1.1.2.2 2011/02/06 22:47:17 andregriffin Exp $
?><!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
  
  <script type="text/javascript">var switchTo5x=true;</script>
  <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
  <script type="text/javascript">stLight.options({publisher: "df95500a-25b4-417c-9c13-13bb7406613a"});</script>	
  <meta property="og:title" content="<?php print $head_title;?>" />
  <!--<meta property="og:description" content="<?php //print $head_desc;?>" />-->
  <meta property="og:image" content="<?php print $head_image; ?>" />
	
  <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <!-- Start Open Web Analytics Tracker -->
  <script type="text/javascript">
  //<![CDATA[
  var owa_baseUrl = 'http://analytics.kabbalahsupport.net/';
  var owa_cmds = owa_cmds || [];
  owa_cmds.push(['setSiteId', '9b627066f69101d9cd30af0e878f9b78']);
  owa_cmds.push(['trackPageView']);
  owa_cmds.push(['trackClicks']);
  owa_cmds.push(['trackDomStream']);

  (function() {
   var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true;
   owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl );
   _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
   var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s);
  }());
  //]]>
  </script>
  <!-- End Open Web Analytics Code -->



</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <?php print $page_top; ?>
 
<?php
	global $user;
	$username = $user->name;
?>
<!-- Header and Main Menu -->
	
	<div id="mainlogo">
		<div id="kabbalahlogo">
			<a href='http://kabbalah.com'><img src='/sites/all/themes/ukabbalah/images/kabbalahcenterlogo.png' alt='Kabbalah Center logo' /></a>
		</div><!--end of kabbalahlogo-->
		<div class="donate"><a href="/donate" target="_blank">Donate</a></div><!--end of donate-->
		<div class="searchLogo">
			<a href="/search"><img src="/sites/all/themes/ukabbalah/images/search_logo.png" alt="search"></a>
		</div><!--end of searchlogo-->
	</div><!--end of main logo-->
	<div id="ukabblahlogowrapper">
		<div id="mobilemenu">
		<?php print render($menu);?>
		</div><!--end of mobile menu-->
		<div id="usersessionsession">
			<?php if ( user_is_logged_in() ) {?>
				<a href="http://profile.kabbalah.com/saml_login"><?php print $username; ?></a> / <a href="/user/logout"> Log Out</a>
			<?php } else {?>
				<a href="http://university.kabbalah.com/saml_login">Log In</a> / <a href="http://profile.kabbalah.com">Signup</a>
			<?php }?>
		</div>
	</div><!--end of ukabbalah logo-->
	
	
	<!-- HEADER -->
	<div id="topHeaderWrapper">
		<div class="topHeader">
			<div id="topImageCont"><a href="http://kabbalah.com"><img src="/sites/all/themes/ukabbalah/images/kabbalahcenterlogo.png" alt="Kabbalah Center logo" /></a></div>
				<div id="headerSearchLinksWrapper">
				<div id="headerLinks">	
					<!--universalMenu-->
					<?php print render($universalMenu);?>
					<!--end of universalMenu-->
					<div class="donate"><a href="https://kabbalah.com/donate" target="_blank">donate</a></div>
					<div class="searchLogo"><a href="/search"><img src="/sites/all/themes/ukabbalah/images/search_logo.png" alt="search"></a></div>
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
						<?php print render($menu);?>
					</div>
					<div class="donateFloat"><a target="_blank" href="https://kabbalah.com/donate">Donate</a></div>
					<div id="headerSearch">
					<?php if ( user_is_logged_in() ) {?>
						<a target="_blank" href="http://profile.kabbalah.com/saml_login"><?php print $username; ?></a> <br> <a target="_blank" href="/user/logout"> Log Out</a>
					<?php } else {?>
						<a target="_blank" href="http://university.kabbalah.com/saml_login">Log In</a> / <a target="_blank" href="http://profile.kabbalah.com">Signup</a>
					<?php }?>
					<?php //print render($page['search']); ?>
					</div>
				</div>	
			</div><!--end of topHeader-->
		</div> <!-- End of mainContentLogoMenuWrapper -->
	</div>

<!-- End of Header and Main Menu -->  
  
  
  <?php print $page; ?>
  <?php print $page_bottom; ?>

	<!-- Social Media Section -->
  	<section id="SocialMediaWrapper">
		<div id="SocialMedia">
			<div id="fpSocialMediaBlock1">
				<span class="icon-twitter"></span>
				<?php  print render($ktweet);?>
			</div>
			<div id="fpSocialMediaBlock2">
				<?php  print render($kfacebook);?>
			</div>
		    <div id="fpSocialMediaBlock3">
		    	<span class="icon-testimonial"></span>
		    	<?php  print render($ktestimonials);?>
		    </div>	      	
		</div>
	</section>
	<!-- End of Social Media Section -->

	<!-- FOOTER -->
	<footer>
		<nav>
			<section><?php  print render($footer1);?></section>
			<section><?php  print render($footer2);?></section>
			<section><?php  print render($footer3);?></section>
			<section><?php  print render($footer4);?></section>
		</nav><!--end of footerlinks-->
		<div>
			<?php print render($copywrite);?>
		</div><!--end of copywrite-->
		<!--end of footerwrapper-->
	</footer>
	<!-- END OF FOOTER -->

 <script type="text/javascript" src="//assets.zendesk.com/external/zenbox/v2.6/zenbox.js"></script>
<style>
  @import url(//assets.zendesk.com/external/zenbox/v2.6/zenbox.css);
</style>
<script type="text/javascript">
  if (typeof(Zenbox) !== "undefined") {
    Zenbox.init({
      dropboxID:   "20138384",
      url:         "https://kabbalah.zendesk.com",
      tabTooltip:  "Support",
      tabImageURL: "https://assets.zendesk.com/external/zenbox/images/tab_support_right.png",
      tabColor:    "black",
      tabPosition: "Right"
    });
  }
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-49359953-1', 'kabbalah.com');
  ga('send', 'pageview');

</script>

<!-- Start For Menu -->
<script type="text/javascript">
	/*for website first loads*/
	var mobileDiv1 = document.getElementById("mainlogo");
	var mobileDiv2 = document.getElementById("ukabblahlogowrapper");
	var desktopDiv1 = document.getElementById("topHeaderWrapper");
	var desktopDiv2 = document.getElementById("outerMenu");

	var isMobile = false;
	var windowSize = window.outerWidth;

	isMobile = (windowSize >1100)? false: true;

	if(isMobile){ 
		mobileDiv1.style.display = "block";
		mobileDiv2.style.display = "block";
		desktopDiv1.style.display = "none";
		desktopDiv2.style.display = "none";
	}else {
		mobileDiv1.style.display = "none";
		mobileDiv2.style.display = "none";
		desktopDiv1.style.display = "block";
		desktopDiv2.style.display = "block";
	}

	/*end first loads*/
	/*for website resize*/
	window.onresize = function(){
		windowSize = window.outerWidth;
		isMobile = (windowSize >1100)? false: true;

		if(isMobile){ 
			mobileDiv1.style.display = "block";
			mobileDiv2.style.display = "block";
			desktopDiv1.style.display = "none";
			desktopDiv2.style.display = "none";
		}else {
			mobileDiv1.style.display = "none";
			mobileDiv2.style.display = "none";
			desktopDiv1.style.display = "block";
			desktopDiv2.style.display = "block";
		}
	}
</script>
<!-- End for Menu -->



</body>

</html>