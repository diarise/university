<?php

// Auto-rebuild the theme registry during theme development.
drupal_theme_rebuild();

// if (theme_get_setting('blueprint_rebuild_registry')) {
//   drupal_theme_rebuild();
// }
// if (theme_get_setting('blueprint_animated_submit')) {
//   drupal_add_js(drupal_get_path('theme', 'blueprint') .'/scripts/submit_animated.js');
// }

/**
 * Implements HOOK_theme().
 */
function blueprint_theme(&$existing, $type, $theme, $path) {
  // dpm(drupal_get_path('theme', 'blueprint'));
  
  // if (!db_is_active()) {
  //   return array();
  // }
  include_once './' . drupal_get_path('theme', 'blueprint') . '/template.theme-registry.inc';
  
  return _blueprint_theme($existing, $type, $theme, $path);
}

/**
 * Intercept template variables 
 *
 * @param $vars
 *   A sequential array of variables passed to the theme function.
 */
function blueprint_preprocess(&$variables, $hook) {
  if (module_exists('libraries')) {
    $variables['bp_library_path'] = module_invoke('libraries', 'get_path', 'blueprint') .'/';
  }
  else {
    $variables['bp_library_path'] = 'sites/all/libraries/blueprint/';
  }
  // TODO: Tons of cool stuff here. drupal_add_css was really improved, just need to take good advantage of it!
  drupal_add_css($variables['bp_library_path'] .'blueprint/screen.css', 'theme', 'screen,projection');
  // drupal_add_css($variables['bp_library_path'] .'blueprint/print.css', 'theme', 'print');
}

/**
 * Intercept page template variables
 *
 * @param $vars
 *   A sequential array of variables passed to the theme function.
 */
