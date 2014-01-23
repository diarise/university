<?php
function twistal_settings_page($pid = 0) {
	if ($pid && is_numeric($pid)) {
		return drupal_get_form('twistage_profile_admin_form', $pid);
	} else {
		$profiles=twistal_profiles();
		if (empty($profiles)) {
		  $content = '<p>No profiles found. <a href="/admin/settings/twistal/create">Create one now</a>.</p>';
		  return $content;
		}
		$header = array(
		  t('Name'),
		  t('Type'),
		  t('Path (if page)'),
		  t('Operations'),
		);
		$rows = array();
		foreach ($profiles as $array) {
			$profile=new twistage_profile($array['pid']);
			$rows[] = array(
				$profile->name,
				$profile->type,
				$profile->path,
				'<a href="/admin/settings/twistal/profile/' . $profile->pid . '">edit</a>'
			);
		}
		return theme('table',array('header'=>$header, 'rows'=>$rows));
	}
}
class EmptyObj{
	public function __get($key){
		return '';
	}
}
/*
 *	Profile form for twistage profiles
 */
function twistal_profile_admin_form($form, &$form_state, $pid = NULL){
	$form = array(); 
  if (!is_numeric($pid)) {
    $pid = 0;
  }
  if ($pid) {
    $profile = twistage_get_profile($pid);
    $form['#pid'] = $pid;
  } else {
    $profile = new EmptyObj(); // will remain empty
  }
  // Special rebuild for form deletion
  if (isset($form_state['values']) && $form_state['values']['op'] == t('Delete')) {
    drupal_set_title(t('Delete profile'));
    $form['confirm'] = array(
      '#value' => '<p>' . t('Are you sure you want to delete the profile !name?', array('!name' => $profile->description)) . '</p>',
    );
    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => t('Delete'),
    );
    return $form;
  }
  
  $form['profile'] = array(
    '#type' => 'fieldset',
    '#title' => t('Profile settings'),
  );
  
  $form['profile']['name'] = array(
    '#type' => 'textfield',
    '#title' => t('Profile name'),
    '#description' => t('A machine-readable Drupal identifier for this Twistage player.'),
    '#default_value' => $profile->name,
    '#required' => TRUE,
  );
  
  $form['profile']['description'] = array(
    '#type' => 'textfield',
    '#title' => t('Profile description'),
    '#description' => t('A description of this profile (for public display).'),
    '#default_value' => $profile->description,
    '#required' => TRUE,
  );
    
  $form['profile']['company'] = array(
    '#type' => 'textfield',
    '#title' => t('Company ID'),
    '#description' => t('This can be found in the "Company Info" section of the "Accounts" tab in the Twistage admin area.'),
    '#default_value' => $profile->company,
    '#required' => TRUE,
   );
  
  $form['profile']['site_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Site name'),
    '#description' => t('The name of the Twistage site associated with this profile. This can be found in the "Sites" section of the "Settings" tab.'),
    '#default_value' => $profile->site_name,
    '#required' => TRUE,
  );
   
  $form['profile']['site_key'] = array(
    '#type' => 'textfield',
    '#title' => t('Site license key'),
    '#description' => t('This can be also found in the "Sites" section of the "Settings" tab.'),
    '#default_value' => $profile->site_key,
    '#required' => TRUE,
  );
  
  $form['profile']['site_username'] = array(
    '#type' => 'textfield',
    '#title' => t('Site publishing username'),
    '#description' => t('The username you use to log in to Twistage. Needed only for publishing videos through your Drupal site.'),
    '#default_value' => $profile->site_username,
  );
  
  $form['profile']['type'] = array(
    '#type' => 'radios',
    '#title' => t('Show player as a'),
    '#options' => array('page' => t('Page'), 'block' => t('Block')),
    '#default_value' => $profile->type,
  );
  
  $form['profile']['page'] = array(
    '#type' => 'fieldset',
    '#title' => t('Page settings'),
  );
  
  $form['profile']['page']['path'] = array(
    '#type' => 'textfield',
    '#title' => t('Path'),
    '#description' => t('Only valid for page profiles'),
    '#default_value' => $profile->path,
    '#weight' => 1,
  );
  
  $form['profile']['page']['page_header'] = array(
    '#type' => 'textarea',
    '#title' => t('Page header'),
    '#default_value' => $profile->page_header,
    '#weight' => 2,
  );
  
  //$form['profile']['page']['page_header_format'] = filter_form($profile->page_header_format, 3, array('page_header_format'));
  
  $form['profile']['page']['page_footer'] = array(
    '#type' => 'textarea',
    '#title' => t('Page footer'),
    '#default_value' => $profile->page_footer,
    '#weight' => 4
  );
  
 // $form['profile']['page']['page_footer_format'] = filter_form($profile->page_footer_format, 5, array('page_footer_format'));
  
  $form['profile']['page']['show_table'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show table of videos'),
    '#description' => t('Allow users to select other videos in the profile to view from a table on the page'),
    '#default_value' => $profile->show_table,
    '#weight' => 6,
  );
   
  $form['player'] = array(
    '#type' => 'fieldset',
    '#title' => t('Player settings'),
  );
  
  $form['player']['width'] = array(
    '#type' => 'textfield',
    '#title' => t('Player width'),
    '#size' => 5,
    '#default_value' => $profile->width,
  );
  
  $form['player']['height'] = array(
    '#type' => 'textfield',
    '#title' => t('Player height'),
    '#size' => 5,
    '#default_value' => $profile->height,
  );
  
  $form['player']['autoplay'] = array(
    '#type' => 'checkbox',
    '#title' => t('Autoplay'),
    '#description' => t('Auto-start video playback once the page loads'),
    '#default_value' => $profile->autoplay,
  );
  
  $form['preroll'] = array(
    '#type' => 'fieldset',
    '#title' => t('Pre-roll settings'),
  );
  
  $form['preroll']['info'] = array(
    '#value' => t('Some applications will want to show a mandatory "pre-roll" video before the actual payload video (generally for ads). To use pre-rolls, enter a company ID and site license key from which to draw pre-roll clips. Note that they may be the same as your primary company and key, although it is recommended that you use a separate Twistage site to store prerolls.'),
  );
  
  $form['preroll']['preroll_company'] = array(
    '#type' => 'textfield',
    '#title' => t('Pre-roll company ID'),
    '#default_value' => $profile->preroll_company,
  );
  
  $form['preroll']['preroll_site_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Pre-roll site name'),
    '#default_value' => $profile->preroll_site_name,
  );
  
  $form['preroll']['preroll_site_key'] = array(
    '#type' => 'textfield',
    '#title' => t('Pre-roll site license key'),
    '#default_value' => $profile->preroll_site_key,
  );
  
  $form['preroll']['preroll_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Pre-roll video link'),
    '#default_value' => $profile->preroll_url,
    '#maxlength' => 1024,
  );
  
  $form['hook'] = array(
    '#type' => 'fieldset',
    '#title' => t('Hook settings'),
  );
  
  $form['hook']['info'] = array(
    '#value' => t('<p>To receive "pings" from Twistage, you must create a username and password that Twistage will use to send data to your site.</p> 
                   <p>While it is technically possible to have a hook URL with no authentication, this module does not allow such a configuration for security reasons. If either of these fields are blank, pings will not be acknowledged.</p>'),
  );

 if ($profile->username && $profile->password) {
    $form['hook']['url'] = array(
      '#value' => t('<p>You have entered a username and password. You should set the following as your Twistage hook URL:</p>
                     <p><i>http://' . $_SERVER['SERVER_NAME'] . '/twistage/hook/' . $profile->name. '/' . $profile->username . '/' . $profile->password . '</i></p>'),
    );
  } else {
    $form['hook']['url'] = array(
      '#value' => t('<p>You have not saved a username and password yet. A hook URL will be available when you have.</p>'),
    );
  }
    
  
  
  $form['hook']['username'] = array(
    '#type' => 'textfield',
    '#title' => t('Username'),
    '#default_value' => $profile->username,
  );
  
  $form['hook']['password'] = array(
    '#type' => 'textfield',
    '#title' => t('Password'),
    '#description' => t('(will be shown in clear text)'),
    '#default_value' => $profile->password,
  );
   
   
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );
  
  $form['delete'] = array(
    '#type' => 'submit',
    '#value' => t('Delete'),
  );
  
  return $form;
}
/*
 *	Profile form validation for twistage profiles
 */
