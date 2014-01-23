(function($){

	var chart;
	var chartData;
	var chartData = [{
			country: "USA",
			visits: 4252
		}, {
			country: "China",
			visits: 1882
		}, {
			country: "Japan",
			visits: 1809
		}, {
			country: "Germany",
			visits: 1322
		}, {
			country: "UK",
			visits: 1122
		}, {
			country: "France",
			visits: 1114
		}, {
			country: "India",
			visits: 984
		}, {
			country: "Spain",
			visits: 711
		}, {
			country: "Netherlands",
			visits: 665
		}, {
			country: "Russia",
			visits: 580
		}, {
			country: "South Korea",
			visits: 443
		}, {
			country: "Canada",
			visits: 441
		}, {
			country: "Brazil",
			visits: 395
		}, {
			country: "Italy",
			visits: 386
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}, {
			country: "Australia",
			visits: 384
		}, {
			country: "Taiwan",
			visits: 338
		}, {
			country: "Poland",
			visits: 328
		}]; 
	
	
	$.ajax({
		url: "http://ukabbalah.dev.kabbalahstaging.com.vhost.zerolag.com/k_api/cntrs_vds",
		type: "GET",
		dataType: 'json',
		success: function(data){
			chartData = eval('(' + JSON.stringify(data) + ')');
			console.log( chartData );
			chart = new AmCharts.AmSerialChart();
			chart.dataProvider = chartData;
			
			chart.categoryField = "country";
			chart.startDuration = 1;
			chart.angle = 30;
			chart.depth3D = 15;    

			// AXES
			// category
			var categoryAxis = chart.categoryAxis;
			categoryAxis.labelRotation = 90;
			categoryAxis.autoGridCount  = false;
			categoryAxis.gridCount = chartData.length;                    
			categoryAxis.gridPosition = "start";

			// value
			// in case you don't want to change default settings of value axis,
			// you don't need to create it, as one value axis is created automatically.

			// GRAPH
			var graph = new AmCharts.AmGraph();
			graph.valueField = "visits";
			graph.balloonText = "[[category]]: <b>[[value]]</b>";
			graph.type = "column";
			graph.fillAlphas = 0.8;
			chart.addGraph(graph);

			chart.write("chartdiv");
			//chart.invalidateSize();
			
			
		}  
	})
	
	
	// // 1. Donation By Country Report
	
				// $.ajax({
					// url: "http://ukabbalah.dev.kabbalahstaging.com.vhost.zerolag.com/k_api/cntrs_vds",
					// type: "GET",
					// dataType: 'json',
					// success: function(data){
						// queryObject = eval('(' + JSON.stringify(data) + ')');
						// queryObjectLen = queryObject.length;
						// //console.log( queryObject );
						// //console.log( queryObjectLen );
					// }  
				// })

				// var arrdata="";
				// google.load("visualization", "1", {packages:["corechart"]});
				// google.setOnLoadCallback(drawChart);

				// function drawChart() {
					
					// arrdata = new google.visualization.DataTable();
					// arrdata.addColumn('string', 'Country');
					// arrdata.addColumn('number', 'Plays');
					// for(var i=0 ; i<queryObjectLen ;i++ )
					// {
						// var country_name = queryObject[i].country;
						// var plays = queryObject[i].plays;
						// arrdata.addRows([ [country_name,parseInt(plays)] ]);
					// }
					
					// var options = {  title: 'Countrywise Plays' };
					// var chart = new google.visualization.GeoChart(document.getElementById('countrywiseVideoResultChart'));
					// chart.draw(arrdata, options);
				// }

			// // End of Countrywise Donation Report


	$(document).ready(function(){

	
			$("#videoAnalyticsDD").show();
			$("#videoStatistics").removeClass( "hidden" );
			$("#videoStatisticsByMonth").addClass( "hidden" );		
			$("#countryAnalytics").addClass( "hidden" );		
			$("#deviceAnalytics").addClass( "hidden" );		
			$("#browserAnalytics").addClass( "hidden" );		
		
			$("#videoStatisticsTab").click(function() {
			
				$("#videoStatistics").removeClass( "hidden" );
				$("#videoStatisticsByMonth").addClass( "hidden" );		
				$("#countryAnalytics").addClass( "hidden" );		
				$("#deviceAnalytics").addClass( "hidden" );		
				$("#browserAnalytics").addClass( "hidden" );
					
			});
			
			$("#videoStatisticsMonthlyTab").click(function() {
			
				$("#videoAnalyticsDD").show();
				$("#videoStatistics").addClass( "hidden" );
				$("#videoStatisticsByMonth").removeClass( "hidden" );		
				$("#countryAnalytics").addClass( "hidden" );		
				$("#deviceAnalytics").addClass( "hidden" );		
				$("#browserAnalytics").addClass( "hidden" );
			});
			
			$("#videoStatisticsCountryTab").click(function() {
			
				$("#videoAnalyticsDD").hide();
				$("#videoStatistics").addClass( "hidden" );
				$("#videoStatisticsByMonth").addClass( "hidden" );		
				$("#countryAnalytics").removeClass( "hidden" );		
				$("#deviceAnalytics").addClass( "hidden" );		
				$("#browserAnalytics").addClass( "hidden" );
			});
			
			$("#videoStatisticsDeviceTab").click(function() {
			
				$("#videoAnalyticsDD").hide();
				$("#videoStatistics").addClass( "hidden" );
				$("#videoStatisticsByMonth").addClass( "hidden" );		
				$("#countryAnalytics").addClass( "hidden" );		
				$("#deviceAnalytics").removeClass( "hidden" );		
				$("#browserAnalytics").addClass( "hidden" );
			});
			
			$("#videoStatisticsBrowserTab").click(function() {
			
				$("#videoAnalyticsDD").hide();
				$("#videoStatistics").addClass( "hidden" );
				$("#videoStatisticsByMonth").addClass( "hidden" );		
				$("#countryAnalytics").addClass( "hidden" );		
				$("#deviceAnalytics").addClass( "hidden" );		
				$("#browserAnalytics").removeClass( "hidden" );
			});
	
			$("#lessonDD").change(function() {
				var searchkey = $("#lessonDD").val();  			
				
				$.ajax({
					url: "/vds_anlts/"+searchkey,
					type: "GET",
					dataType: 'html',
					cache: false,
					success: function(data){
						//console.log(data);
						$("#videoStatistics").html( data );	
					}  // end of success function           
				}) // end of ajax
				
				$.ajax({
					url: "/mnthly_vds_anlts/"+searchkey,
					type: "GET",
					dataType: 'html',
					cache: false,
					success: function(data){
						//console.log(data);
						$("#videoStatisticsByMonth").html( data );	
					}  // end of success function           
				}) // end of ajax
				
				
				
			});
						
	});
	

})(jQuery)