function blueprint_preprocess_page(&$vars) {
  global $user;
  $vars['path'] = base_path() . path_to_theme() .'/';
  $vars['path_parent'] = base_path() . drupal_get_path('theme', 'blueprint') . '/';
  $vars['user'] = $user;

  // Prep the logo for being displayed
  $site_slogan = (!$vars['site_slogan']) ? '' : ' - '. $vars['site_slogan'];
  $logo_img ='';
  $title = $text = variable_get('site_name', '');
  if ($vars['logo']) {
    $logo_img = "<img src='". $vars['logo'] ."' alt='". $title ."' border='0' />";
    $text = ($vars['site_name']) ? $logo_img . $text : $logo_img;
  }
  $vars['logo_block'] = (!$vars['site_name'] && !$vars['logo']) ? '' : l($text, '', array('attributes' => array('title' => $title . $site_slogan), 'html' => !empty($logo_img)));
  // Even though the site_name is turned off, let's enable it again so it can be used later.
  $vars['site_name'] = variable_get('site_name', '');

  //Play nicely with the page_title module if it is there.
  // if (!module_exists('page_title')) {
  //   // Fixup the $head_title and $title vars to display better.
  //   $title = drupal_get_title();
  //   // TODO: fix this headers thing.
  //   $headers = drupal_set_header();
  //       // 
  //       // drupal_add_http_header($name, $value, $append = FALSE)
  //       // drupal_set_header($header = NULL)
  // 
  //   // if this is a 403 and they aren't logged in, tell them they need to log in
  //   if (strpos($headers, 'HTTP/1.1 403 Forbidden') && !$user->uid) {
  //     $title = t('Please login to continue');
  //   }
  //   $vars['title'] = $title;
  // 
  //   if (!drupal_is_front_page()) {
  //     $vars['head_title'] = $title .' | '. $vars['site_name'];
  //     if ($vars['site_slogan'] != '') {
  //       $vars['head_title'] .= ' &ndash; '. $vars['site_slogan'];
  //     }
  //   }
  //   $vars['head_title'] = strip_tags($vars['head_title']);
  // }


  // determine layout
  // 3 columns
  // dpm($vars);
  if ($vars['layout'] == 'both') {
    $vars['first_classes'] = 'col-first span-6';
    $vars['second_classes'] = 'col-second span-6 last';
    $vars['center_classes'] = 'col-center span-12';
    $vars['classes_array'][] .= ' col-3 ';
  }

  // 2 columns
  elseif ($vars['layout'] != 'none') {
    // left column & center
    if ($vars['layout'] == 'first') {
      $vars['first_classes'] = 'col-first span-6';
      $vars['center_classes'] = 'col-center span-18 last';
    }
    // right column & center
    elseif ($vars['layout'] == 'second') {
      $vars['second_classes'] = 'col-second span-6 last';
      $vars['center_classes'] = 'col-center span-18';
    }
    $vars['classes_array'][] .= ' col-2 ';
  }
  // 1 column
  else {
    $vars['center_classes'] = 'col-center span-24';
    $vars['classes_array'][] .= ' col-1 ';
  }
  //Perform RTL - LTR swap and load RTL Styles.
  if ($vars['language']->dir == 'rtl') {
    // Remove Blueprint Grid and use RTL grid
    $css = $vars['css'];
    $css['screen,projection']['theme'][path_to_theme() .'/blueprint/blueprint/plugins/rtl/screen.css'] = TRUE;
    $vars['styles'] = drupal_get_css($css);
    
    //setup rtl css for IE
    $vars['styles_ie']['ie'] = '<link href="'. $path .'css/ie-rtl.css" rel="stylesheet"  type="text/css"  media="screen, projection" />';
    $vars['styles_ie']['ie6'] = '<link href="'. $path .'css/ie6-rtl.css" rel="stylesheet"  type="text/css"  media="screen, projection" />';
  }

  $vars['meta'] = '';
  // SEO optimization, add in the node's teaser, or if on the homepage, the mission statement
  // as a description of the page that appears in search engines
  // if ($vars['is_front'] && $vars['mission'] != '') {
  //   $vars['meta'] .= '<meta name="description" content="'. blueprint_trim_text($vars['mission']) .'" />'."\n";
  // }
  // elseif (isset($vars['node']->teaser) && $vars['node']->teaser != '') {
  //   $vars['meta'] .= '<meta name="description" content="'. blueprint_trim_text($vars['node']->teaser) .'" />'."\n";
  // }
  // elseif (isset($vars['node']->body) && $vars['node']->body != '') {
  //   $vars['meta'] .= '<meta name="description" content="'. blueprint_trim_text($vars['node']->body) .'" />'."\n";
  // }
  // SEO optimization, if the node has tags, use these as keywords for the page
  if (isset($vars['node']->taxonomy)) {
    $keywords = array();
    foreach ($vars['node']->taxonomy as $term) {
      $keywords[] = $term->name;
    }
    $vars['meta'] .= '<meta name="keywords" content="'. implode(',', $keywords) .'" />'."\n";
  }

  // SEO optimization, avoid duplicate titles in search indexes for pager pages
  if (isset($_GET['page']) || isset($_GET['sort'])) {
    $vars['meta'] .= '<meta name="robots" content="noindex,follow" />'. "\n";
  }

  // if (theme_get_setting('blueprint_showgrid')) {
  //   $vars['body_classes'] .= ' showgrid ';
  // }

  // Make sure framework styles are placed above all others.
  // $vars['css_alt'] = blueprint_css_reorder($vars['css']);
  // $vars['styles'] = drupal_get_css($vars['css_alt']);

  /* I like to embed the Google search in various places, uncomment to make use of this
  // setup search for custom placement
  $search = module_invoke('google_cse', 'block', 'view', '0');
  $vars['search'] = $search['content'];
  */

  /* to remove specific CSS files from modules use this trick
  // Remove stylesheets
  $css = $vars['css'];
  unset($css['all']['module']['sites/all/modules/contrib/plus1/plus1.css']);
  $vars['styles'] = drupal_get_css($css);
  */

}

/**
 * Intercept node template variables
 *
 * @param $vars
 *   A sequential array of variables passed to the theme function.
 */
function blueprint_preprocess_node(&$vars) {
  $node = $vars['node']; // for easy reference
  // for easy variable adding for different node types
  switch ($node->type) {
    case 'page':
      break;
  }
}

/**
 * Intercept comment template variables
 *
 * @param $vars
 *   A sequential array of variables passed to the theme function.
 */
