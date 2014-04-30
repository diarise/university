<?php

	function getCoursesByLanguageData() {
	
		$vnames = getTermNamesForApi( 16 );
		$result_array = array();
		foreach( $vnames as $id => $vname)	{
					
			$result = runPageQueryForApi( 16 , $vname , 562 ); // Basic Course : 562
			$vname_articles = array();
			$vname_articles	= processPageQueryResultsForApi( $result , 16 ) ; 
			$result_array[$vname] = array( "term_name" => $vname , "term_desc" =>  $vname_articles['term_description'] , "term_articles" => $vname_articles['articles'] );
		}	
		echo json_encode( $result_array );
	}