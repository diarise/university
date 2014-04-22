<main id="pageregion">
    <?php print $messages; ?>
    <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
    <?php //if ($title): ?><!--<h1 class="title" id="page-title">--><?php //print $title; ?><!--</h1>--><?php //endif; ?>
    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
    <?php print render($page['content']); ?>
	</main><!-- end of pageregion -->
	
	<!-- <div id="lessonCollectionSection">
		<?php //print render($page['pagelessoncollection']); ?>
	</div> -->
<?php
 $course_list_title ="";
 $event_list_title = "";
 
 if( sizeof( $node->field_course_list) > 0  ) $course_list_title = $node->field_course_list['und'][0]['node']->title;
 if( sizeof( $node->field_event_list) > 0  ) $event_list_title = $node->field_event_list['und'][0]['node']->title;

if($course_list_title != ""){
?>
	<div class="lessonCollectionSection">
		<?php print render($page['courselessoncollection']); ?>
	</div>
<?php }
if($event_list_title !=""){?>
	<div class="lessonCollectionSection">
		<?php print render($page['lessoneventcollection']); ?>
	</div>
  <?php } ?>
  

<div class='commentsSection'><?php print render($page['comments']); ?></div>  