// function blueprint_preprocess_comment(&$vars) {
//   static $comment_count = 1; // keep track the # of comments rendered
//   // Calculate the comment number for each comment with accounting for pages.
//   $page = 0;
//   $comments_previous = 0;
//   if (isset($_GET['page'])) {
//     $page = $_GET['page'];    
//     $comments_per_page = variable_get('comment_default_per_page_' . $vars['node']->type, 1);
//     $comments_previous = $comments_per_page * $page;
//   }
//   $vars['comment_count'] =  $comments_previous + $comment_count;
// 
//   // if the author of the node comments as well, highlight that comment
//   $node = node_load($vars['comment']->nid);
//   if ($vars['comment']->uid == $node->uid) {
//     $vars['author_comment'] = TRUE;
//   }
// 
//   // If comment subjects are disabled, don't display them.
//   if (variable_get('comment_subject_field_' . $vars['node']->type, 1) == 0) {
//     $vars['title'] = '';
//   }
//   else {
//     $vars['title'] = l($vars['comment']->subject, 'node/'. $vars['node']->nid, array('query' => $query, 'fragment' => $fragment));
//   }
// 
//   // Add the pager variable to the title link if it needs it.
//   $fragment = 'comment-' . $vars['comment']->cid;
//   $query = '';
//   if (!empty($page)) {
//     $query = 'page='. $page;
//   }
// 
//   $vars['comment_count_link'] = l('#'. $vars['comment_count'], 'node/'. $vars['node']->nid, array('query' => $query, 'fragment' => $fragment));
// 
//   $comment_count++;
//   
//   // dpm($vars);
// }

/**
 * Override or insert variables into the block templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
// function blueprint_preprocess_block(&$vars, $hook) {
//   $block = $vars['block'];
// 
//   // Special classes for blocks.
//   $classes = array('block');
//   $classes[] = 'block-' . $block->module;
//   $classes[] = 'region-' . $vars['block_zebra'];
//   $classes[] = $vars['zebra'];
//   $classes[] = 'region-count-' . $vars['block_id'];
//   $classes[] = 'count-' . $vars['id'];
// 
//   $vars['edit_links_array'] = array();
//   $vars['edit_links'] = '';
// 
//   // if (theme_get_setting('blueprint_block_edit_links') && user_access('administer blocks')) {
//   //   include_once './' . drupal_get_path('theme', 'blueprint') . '/template.block-editing.inc';
//   //   blueprint_preprocess_block_editing($vars, $hook);
//   //   $classes[] = 'with-block-editing';
//   // }
// 
//   // Render block classes.
//   $vars['classes'] = implode(' ', $classes);
// }


/**
 * Override, use a better default breadcrumb separator.
 *
 * Return a themed breadcrumb trail.
 *
 * @param $breadcrumb
 *   An array containing the breadcrumb links.
 * @return a string containing the breadcrumb output.
 */
function blueprint_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    // Don't add the title if menu_breadcrumb exists. TODO: Add a settings 
    // checkbox to optionally control the display.
    if (!module_exists('menu_breadcrumb') && count($breadcrumb) > 0) {
        $breadcrumb[] = drupal_get_title();
    }
    $output .= '<div class="breadcrumb">' . implode(' » ', $breadcrumb) . '</div>';
    return $output;
  }
}

/**
 * Rewrite of theme_form_element() to suppress ":" if the title ends with a punctuation mark.
 */
// function blueprint_form_element($element, $value) {
//   $args = func_get_args();
//   return preg_replace('@([.!?]):\s*(</label>)@i', '$1$2', call_user_func_array('theme_form_element', $args));
// }

/**
 * Set status messages to use Blueprint CSS classes.
 */
