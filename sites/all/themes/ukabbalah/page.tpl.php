<?php
	// //Get the URL string
	// $pageURL = 'http';
	// //change to https
	// if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
	// $pageURL .= "://";
	  
	// if ($_SERVER["SERVER_PORT"] != "80") {
		// $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];	
	// }else{
		// $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	// }
	
	// $wrapper_id = 'mainContentWrapper';
	
	// if( strstr($pageURL, '/cursos')  || strstr($pageURL, '/maestros') || strstr($pageURL, '/charlas-en-eventos') ) 	
	// {  
		// $wrapper_id = 'maincontentTopics'; 	
	// }



	//Get the URL string
	$pageURL = 'http';
	//change to https
	if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
	$pageURL .= "://";
	  
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];	
	}else{
		$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
 

	
?>
 
<?php if(strstr($pageURL, '/search/site') ){?>

	<div id="custonSearchWrapper">
		<div id="searchFilterDetail"><?php print render($page['searchfilterdetail']); ?></div>
		<div id="searchContentResult">
			<div><?php print render($page['searchcontentresult']); ?> </div>
			<div><?php print render($page['content']); ?></div>
		</div>
	</div>
	
<?php }else { ?>
<main id="pageregion">
   	<div id="mainContentWrapper">
    <?php print $messages; ?>
    
    <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
  
    <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
    <?php print render($page['content']); ?>
    </div><!--end of mainContentWrapper-->
 </main><!-- end of pageregion -->

 <?php } ?>