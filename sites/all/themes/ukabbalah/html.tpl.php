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
	
	$pageRegistrationUrl = $_SERVER["REQUEST_URI"];
	
	
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
  
  <?php if( $pageRegistrationUrl == "/journey" ) { ?>
  
		<meta property="og:title" content="A Journey to the Beginning of the Endless" />
		<meta property="og:description" content="A ground breaking 28 day program to create a spiritual renaissance in your life. And in the world." />
		<meta property="og:image" content="http://cdn1.kabbalah.com/kabbalah.com/images/articles/15-8-2-karen-berg-elul2.jpg" />
		
  <?php } else { ?>
  
	  <meta property="og:title" content="<?php print $head_title;?>" />
	  <!--<meta property="og:description" content="<?php //print $head_desc;?>" />-->
	  <meta property="og:image" content="<?php print $head_image; ?>" />
	  
  <?php } ?>
  
  
  <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <!-- Start Open Web Analytics Tracker -->
  
  <!-- End Open Web Analytics Code -->

 <!-- panels -->


  <!-- end panels -->
<script src="//load.sumome.com/" data-sumo-site-id="772817612e0d78c7785e86cf790fff083f8f66538ac037e82ffca7e1ac748ad2" async="async"></script>
</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
  <?php print $page_top; ?>
<?php
	global $user;
	$username = $user->name;
?>
<!-- Header and Main Menu -->
	
<!-- this popup show up only when the user is not log in -->

			<?php if ( user_is_logged_in() ) {?>
				
			<?php } else {?>
				<div id="popupNotLogin">Welcome to the Kabbalah University please <a href="https://idp.kabbalah.com/user/login">Log In</a> or <a href="https://idp.kabbalah.com">sign up</a> to have access to the videos <span>X</span></div>
			<?php }?>
		
<!-- end popup -->

<!-- new header -->
<div id="newHeaderWrapper">
            <div id="logoWrapper">
                <a href="http://kabbalah.com/"></a>
                <a class="localLogo" href="/"></a>
            </div>
            <div id="searchWrapper">
                <div class="searchWrapper">
	                <form method="get" action="/search">
	                	<input type="text" placeholder="search" name="keys" />
	                	<input type="submit" class="form-submit" value="" name="" id="submitSearchBtn">
	                </form>
                </div>
            </div>
            <div id="loginWrapper">
                <div id="userInfoWrapper">
                <?php if ( user_is_logged_in() ) {?>
                    <span><a href="https://idp.kabbalah.com/user" class="userActive"><?php print $username; ?></a><span class="gutterPipe">|</span></span>
                    <span><a href="/user/<?php print $user->uid; ?>/bookmarks">Bookmarks</a><span class="gutterPipe">|</span></span>
                    <span><a href="/user/logout">Log Out</a></span>
                <?php } else {?>
                    <span><a href="https://idp.kabbalah.com/user/login" class="activeLink">Log In</a><span class="gutterPipe">|</span>
                    </span><span><a href="https://idp.kabbalah.com">Sign Up</a></span>
                <?php }?>
                    <div id="userInfoWrapperResponsive">
                        <ul>
                            <?php if ( user_is_logged_in() ) {?>
                            <li><a class="userActiveResponsive" href="https://idp.kabbalah.com/user"><?php print $username; ?></a>

                                <ul>
                                    <li><a href="/user/<?php print $user->uid; ?>/bookmarks">Bookmarks</a>

                                    </li>
                                    <li><a href="/user/logout">Log Out</a>

                                    </li>
                                </ul>
                            </li>
                            <?php } else {?>

                             <li><a href="https://idp.kabbalah.com/user/login" class="activeLink userActiveResponsive">Log In</a>
                                    <ul><li><a href="https://idp.kabbalah.com">Sign Up</a></li></ul>
                             </li>
                            
                            <?php }?>

                        </ul>
                    </div>
                </div>
                <div id="donateBtn"><a target="_blank" href="https://kabbalah.com/donate">DONATE</a></div>
            </div>
        </div>
        <div id="newHeaderMenuWrapper">
            <div id="newHeaderWrapperMobileMenu">
                <!-- <span class="newHeaderWrapperMobileMenuLogo"><img src="/sites/all/themes/ukabbalah/images/menu.svg" alt=""/></span> -->
                <div id="reposiveMobileMenu"><?php print render($mobileMenu);?></div>	
                <a href="/"><span class="newHeaderWrapperLocalMenuLogo"></span></a>
                <a href="/search"><span class="newHeaderWrapperSearchMenuLogo"></span></a>
            </div>
            <div id="newHeaderWrapperMainMenu">
            <?php print render($menu);?>
        
            </div>
            <div id="newHeaderWrapperLanguage">
                <span><a target="_blank" href="http://universidad.kabbalah.com">Español</a></span>
            </div>
        </div>
