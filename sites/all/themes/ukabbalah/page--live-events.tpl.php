 <main id="pageregion">
	<div id="maincontentTopics">
	<?php print $messages; ?>
	<?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
	<?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
	<?php print render($page['content']); ?>
	<div class="liveEventCollectionSection">
	<?php print render($page['liveEventCollectionSection']); ?>
	</div>
	</div><!--end of maincontent-->
</main><!-- end of pageregion -->

