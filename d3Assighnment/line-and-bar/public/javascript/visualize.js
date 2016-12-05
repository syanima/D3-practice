const WIDTH = 680;
const HEIGHT = 620;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;


var data = [];
var createRandomData = function () {
   for (var i = 0; i < 10; i++) {
       data.push(_.random(0,100));
   }
};
createRandomData();

var lastRandomData = function () {
   data.push(_.random(0, 100));
   data.shift(1);
   return data;
};



var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var initializeChart = function(xAxis,yAxis,chartDiv){

	var svg = d3.select(chartDiv).append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

	svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(xAxis)
		.classed('xAxis', true);		

	svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.classed('yAxis', true)
		.call(yAxis);

	
	return svg;
};

var createLineChart = function (data,line,svg) {
	svg.append('path')
		.attr('d', line(data))
		.attr('transform',  translate(MARGIN, MARGIN))
		.classed('path', true);


};

var createBarChart = function (data,svg,xScale,yScale) {
	svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x',function(d,i){
      	return xScale(i);
      })
      .attr('y',function(d){
      	return yScale(d);
      })
      .attr('width',40)
      .attr('height',function(d){
      	return INNER_HEIGHT - yScale(d)
      })
      .attr('transform',  translate(MARGIN, MARGIN))
	  .classed('rect',true)


};

var loadChart = function(){
	var xScale = d3.scaleLinear()
		.domain([0,10])
		.range([0, INNER_WIDTH]);

	var yScale = d3.scaleLinear()
		.domain([0,100])
		.range([INNER_HEIGHT, 0]);

	var xAxis = d3.axisBottom(xScale).ticks(10);
	var yAxis = d3.axisLeft(yScale).ticks(10);

	d3.select(".container")
            .attr("align","center");


	var barChart = initializeChart(xAxis,yAxis,'#bar-chart');
	var lineChart = initializeChart(xAxis,yAxis,'#line-chart');

	var line = d3.line()
		.x(function(d,i){
			return xScale(i);
		})
		.y(function(d){
			return yScale(d);
		});

	d3.select('body').append('g')
		.transition()
    		.duration(500)
    		.ease(d3.easeLinear)
    		.on("start", setInterval);


	setInterval(function(){
	  	var dataGenerated =lastRandomData();

	    lineChart.selectAll('.path').remove();
	    barChart.selectAll('rect').remove();

	    createLineChart(dataGenerated,line,lineChart);
	    createBarChart(dataGenerated,barChart,xScale,yScale);
  	}, 450);

};


window.onload = loadChart;