function blueprint_status_messages($variables) {
  $display = $variables['display'];
  $output = '';

  $status_heading = array(
    'status' => t('Status message'),
    'error' => t('Error message'),
    'warning' => t('Warning message'),
  );
  foreach (drupal_get_messages($display) as $type => $messages) {
    // blueprint can either call this success or notice
    // var $type_bp;
    
    if ($type == 'status') {
      $type_bp = 'success';
    }
    
    
    $output .= "<div class=\"messages $type $type_bp\">\n";
    if (!empty($status_heading[$type])) {
      $output .= '<h2 class="element-invisible">' . $status_heading[$type] . "</h2>\n";
    }
    if (count($messages) > 1) {
      $output .= " <ul>\n";
      foreach ($messages as $message) {
        $output .= '  <li>' . $message . "</li>\n";
      }
      $output .= " </ul>\n";
    }
    else {
      $output .= $messages[0];
    }
    $output .= "</div>\n";
  }
  return $output;
}


/**
 * Override, use better icons, source: http://drupal.org/node/102743#comment-664157
 *
 * Format the icon for each individual topic.
 *
 * @ingroup themeable
 */
function blueprint_forum_icon($new_posts, $num_posts = 0, $comment_mode = 0, $sticky = 0) {
  // because we are using a theme() instead of copying the forum-icon.tpl.php into the theme
  // we need to add in the logic that is in preprocess_forum_icon() since this isn't available
  if ($num_posts > variable_get('forum_hot_topic', 15)) {
    $icon = $new_posts ? 'hot-new' : 'hot';
  }
  else {
    $icon = $new_posts ? 'new' : 'default';
  }

  if ($comment_mode == COMMENT_NODE_READ_ONLY || $comment_mode == COMMENT_NODE_DISABLED) {
    $icon = 'closed';
  }

  if ($sticky == 1) {
    $icon = 'sticky';
  }

  $output = theme('image', path_to_theme() . "/images/icons/forum-$icon.png");

  if ($new_posts) {
    $output = "<a name=\"new\">$output</a>";
  }

  return $output;
}

/**
 * Override, remove previous/next links for forum topics
 *
 * Makes forums look better and is great for performance
 * More: http://www.sysarchitects.com/node/70
 */
function blueprint_forum_topic_navigation($node) {
  return '';
}

/**
 * Trim a post to a certain number of characters, removing all HTML.
 */
function blueprint_trim_text($text, $length = 150) {
  // remove any HTML or line breaks so these don't appear in the text
  $text = trim(str_replace(array("\n", "\r", "\r\n"), ' ', strip_tags(html_entity_decode($text, ENT_QUOTES, 'UTF-8'))));
  $text = trim(substr($text, 0, $length));
  $lastchar = substr($text, -1, 1);
  // check to see if the last character in the title is a non-alphanumeric character, except for ? or !
  // if it is strip it off so you don't get strange looking titles
  if (preg_match('/[^0-9A-Za-z\!\?]/', $lastchar)) {
    $text = substr($text, 0, -1);
  }
  // ? and ! are ok to end a title with since they make sense
  if ($lastchar != '!' && $lastchar != '?') {
    $text .= '...';
  }
  return $text;
}

/**
 * This rearranges how the style sheets are included so the framework styles
 * are included first.
 *
 * Sub-themes can override the framework styles when it contains css files with
 * the same name as a framework style. This can be removed once Drupal supports
 * weighted styles.
 */
function blueprint_css_reorder($css) {
  foreach ($css as $media => $styles_from_bp) {
    // Setup framework group.
    if (!isset($css[$media]['libraries'])) {
      $css[$media] = array_merge(array('libraries' => array()), $css[$media]);
    }
    else {
      $libraries = $css[$media]['libraries'];
      unset($css[$media]['libraries']);
      $css[$media] = array_merge($libraries, $css[$media]);
    }
    foreach ($styles_from_bp as $section => $value) {
      foreach ($value as $style_from_bp => $bool) {
        // Force framework styles to come first.
        if (strpos($style_from_bp, 'libraries') !== FALSE) {
          $css[$media]['libraries'][$style_from_bp] = $bool;
          unset($css[$media][$section][$style_from_bp]);
        }
      }
    }
  }
  return $css;
}

function get_current_url() 
{
	//return urlencode("https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
	
	 global $user;
    if ($user->uid == 0){
        //return l("Login","user/login",array('query' => drupal_get_destination()));
      
        return l("Login","user");
        }
    else{
    return l("Logout","user/logout",array('query' => drupal_get_destination()));
	} 
}


