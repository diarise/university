<?php 
	global $user;
	foreach($user->roles as $key => $role)
	{
		$userrole = $role;
	}
?>		

<div id="slideshow">
	<?php  print render($page['slideshow']);?>
</div> <!--end of slideshow-->
	

<?php if ( user_is_logged_in() ) { ?>
	
	<?php if( $userrole == 'free') { ?>
			
		<div id="carousal4Wrapper">
			<?php  print render($page['fpfreelessons']);?>
		</div> <!--end of carousal4-->
		
		<div id="carousal1Wrapper">
			<?php  print render($page['fpbeginnerscourses']);?>
		</div> <!--end of carousal1-->
		
		<div id="carousal3Wrapper">
			<?php  print render($page['fprecommendedcourses']);?>
		</div> <!--end of carousal3-->

		<div id="carousal2Wrapper">
			<?php  print render($page['fprecentlyadded']);?>
		</div> <!--end of carousal2-->

		<div id="carousal5Wrapper">
			<?php  print render($page['liveevents'])?>
		</div> <!--end of carousel5-->
		
	<?php } else {  ?>	
	
		<div id="carousal2Wrapper">
		<?php  print render($page['fprecentlyadded']);?>
		</div> <!--end of carousal2-->

		<div id="carousal3Wrapper">
			<?php  print render($page['fprecommendedcourses']);?>
		</div> <!--end of carousal3-->

		<div id="carousal1Wrapper">
			<?php  print render($page['fpbeginnerscourses']);?>
		</div> <!--end of carousal1-->

		<div id="carousal5Wrapper">
			<?php  print render($page['liveevents'])?>
		</div> <!--end of carousel5-->
		
		<div id="carousal4Wrapper">
			<?php  print render($page['fpfreelessons']);?>
		</div> <!--end of carousal4-->

	<?php } ?>
	
<?php } else {  ?>

	<div id="carousal2Wrapper">
		<?php  print render($page['fprecentlyadded']);?>
	</div> <!--end of carousal2-->

	<div id="carousal3Wrapper">
		<?php  print render($page['fprecommendedcourses']);?>
	</div> <!--end of carousal3-->

	<div id="carousal1Wrapper">
		<?php  print render($page['fpbeginnerscourses']);?>
	</div> <!--end of carousal1-->

	<div id="carousal5Wrapper">
		<?php  print render($page['liveevents'])?>
	</div> <!--end of carousel5-->
	
	<div id="carousal4Wrapper">
		<?php  print render($page['fpfreelessons']);?>
	</div> <!--end of carousal4-->


<?php } ?>	 