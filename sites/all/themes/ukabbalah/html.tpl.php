<?php
	if(user_is_logged_in() )
	{  
		global $user;
		if( checkLegacyUsernameAndEmailExists( $user->mail , $user->name ) ) // check if username and email exists in legacy_users table and migration_date is NULL
		{   
			if (isset($_GET['destination'])) 
			{
				unset($_GET['destination']);
			}
			drupal_static_reset('drupal_get_destination');
			drupal_goto('http://idp.kabbalah.com/user/'.$user->uid.'/migrate-user'); 
		 } 
	}
?>
<?php
// $Id: html.tpl.php,v 1.1.2.2 2011/02/06 22:47:17 andregriffin Exp $
?><!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>

	
      <!-- panels -->

		  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
		  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
		  <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
  <!-- end panels -->

  <?php print $scripts; ?>
  
  <script type="text/javascript">var switchTo5x=true;</script>
  <script type="text/javascript" src="https://ws.sharethis.com/button/buttons.js"></script>
  <script type="text/javascript">stLight.options({publisher: "df95500a-25b4-417c-9c13-13bb7406613a"});</script>	
  <meta property="og:title" content="<?php print $head_title;?>" />
  <!--<meta property="og:description" content="<?php //print $head_desc;?>" />-->
  <meta property="og:image" content="<?php print $head_image; ?>" />
 
  <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <!-- Start Open Web Analytics Tracker -->
  
  <!-- End Open Web Analytics Code -->

 <!-- panels -->


  <!-- end panels -->

</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <?php print $page_top; ?>
<?php
	global $user;
	$username = $user->name;
?>
<!-- Header and Main Menu -->
	
<!-- this popup show up only when the user is not log in -->

			<?php if ( user_is_logged_in() ) {?>
				
			<?php } else {?>
				<div id="popupNotLogin">Welcome to the Kabbalah University please <a href="/user/login">login</a> or <a href="https://idp.kabbalah.com">sign up</a> to have access to the videos <span>X</span></div>
			<?php }?>
		
<!-- end popup -->

<!-- new header -->
<div id="newTopHeaderWrapper">
	<div id="logoKabblah">
		<a href='http://kabbalah.com'><img src='/sites/all/themes/ukabbalah/images/logo_kabbalah_centre.png' alt='Kabbalah Center logo' /></a>
	</div>
	<div id="siteName">
		KABBALAH UNIVERSITY
	</div>
	<div id="headerSearch">
		<div id="search">
			<?php //print $search;?>
			<a href="/search">
			 <img src="/sites/all/themes/ukabbalah/images/search-icon_new-1.png" alt="search">
			</a>
		</div>
		<div id="usersessionsession">
			<div class="localSite">
				Learn Transform Connect
			</div>
			<div class="usersessionsession">
				<?php if ( user_is_logged_in() ) {?>
				<a href="/user/<?php print $user->uid; ?>/bookmarks">Bookmarks</a><span class="pipe">|</span>
				<a href="https://idp.kabbalah.com/user" class="activeLink"><?php print $username; ?></a><span class="pipe">|</span><a href="/user/logout">Log Out</a>
			<?php } else {?>
				<a href="https://idp.kabbalah.com/user/login" class="activeLink">Log In</a><span class="pipe">|</span><a href="https://idp.kabbalah.com">Signup</a>
			<?php }?>
			</div>
		</div>
	</div>
</div>
<div id="outerMenu">
	<div id="menuLocalWrapper">
		<div id="mobileMenu">
			<?php print render($mobileMenu);?>
		</div>
		<div id="desktopMenu">
			<?php print render($menu);?>
		</div>
		<div id="searchFloating">
			<a href="/search"><img src="/sites/all/themes/ukabbalah/images/search_logo_new.png" alt="search"></a>
		</div>
		<div id="donationWrapper">
			<span class="languageLink"><a target="_blank" href="http://universidad.kabbalah.com">Español</a></span>
			<span class="donate"><a target="_blank" href="https://kabbalah.com/donate">DONATE</a></span>
		</div>
	</div>
</div>
<!-- end new header --> 
  
  
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
<!-- <script type="text/javascript">
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
</script> -->
<!-- End for Menu -->

</body>

</html>