function ukabbalah_tabs($variable){

      drupal_add_library ( 'system' , 'ui.tabs' );

      drupal_add_js(array('ukabbalahtabs' => array('var' => $variable)), array('type' => 'setting'));

      drupal_add_js ( 'jQuery(document).ready(function(){
        jQuery("#tabs").tabs({ active: Drupal.settings.ukabbalahtabs.var });
      });
      ' , 'inline' );
}


function ukabbalah_preprocess_page(&$vars) {
	
	if (isset($vars['node']->type)) {
	$vars['theme_hook_suggestions'][] = 'page__' . $vars['node']->type;
	}
  
    // Image Cache Logic 
	$node = &$vars['node'];
	if ($node->type == 'lesson') 
	{	
		if( sizeof( $node->field_course_list) > 0  ) $course_nid = node_load($node->field_course_list['und'][0]['nid']); 
		if( sizeof( $node->field_event_list) > 0  )  $course_nid = node_load($node->field_event_list['und'][0]['nid']);
		
		if($node->field_type_of_lesson['und'][0]['tid']== 554 )
		{ 	 
		  $image_url = $course_nid->field_image_cdn_link['und'][0]['value'];
		}else{
		  
		  $video_id=$node->field_lesson_video['und'][0]['twistage_existing_videos'];
		  $image_url = 'http://twistassets.kabbalah.com/videos/'.$video_id.'/screenshots/1000w.jpg';
		}	
		
		$vars['lesson_image']=theme('imagecache_external', array('path' => $image_url,'style_name'=> 'node_video_overlay','alt' => $node->title,'class'=>'lesson_image_preview')); 
	}
	elseif ($node->type == 'course')
	{
		$image_url = $node->field_image_cdn_link['und'][0]['value'];
		$vars['course_image']=theme('imagecache_external', array('path' => $image_url,'style_name'=> 'course_node_image','alt' => $node->title,)); 	
	}
	// End of Image Cache Logic 
  
}

function ukabbalah_preprocess_node(&$variables) {
  if ($variables['view_mode'] == 'full') {
    $node =& $variables['node'];
	$path = drupal_get_path_alias($_GET['q']);
    if ($node->type == 'lesson') {
      $path = drupal_get_path('theme', 'ukabbalah');
      drupal_add_js($path . '/js/activelesson.js', array('nodeinfo'=>array('nodepath'=>$path)),'setting');
    }
	elseif ($node->type == 'course'|| $node->type == 'live_events' )
	{
		$image_url = $node->field_image_cdn_link['und'][0]['value'];
		$variables['course_image']=theme('imagecache_external', array('path' => $image_url,'style_name'=> 'course_node_image','alt' => $node->title,)); 	
	}
  }
}

function ukabbalah_css_alter(&$css) {
  global $user;

  foreach ($css as $key => $value) {
    if ($value['group'] != CSS_THEME) {
      $exclude[$key] = FALSE;
    }
  }
  if (!(bool)$GLOBALS['user']->uid ){
    $css = array_diff_key($css, $exclude);
  }
  

}

function _taxonomy_node_get_terms_by_vocabulary($node, $vid, $key = 'tid') {
  $result = db_query('SELECT t.tid, t.* FROM {taxonomy_term_data} t INNER JOIN {taxonomy_index} r ON r.tid = t.tid WHERE t.vid = :vid AND r.nid = :node_nid ORDER BY weight', array(':vid' => $vid, ':node_nid' => $node->nid));
  return $result->fetchAll();
}

