<main id="pageregion">
   	<div id="mainContentWrapper">
    <?php print $messages; ?>
    
    <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
  
    <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
    <?php print render($page['content']); ?>
    </div><!--end of mainContentWrapper-->
 </main><!-- end of pageregion -->
  
<div id="SocialMediaWrapper">
		<div id="SocialMedia">
			<div id="fpSocialMediaBlock1"><span class="icon-twitter"></span><?php  print render($page['ktweet']);?></div>
			<div id="fpSocialMediaBlock2"><?php  print render($page['kfacebook']);?></div>
	      	<div id="fpSocialMediaBlock3"><span class="icon-testimonial"></span><?php  print render($page['ktestimonials']);?></div>	      	
		</div>
</div>