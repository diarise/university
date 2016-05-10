<?php
	if ( user_is_logged_in() ) {
		global $user;
		$username = $user->name;
	}
?>
<?php
// $Id: html.tpl.php,v 1.1.2.2 2011/02/06 22:47:17 andregriffin Exp $
?><!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
  	<?php print $head; ?>
  	<title><?php if (isset($head_image)) { print ("Kabbalah University | ");  print $head_title; } else { print $head_title;} ?></title>
  	<meta name="description" content="<?php if (isset($head_desc)) { echo strip_tags($head_desc); } else{ echo "Kabbalah University is an powerful tool for spiritual connection, study and supporting a community of thousands of students around the world achieve greater spiritual growth through the wisdom of Kabbalah."; } ?>" />
  	<meta property="og:title" content="<?php print $head_title; ?>" />
  	<meta property="og:description" content="<?php if (isset($head_desc)) { echo strip_tags($head_desc); } else{ echo "Kabbalah University is an powerful tool for spiritual connection, study and supporting a community of thousands of students around the world achieve greater spiritual growth through the wisdom of Kabbalah."; } ?>" />
  	<meta property="og:image" content="<?php if (isset($head_image)) { print $head_image; } else { echo "http://cdn1.kabbalah.com/kabbalah.com/images/home_banner/ukabbalah_thumbnail.jpg";} ?>" />
	<!-- <?php// if(isset($head_image)) { ?><meta property="og:image" content="<?php //print $head_image; ?>" /><?php //} ?> -->
		
  	<?php print $styles; ?>

  	<?php print $scripts; ?>
	 
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
                    <span><a href="https://idp.kabbalah.com/user/<?php print $user->uid; ?>/manage-profile" class="userActive" target="_blank">MY PROFILE<?php //print $username; ?></a><span class="gutterPipe">|</span></span>
                    <span><a href="/user/<?php print $user->uid; ?>/bookmarks">bookmarks</a><span class="gutterPipe">|</span></span>
                    <span><a href="/user/logout">log out</a></span>
                <?php } else {?>
                    <span><?php print get_current_url(); ?></span>
                    <span class="gutterPipeLogin">|</span>
                    <span><a href="https://idp.kabbalah.com">sign up</a></span>
                <?php }?>
                    
                </div>
                <div id="donateBtn"><a target="_blank" href="https://kabbalah.com/donate">DONATE</a></div>
            </div>
</div>

<div id="newHeaderMenuWrapper">
	<div id="newHeaderWrapperMobileMenu">
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
	  // window.intercomSettings = {
		// app_id: "bjxhjpkh",
		// name: '<?php echo $user->name;?>', // Full name
		// email: '<?php echo $user->mail;?>', // Email address
		// user_id: <?php echo $user->uid;?>,
		// created_at: <?php echo $user->created;?>, // Signup date as a Unix timestamp
		// "plan": '<?php echo $userrole; ?>', // role
		// "last_seen_at": <?php echo $user->access; ?>, // login date as a Unix timestamp
	  // };
	 !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
		analytics.load("yQPqfpi70A7nyMdvipx3Byj5WcEWdBLK");
		analytics.page()
		}}();

		// analytics.identify('<?php echo $user->uid;?>', {
		//   email: '<?php echo $user->mail;?>',
		//   name: '<?php echo $user->name;?>',
		//   plan: '<?php echo $userrole; ?>',
		//   createdAt: <?php echo $user->created;?>,
		//   last_seen_at: '<?php echo $user->access; ?>'
		// });

		var user_id = '<?php echo $user->uid;?>'
		var _link = "/k_api/get_user_profile_by_id/" + user_id;
		
		makeRequest(_link);

		function makeRequest(url) {
			var httpRequest = new XMLHttpRequest();

	    if (!httpRequest) {
	      console.log('Cannot create an XMLHTTP instance');
	      return false;
	    }

	    httpRequest.onreadystatechange = alertContents;
	    httpRequest.open('GET', url);
	    httpRequest.send();

	    function alertContents() {
		    if (httpRequest.readyState === XMLHttpRequest.DONE) {
		      if (httpRequest.status === 200) {
		      	
		      	var response = JSON.parse(httpRequest.responseText);

		        analytics.identify('<?php echo $user->uid;?>', {
						  email: '<?php echo $user->mail;?>',
						  name: '<?php echo $user->name;?>',
						  plan: '<?php echo $userrole; ?>',
						  createdAt: <?php echo $user->created;?>,
						  last_seen_at: '<?php echo $user->access; ?>',
						  gender: response.gender,
						  dob: response.dob_month + "/" + response.dob_day + "/" + response.dob_year,
						  city: response.city,
						  state: response.state,
						  country: response.country,
						  language: response.language,
						  teacher: response.teacher,
						  phone: response.phone
						});
		      
		      } else {
		        console.log('There was a problem with the request.');
		      }
		    }
			}
 	  } 
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
	
<script type="text/javascript">
	(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;
		s.src='https://widget.intercom.io/widget/bjxhjpkh';
		var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
</script>
<script type="text/javascript">var switchTo5x=true;</script>
  <script type="text/javascript" src="https://ws.sharethis.com/button/buttons.js"></script>
  <script type="text/javascript">stLight.options({publisher: "df95500a-25b4-417c-9c13-13bb7406613a"});</script>	
</body>
</html>