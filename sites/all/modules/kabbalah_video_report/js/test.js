// $(document).ready(function(){



// });


	// var chart;
	// var chartData;
	// var chartData = [{
		// "country": "USA",
			// "visits": 4025
	// }, {
		// "country": "China",
			// "visits": 1882
	// }];
	
	
// AmCharts.ready(function () {

		// // SERIAL CHART
		// var chartData;
		// chart = new AmCharts.AmSerialChart();
		
		// $.ajax({
			// url: "http://ukabbalah.dev.kabbalahstaging.com.vhost.zerolag.com/k_api/cntrs_vds",
			// type: "GET",
			// dataType: 'json',
			// success: function(data){
					// chartData = eval('(' + JSON.stringify(data) + ')');
					// //queryObjectLen = queryObject.length;
					// //console.log( queryObject );
					// //console.log( queryObjectLen );
				// }  
		// })
		
		
		// // jQuery.getJSON('http://ukabbalah.dev.kabbalahstaging.com.vhost.zerolag.com/k_api/cntrs_vds', function (data) {
			// // console.log(data);
			// // chartData = eval('(' + JSON.stringify(data) + ')');
			// // chart.dataProvider = data;
			// // chart.validateData();
		// // });
		// chart.dataProvider = chartData;
		
		
		// chart.categoryField = "country";
		// chart.startDuration = 1;
		// chart.angle = 30;
		// chart.depth3D = 15;    

		// // AXES
		// // category
		// var categoryAxis = chart.categoryAxis;
		// categoryAxis.labelRotation = 90;
		// categoryAxis.autoGridCount  = false;
		// categoryAxis.gridCount = chartData.length;                    
		// categoryAxis.gridPosition = "start";

		// // value
		// // in case you don't want to change default settings of value axis,
		// // you don't need to create it, as one value axis is created automatically.

		// // GRAPH
		// var graph = new AmCharts.AmGraph();
		// graph.valueField = "visits";
		// graph.balloonText = "[[category]]: <b>[[value]]</b>";
		// graph.type = "column";
		// graph.fillAlphas = 0.8;
		// chart.addGraph(graph);

		// chart.write("chartdiv");

		
// });	