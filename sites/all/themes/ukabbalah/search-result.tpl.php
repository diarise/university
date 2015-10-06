<?php

/**
 * @file
 * Default theme implementation for displaying a single search result.
 *
 * This template renders a single search result and is collected into
 * search-results.tpl.php. This and the parent template are
 * dependent to one another sharing the markup for definition lists.
 *
 * Available variables:
 * - $url: URL of the result.
 * - $title: Title of the result.
 * - $snippet: A small preview of the result. Does not apply to user searches.
 * - $info: String of all the meta information ready for print. Does not apply
 *   to user searches.
 * - $info_split: Contains same data as $info, split into a keyed array.
 * - $module: The machine-readable name of the module (tab) being searched, such
 *   as "node" or "user".
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Default keys within $info_split:
 * - $info_split['module']: The module that implemented the search query.
 * - $info_split['user']: Author of the node linked to users profile. Depends
 *   on permission.
 * - $info_split['date']: Last update of the node. Short formatted.
 * - $info_split['comment']: Number of comments output as "% comments", %
 *   being the count. Depends on comment.module.
 *
 * Other variables:
 * - $classes_array: Array of HTML class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $title_attributes_array: Array of HTML attributes for the title. It is
 *   flattened into a string within the variable $title_attributes.
 * - $content_attributes_array: Array of HTML attributes for the content. It is
 *   flattened into a string within the variable $content_attributes.
 *
 * Since $info_split is keyed, a direct print of the item is possible.
 * This array does not apply to user searches so it is recommended to check
 * for its existence before printing. The default keys of 'type', 'user' and
 * 'date' always exist for node searches. Modules may provide other data.
 * @code
 *   <?php if (isset($info_split['comment'])): ?>
 *     <span class="info-comment">
 *       <?php print $info_split['comment']; ?>
 *     </span>
 *   <?php endif; ?>
 * @endcode
 *
 * To check for all available data within $info_split, use the code below.
 * @code
 *   <?php print '<pre>'. check_plain(print_r($info_split, 1)) .'</pre>'; ?>
 * @endcode
 *
 * @see template_preprocess()
 * @see template_preprocess_search_result()
 * @see template_process()
 *
 * @ingroup themeable
 */
 
 // $node = node_load($result['fields']['entity_id']);
 if( $node->type == "lesson")
  { 
    if($node->field_type_of_lesson['und'][0]['tid']== 554 ) 
    { 
      if( sizeof( $node->field_course_list) > 0  ) $course_nid = node_load($node->field_course_list['und'][0]['nid']); 
      if( sizeof( $node->field_event_list) > 0  )  $course_nid = node_load($node->field_event_list['und'][0]['nid']);   
      $image_url = $course_nid->field_image_cdn_link['und'][0]['value'];
    }else{
      
      $video_id=$node->field_lesson_video['und'][0]['twistage_existing_videos'];
      $image_url = 'http://twistassets.kabbalah.com/videos/'.$video_id.'/screenshots/300w.jpg';
    }
    
  }else{
     $image_url =$node->field_image_cdn_link['und'][0]['value'];
  }
 
 
?>

<div class="searchContentWrapper"<?php print $attributes; ?>>
  <div class="searchContenImage">
      <?php if($image_url) print "<img src ='".$image_url."' class = 'theImage'  alt=''/>"; ?>
  </div>
  <div class="searchContenTitle">
      <a href="<?php print $url; ?>"><?php print $title; ?></a>
  </div>
  <div class="searchContenText">
      <?php if ($snippet): ?>
        <p class="search-snippet"<?php print $content_attributes; ?>><?php print $snippet; ?></p>
      <?php endif; ?>
      <?php if ($info): ?>
        <p class="search-info"><?php print $info; ?></p>
      <?php endif; ?>
  </div>
</div>