function ukabbalah_preprocess_html(&$variables) {

  //$variables['head_scripts'] = drupal_get_js('head_scripts');	

  $variables['customsearchform'] = block_get_blocks_by_region('customsearchform');
  
  $variables['menu'] = block_get_blocks_by_region('menu');
  $variables['mobileMenu'] = block_get_blocks_by_region('mobileMenu');
  $variables['search'] = block_get_blocks_by_region('search');
  $variables['universalMenu'] = block_get_blocks_by_region('universalMenu');

  $variables['ktweet'] = block_get_blocks_by_region('ktweet');
  $variables['kfacebook'] = block_get_blocks_by_region('kfacebook');
  $variables['ktestimonials'] = block_get_blocks_by_region('ktestimonials');

  $variables['footer1'] = block_get_blocks_by_region('footer1');
  $variables['footer2'] = block_get_blocks_by_region('footer2');
  $variables['footer3'] = block_get_blocks_by_region('footer3');
  $variables['footer4'] = block_get_blocks_by_region('footer4');
  $variables['footer5'] = block_get_blocks_by_region('footer5');
  $variables['footer6'] = block_get_blocks_by_region('footer6');
  $variables['studentsupport'] = block_get_blocks_by_region('studentsupport');
  $variables['copywrite'] = block_get_blocks_by_region('copywrite');
  $variables['socialmedia'] = block_get_blocks_by_region('socialmedia');
  
  // If on an individual node page, add the node type to body classes.
  if ($node = menu_get_object()  ) 
  {
    if( $node->type == 'lesson' || $node->type == 'course' || $node->type == 'live_events' )
	{
		

    if ( $node->type == 'lesson' ) {
      $course_list_title ="";
      if( sizeof( $node->field_course_list) > 0  )
      {
        $course_list_title = $node->field_course_list['und'][0]['node']->title;
      } 
      if( sizeof( $node->field_event_list) > 0  ) 
      {
        $event_list_title = $node->field_event_list['und'][0]['node']->title;
      } 
    
      if( $course_list_title != "") { $course_title = $course_list_title; } else { $course_title = $event_list_title; }
      $variables['head_title'] = $course_title ." | ". $node->title; // find your cck field here
    } else {
      $variables['head_title'] = $node->title; // find your cck field here
    }

	if( sizeof( $node->field_course_list) > 0  ) $course_nid = node_load($node->field_course_list['und'][0]['node']->nid); 
	if( sizeof( $node->field_event_list) > 0  )  $course_nid = node_load($node->field_event_list['und'][0]['node']->nid);
	
	if( $node->body['und'][0]['value'] != "" )
	{
		$variables['head_desc'] = $node->body['und'][0]['value'];	
	}
	else 
	{
		$variables['head_desc'] = $course_nid->body['und'][0]['value'];	
	};
		
		foreach ($node->field_type_of_lesson as $term) 	{ 	$field_type_of_lesson = $term[0]['taxonomy_term']->name; }
		
		if( $node->type == 'live_events' )
		{
			$image_link = $node->field_image_cdn_link['und'][0]['value'];
		}
		else
		{		
			if( $field_type_of_lesson == 'Video' ) 
			{
				$image_link = "http://twistassets.kabbalah.com/videos/".$node->field_lesson_video['und'][0]['twistage_existing_videos']."/screenshots/620w.jpg";
			} else{
				
				//$course_nid= node_load($node->field_course_list['und'][0]['node']->nid);
				$image_link = $course_nid->field_image_cdn_link['und'][0]['value'];
			}
		}
    
		if( $node->type == 'course' || $node->type == 'live_events' ) {
      $image_link = $node->field_image_cdn_link['und'][0]['value'];
    }
    
		$variables['head_image'] = $image_link;
	}
  
  }
}



/**
 * Process variables for search-result.tpl.php.
 *
 * @see search-result.tpl.php
 */
function ukabbalah_preprocess_search_result(&$variables) {
  // Add node object to result, so we can display imagefield images in results.
  $n = node_load($variables['result']['fields']['entity_id']);
  $n && ($variables['node'] = $n);
}



function ukabbalah_facetapi_link_inactive($variables) {
  $accessible_vars = array(
    'text' => $variables['text'],
    'active' => FALSE,
  );
  $accessible_markup = theme('facetapi_accessible_markup', $accessible_vars);
  $sanitize = empty($variables['options']['html']);
  $variables['text'] = ($sanitize) ? check_plain($variables['text']) : $variables['text'];
  if (isset($variables['count'])) {
    $variables['text'] .= ' <span class="nbrKeyWord">' . theme('facetapi_count', $variables) . '</span>';
  }
  $variables['text'] .= $accessible_markup;
  $variables['options']['html'] = TRUE;
  return theme_link($variables);
}