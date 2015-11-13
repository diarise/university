<?php
	global $user;
	$username = $user->name;
?>
<?php
// $Id: html.tpl.php,v 1.1.2.2 2011/02/06 22:47:17 andregriffin Exp $
?><!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>

   
	 <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script> 

  <?php print $scripts; ?>	
  <script type="text/javascript">var switchTo5x=true;</script>
  <script type="text/javascript" src="https://ws.sharethis.com/button/buttons.js"></script>
  <script type="text/javascript">stLight.options({publisher: "df95500a-25b4-417c-9c13-13bb7406613a"});</script>	
  

	  <meta property="og:title" content="<?php print $head_title;?>" />
	  <!--<meta property="og:description" content="<?php //print $head_desc;?>" />-->
	  <meta property="og:image" content="<?php print $head_image; ?>" />
	  
  
  <!-- end panels -->

</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>

<?php print $page_top; ?>

<!-- Header and Main Menu -->

<!-- new header -->
<div id="newHeaderWrapper">
            <div id="logoWrapper">
                <a href="http://kabbalah.com/"></a>
                <a class="localLogo" href="/"></a>
            </div>
            <div id="searchWrapper">
                <div class="searchWrapper">
	                <?php  print render($customsearchform);?>
                </div>
            </div>
            <div id="loginWrapper">
                <div id="userInfoWrapper">
                <?php if ( user_is_logged_in() ) {?>
                    <span><a href="https://idp.kabbalah.com/user" class="userActive"><?php print $username; ?></a><span class="gutterPipe">|</span></span>
                    <span><a href="/user/<?php print $user->uid; ?>/bookmarks">Bookmarks</a><span class="gutterPipe">|</span></span>
                    <span><a href="/user/logout">Log Out</a></span>
                <?php } else {?>
                    <span><a href="https://idp.kabbalah.com/user/login" class="activeLink">Log In</a><?php //print get_current_url(); ?><span class="gutterPipe">|</span>
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

                             <li>
                                  <a href="https://idp.kabbalah.com/user/login" class="activeLink userActiveResponsive">Log In</a>
                             <?php //print get_current_url(); ?>
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
		<a href="/search/site/"><span class="newHeaderWrapperSearchMenuLogo"></span></a>
	</div>
	<div id="newHeaderWrapperMainMenu">
	<?php print render($menu);?>

	</div>
	<div id="newHeaderWrapperLanguage">
		<span><a target="_blank" href="http://universidad.kabbalah.com">Español</a></span>
	</div>
</div>

  
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



<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<?php 
		if ( user_is_logged_in() ) 
		{ 
			foreach($user->roles as $key => $role){
			$userrole = $role;
			}
?>
  
	<!-- LOGGED IN USER INTERCOM.IO Tracking -->
	<script>
	  window.intercomSettings = {
		app_id: "bjxhjpkh",
		name: '<?php echo $user->name;?>', // Full name
		email: '<?php echo $user->mail;?>', // Email address
		user_id: <?php echo $user->uid;?>,
		created_at: <?php echo $user->created;?>, // Signup date as a Unix timestamp
		"plan": '<?php echo $userrole; ?>', // role
		"last_seen_at": <?php echo $user->access; ?>, // login date as a Unix timestamp
	  };
	</script>
	<script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/bjxhjpkh';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>

<?php }  else { ?>

	<!-- NOT LOGGED IN INTERCOM.IO Tracking-->

	<script>
	  window.intercomSettings = {
		app_id: "bjxhjpkh"
	  };
	</script>
	<script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/bjxhjpkh';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>

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
</body>
</html>