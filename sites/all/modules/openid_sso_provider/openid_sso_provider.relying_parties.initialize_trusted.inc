<?php
// $Id$

/**
 * @file
 *
 * @author
 * Stefan Auditor <stefan.auditor@erdfisch.de>
 * Felix Delattre <felix.delattre@erdfisch.de>
 */

/**
 * Implements hook_user_insert().
 */
function openid_sso_provider_user_insert(&$edit, $account, $category) {
  $realms = openid_sso_provider_get_relying_parties('all', array('trusted' => TRUE));
  if ($realms != FALSE) {
    foreach ($realms as $realm) {
      openid_sso_provider_trust_build_store($realm->realm, $account);
    }
  }
}

/**
 * Implements hook_user_delete().
 */
function openid_sso_provider_user_delete($account) {
  $realms = openid_sso_provider_get_relying_parties('all', array('trusted' => TRUE));
  if (isset($realms)) {
    foreach ($realms as $realm) {
      openid_sso_provider_trust_build_remove($realm->realm, $account);
    }
  }
}

/**
 *
 */
function openid_sso_provider_form_openid_sso_provider_rp_edit_form_alter(&$form, &$form_state) {
  $form['#submit'][] = 'openid_sso_provider_form_openid_sso_provider_rp_edit_form_alter_submit';
}

/**
 *
 */
function openid_sso_provider_form_openid_sso_provider_rp_edit_form_alter_submit(&$form, &$form_state) {
  // Generate auto trust
  openid_sso_provider_set_trust_definition($form_state['values']['realm'], TRUE);
}


/**
 * Applies defintion of trust to whole relying party as batch operation.
 */
function openid_sso_provider_set_trust_definition($realm, $trusted) {

  if ($trusted == TRUE) {

    $batch = array(
      'title' => t('Builing trust for for relying party'),
      'operations' => array(
        array('openid_sso_provider_trust_build', array($realm, $trusted)),
      ),
      'finished' => 'openid_sso_provider_trust_build_finished',
    );
    batch_set($batch);
  }

  elseif ($trusted == FALSE) {
    // Remove trust for realm
    openid_sso_provider_complete_trust_remove($realm);
  }
}


/**
 *
 */
function openid_sso_provider_trust_build($realm, $trusted, &$context) {
  if (empty($context['sandbox'])) {
    $context['sandbox']['progress'] = 0;
    $context['sandbox']['current_user'] = 0;
    $context['sandbox']['max'] = db_query('SELECT COUNT(DISTINCT uid) FROM {users} WHERE uid > 0');
  }
  $limit = 5;
  $result = db_query_range("SELECT uid FROM {users} WHERE uid > :uid ORDER BY uid ASC", $context['sandbox']['current_user'], $limit, array(':uid' => 0));
  while ($record = $result->fetchAssoc()) {
    $account = user_load(array('uid' => $record['uid']));
    $context['results'][] = $account->uid .' : '. $account->name;
    $context['sandbox']['progress']++;
    $context['sandbox']['current_user'] = $account->uid;
    $context['message'] = t('Processing user @username', array('@username' => $account->name));
    if ($trusted == TRUE) {
      // Generate trust for realm
      openid_sso_provider_trust_build_store($realm, $account);
    }
    elseif ($trusted == FALSE) {
      // Remove trust for realm
      openid_sso_provider_trust_build_remove($realm, $account);
    }
  }
  if ($context['sandbox']['progress'] != $context['sandbox']['max']) {
    $context['finished'] = $context['sandbox']['progress'] / $context['sandbox']['max'];
  }
}

/**
 *
 */
function openid_sso_provider_trust_build_finished($success, $results, $operations) {
  if ($success) {
    $message = format_plural(count($results), 'One user account has been initialized.', '@count user accounts have been initialized.');
  }
  else {
    $message = t('Finished with an error.');
  }
  drupal_set_message($message);

  // Providing data for the redirected page is done through $_SESSION.
  foreach ($results as $result) {
    $items[] = t('Built trust for user %title.', array('%title' => $result));
  }
  if (isset($items)) {
    $_SESSION['openid_sso_provider'] = $items;
  }
}

/**
 *
 */
function openid_sso_provider_trust_build_store($realm, $account) {
  $now = time();
  $dataset = array(
    'uid' => $account->uid,
    'realm' => $realm,
    'first_time' => $now,
    'last_time' => 0,
    'auto_release' => 1,
  );
  return drupal_write_record('openid_provider_relying_party', $dataset);
}

/**
 *
 */
function openid_sso_provider_trust_build_remove($realm, $account) {
  return db_delete('openid_provider_relying_party')
    ->condition('uid', $account->uid)
    ->condition('realm', $realm)
    ->execute();
}

/**
 *
 */
function openid_sso_provider_complete_trust_remove($realm) {
  return db_delete('openid_provider_relying_party')
    ->condition('realm', $realm)
    ->execute();
}

/**
 *
 */
function openid_sso_provider_form_openid_sso_provider_rp_remove_form_alter(&$form, &$form_state) {
  $form['#submit'][] = 'openid_sso_provider_form_openid_sso_provider_rp_remove_form_alter_submit';
}

/**
 *
 */
function openid_sso_provider_form_openid_sso_provider_rp_remove_form_alter_submit(&$form, &$form_state) {
  $realm = $form_state['cache']['realm'];
  return openid_sso_provider_complete_trust_remove($realm);
}


