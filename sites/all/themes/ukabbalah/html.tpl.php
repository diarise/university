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
 <!-- <meta property="og:title" content="<?php //print $head_title;?>" />
  <meta property="og:description" content="<?php //print $meta_description;?>" />
  <meta property="og:image" content="<?php //print $meta_image; ?>" />-->
	
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
  <?php print $page; ?>
  <?php print $page_bottom; ?>
 <script type="text/javascript" src="//assets.zendesk.com/external/zenbox/v2.6/zenbox.js"></script>
<style type="text/css" media="screen, projection">
  @import url(//assets.zendesk.com/external/zenbox/v2.6/zenbox.css);
</style>
<script type="text/javascript">
  if (typeof(Zenbox) !== "undefined") {
    Zenbox.init({
      dropboxID:   "20134484",
      url:         "https://kabbalah.zendesk.com",
      tabTooltip:  "Support",
      tabImageURL: "https://assets.zendesk.com/external/zenbox/images/tab_support.png",
      tabColor:    "black",
      tabPosition: "Left"
    });
  }
</script>
</body>

</html>