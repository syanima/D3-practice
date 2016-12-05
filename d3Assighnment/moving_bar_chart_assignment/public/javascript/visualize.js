var numbers=[1,5,8,2,47,4,10,11,24,14,8];

var generateRandomNumber = function(){
	
	return Math.floor(Math.random() * 100 + 1);
	
};

var colors = d3.scaleLinear()
				.domain([1,100])
				.range(['darkblue','steelblue']);

var drawChart = function(data){
	var bars = d3.select('.container').selectAll('div')
				.data(data);

	bars.enter().append('div');
	bars.attr('class','bar')
		.attr('style',(d)=>"width:"+d*10+"px")
		.text((d)=>d)
		.style('background-color',(d) => colors(d));
	bars.exit().remove();

};

var updateChart = function(){
	
	drawChart(numbers);
	setInterval(function(){
		numbers.shift();
		numbers.push(generateRandomNumber());
		drawChart(numbers);
	},1000);
};

window.onload = updateChart;