   <main id="pageregion">
		<?php print $messages; ?>
		<?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
		<?php //if ($title): ?><!--<h1 class="title" id="page-title">--><?php //print $title; ?><!--</h1>--><?php //endif; ?>
		<?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
		<?php print render($page['content']); ?>	
	</main><!-- end of pageregion -->
	
	<?php
	if ( sizeof( $node->field_type_of_course) > 0 && $node->field_type_of_course['und'][0]['tid']==562){
	?>
	<div class="lessonCollectionSection">
		<?php print render($page['courselessoncollection']); ?>
	</div>
	<?php
	}else{
	?>
	<div class="lessonCollectionSection">
		<?php print render($page['lessonsineventcoursepage']); ?>
	</div>
  <?php }?>