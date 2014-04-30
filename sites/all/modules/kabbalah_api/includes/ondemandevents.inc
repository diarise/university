<?php
	
	function getOndemandEventsData() {
	
		$vnames = getTermNamesForApi( 10 );
		$result_array = array();
		foreach( $vnames as $id => $vname)	{
					
			$result = runPageQueryForApi( 10 , $vname , 563 ); // On Demand Event : 563
			$vname_articles = array();
			$vname_articles	= processPageQueryResultsForApi( $result , 10 ) ; 
			$result_array[$vname] = array( "term_name" => $vname , "term_desc" =>  $vname_articles['term_description'] , "term_articles" => $vname_articles['articles'] );
		}	
		echo json_encode( $result_array );
		
	}