function twistal_profile_admin_form_validate($form, &$form_state) {
  if ($form_state['values']['op'] == t('Delete')) {
    if($form['confirm']) {
      // Clear rebuild flag to allow form to proceed to processing
      $form_state['rebuild'] = FALSE;
    } else {
      // Rebuild the form to confirm deletion.
      $form_state['rebuild'] = TRUE;
    }
    return;
  }
  
  if (preg_match('/[^a-zA-Z0-9_]/', $form_state['values']['name'])) {
    form_set_error('name', 'Name may contain only alphanumeric characters and underscores.');
  }
  
  if (!is_numeric($form_state['values']['width'])) {
    form_set_error('width', 'Non-numeric width entered.');
  }
  
  if (!is_numeric($form_state['values']['height'])) {
    form_set_error('height', 'Non-numeric height entered.');
  }
}
function twistal_profile_admin_form_submit($form, &$form_state) {
  if ($form_state['values']['op'] == t('Delete') && $form['#pid']) {
    // Delete; remove all videos and then the profile record.
	db_delete('twistal_data')
		->condition('pid',$form['#pid'])
		->execute();
	db_delete('tags_twistal')
		->condition('pid',$form['#pid'])
		->execute();
    $profile=new twistage_profile($form['#pid']);
	$profile->delete();
    drupal_set_message('Profile deleted.');
    $form_state['redirect'] = 'admin/settings/twistal';
    return;
  }
  $record = $form_state['values'];
  $record['pid']=0;
  if ($form['#pid']) {
    $record['pid'] = $form['#pid'];
  }
  $profile=new twistage_profile($record);
  $profile->save();  
  $form_state['redirect'] = 'admin/settings/twistal';
}

