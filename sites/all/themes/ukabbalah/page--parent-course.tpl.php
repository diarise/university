<main id="pageregion">
	<div id="courseByParentWrapper">
		<?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
		<?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
		<?php print render($page['coursesforparentcourse']); ?>
	</div>
</main><!-- end of pageregion -->