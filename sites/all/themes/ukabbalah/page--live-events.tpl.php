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

	<div class='commentsSection'>
		<div class="commentingText">Please share your thoughts with our online student community. 
		After posting, your comment will be submitted for approval and published soon. 
		For assistance with technical problems, using the site or with your account or to share suggestions, please contact <a href="mailto:care@ukabbalah.com" target="_blank">care@ukabbalah.com</a>.
		</div>
		<?php print render($page['comments']); ?>
	</div>