function twistal_video_info(){
	$form['vid']=array(
		'#type' => 'textfield',
		'#title' => 'The twistage ID for this video',
		'#required' => true
	);
	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => 'Submit',
	);
	return $form;
}

function twistal_video_info_submit($form,$form_state){
	drupal_goto('admin/settings/twistal/video/'.$form_state['values']['vid']);
}

function twistal_video_data_view($vid){
	$api=twistal(0);
	$video=$api->load_from_url('http://twistassets.kabbalah.com/videos/'.$vid.'.json',array());
	$twistvid=new twistage_video();
	$twistvid->import($video,$api->profile->pid);
	if(!$twistvid->save()){
		if(user_access('administer twistal')) drupal_set_message(t('There was a problem syncing this video'));
	}
	
	foreach($video->assets as $asset){
		$aasset=(array)$asset;
		$arows[]=$aasset;
		$header=array_keys($aasset);
	}
	$assets='<h3>'.t('Assets').'</h3>';
	$assets.=theme('table',array('header'=>$header,'rows' => $arows));
	unset($video->assets);
	
	foreach($video->tags as $tag){
		$tags[]=$tag->name;
	}
	$tags=implode(', ',$tags);
	unset($video->tags);
	
	foreach($video->screenshots as $screenshot){
		$screenshots[]=array($screenshot->width.'x'.$screenshot->height,'<img src="'.$screenshot->url.'" />');
	}
	$shots='<h3>'.t('Screenshots').'</h3>';
	$shots.=theme('table',array('header' => array('Size','Image'), 'rows' => $screenshots));
	unset($video->screenshots);
	
	foreach($video->custom_fields as $custom_field){
		$custom_fields[]=array($custom_field->name,$custom_field->value);
	}
	$fields='<h3>'.t('Custom Fields').'</h3>';
	$fields.=theme('table',array('header'=>array('Name','Value'),'rows'=>$custom_fields));
	unset($video->custom_fields);
	
	$vprops=(array)$video;
	foreach($vprops as $k=>$v){
		$basic[]=array($k,$v);
	}
	$basic[]=array('Tags', $tags);
	$main='<h3>'.t('Basic Information').'<h3>';
	$main.=theme('table',array('header'=>array(),'rows'=>$basic));
	return $main.$fields.$assets.$shots;
}
function twistal_load_video($vid){
	static $videos;
	if($videos[$vid]) return $videos[$vid];
	$video=new twistage_video();
	$video->load($vid);
	$videos[$vid]=$video;
	return $video;
}