<?php //print render($mobileMenu);?>
<!-- end new header --> 
  
  
  <?php print $page; ?>
  <?php print $page_bottom; ?>

  <!-- Social Media Section -->
    <section id="SocialMediaWrapper">
    <div id="SocialMedia">
      <div id="fpSocialMediaBlock1">
        <div class="fpSocialMediaBlockTitle"><a href="https://twitter.com/ukabbalah" target="_blank"></a></div>
        <div class="fpSocialMediaWrapper">
          <?php  print render($ktweet);?>
        </div>  
        
      </div>
      <div id="fpSocialMediaBlock2">
        <div class="fpSocialMediaWrapper">

            <!-- facebook plugin -->
            <div class="fb-page" data-href="https://www.facebook.com/ukabbalah" data-width="420" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false" data-show-posts="false">
              <div class="fb-xfbml-parse-ignore">
                <blockquote cite="https://www.facebook.com/ukabbalah">
                  <a href="https://www.facebook.com/ukabbalah">Kabbalah University</a>
                </blockquote>
              </div>
            </div>
            <!-- end facebook plugin -->
          
        </div>

      </div>
                
    </div>
    <div id="fpSocialMediaBlock3">
      <div class="fpSocialMediaWrapper">
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
			<section><?php  print render($footer5);?></section>
			<section id="findKabbalahCentreWrapper">
				<div id="findKabbalahCentre"><?php  print render($footer6);?></div>
				<div id="studentSupport"><?php  print render($studentsupport);?></div>  
			</section>
		</nav><!--end of footerlinks-->
		<!--copywrite section-->
			<div id="copywriteWrapper">
				<div id="copywriteSection"><?php print render($copywrite);?></div>
				<div id="socialMediaSection"><?php print render($socialmedia);?></div>
			</div>
		<!--end of copywrite-->
		<!--end of footerwrapper-->

		<!-- footer by sites logo -->
		<div id="footerBySiteIcons">
			<div id="footerBySiteIconsWrapper">
				<div class="footerBySiteIcons"><a href="http://www.kabbalah.com/" target="_blank">kabbalah.com</a></div>
				<div class="footerBySiteIcons"><a href="http://livingwisdom.kabbalah.com/" target="_blank">living wisdom</a></div>
				<div class="footerBySiteIcons"><a href="http://university.kabbalah.com/" target="_blank">kabbalah university</a></div>
				<div class="footerBySiteIcons"><a href="http://www.zohar.com/" target="_blank">the zohar</a></div>
				<div class="footerBySiteIcons"><a href="http://community.kabbalah.com/" target="_blank">community</a></div>
				<div class="footerBySiteIcons"><a href="https://store.kabbalah.com/" target="_blank">online store</a></div>
			</div>
		</div>
		<!-- end footer by sites logo -->
	</footer>
	<!-- END OF FOOTER -->

<?php if ( user_is_logged_in() ) { 

	global $user;
    $username = $user->name;
	
	foreach($user->roles as $key => $role){
      $userrole = $role;
    }

?>

<script type="text/javascript">
    var _cio = _cio || [];
    (function() {
      var a,b,c;a=function(f){return function(){_cio.push([f].
      concat(Array.prototype.slice.call(arguments,0)))}};b=["load","identify",
      "sidentify","track","page"];for(c=0;c<b.length;c++){_cio[b[c]]=a(b[c])};
      var t = document.createElement('script'),
          s = document.getElementsByTagName('script')[0];
      t.async = true;
      t.id    = 'cio-tracker';
      t.setAttribute('data-site-id', '031f2e944b86d84cf2ef');
      t.src = 'https://assets.customer.io/assets/track.js';
      s.parentNode.insertBefore(t, s);
    })();
  </script>

<script type="text/javascript">
    _cio.identify({
      // Required attributes
      id: <?php echo $user->uid;?>,           // Unique id for the currently signed in user in your application.
      email: '<?php echo $user->mail;?>', // Email of the currently signed in user.
      created_at: <?php echo $user->created;?>,   // Timestamp in your system that represents when
                                // the user first signed up. You'll want to send it
                                // as seconds since the epoch.

      // Optional (these are examples. You can name attributes what you wish)

        plan_name : '<?php echo $userrole; ?>' // To use the example segments, set this to 'free' or 'premium'.
    });
  </script>


<?php } ?>
	
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