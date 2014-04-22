<main id="pageregion">
   	<div id="mainContentWrapper">
    <?php print $messages; ?>
    
    <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
  
    <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
    <?php print render($page['content']); ?>
    </div><!--end of mainContentWrapper-->
 </main><!-- end of pageregion -->