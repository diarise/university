<main id="pageregion">
 
<div id="mainContentWrapperUser">
<?php 
global $user;

if(user_is_logged_in() ){?> 

<div id="user_page_content">
		<?php print $messages; ?>	
		<?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
		<?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
		<?php print render($page['content']); ?>
	</div>
<?php } else { ?> 

<!--<div class="infoMember">
    Already a Kabbalah University (UKABBALAH) Member? Please log in with your current username and password.
</div>
<div class="infoMember">
	Forgot Username? <a target="_blank" href="https://idp.kabbalah.com/get_username">Click here</a>
</div>-->
<div id="mainContentUser">
<?php print $messages; ?>
<?php
if(arg(1) == 'password') {?>
<div id="user_page_content">
		
		<!--<?php //if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php //print render($tabs); ?></div><?php //endif; ?>
		<?php //if ($action_links): ?><ul class="action-links"><?php //print render($action_links); ?></ul><?php //endif; ?>-->
		<?php print render($page['content']); ?>
	</div>
<?php } else { ?> 
            <div id="log_in">
                <div id="login_form">

                
        <h1>LOG IN</h1>
              
              <?php  
		            $userLoginForm = drupal_get_form('user_login_block');
		    		print drupal_render($userLoginForm); 
    		  ?>
    		  <a href="https://idp.kabbalah.com/user/password" title="Request new password via e-mail.">Request new password</a>
				<div class="inputWrapper">
                    <span class="dividerOR">or</span>
                    <span class="newAccount">CREATE AN ACCOUNT</span><br>
                    <span class="inputBtn">
                        <a class="submitForm" href="https://idp.kabbalah.com"> see membership options</a>
                    </span>
                </div>

                </div>

            </div>
</div>
<?php } } ?>
</div>	
</main>
