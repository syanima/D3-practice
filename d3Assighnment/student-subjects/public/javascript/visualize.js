var data = [
	{name:'ramesh',subject:'maths',score:87},
	{name:'suresh',subject:'maths',score:45},
	{name:'pokemon',subject:'english',score:65},
	{name:'mary',subject:'kannada',score:44},
	{name:'riya',subject:'science',score:72},
	{name:'katie',subject:'social studies',score:82},
	{name:'katie',subject:'maths',score:98},
	{name:'ramesh',subject:'bengali',score:25},
	{name:'suresh',subject:'science',score:55},
	{name:'riya',subject:'tamil',score:75},
	{name:'pokemon',subject:'sports',score:95},
	{name:'pokemon',subject:'social studies',score:32}
];



var colors = {"maths" : "steelblue" , "english" : "orange" , "kannada" : "green" , "science" : "red" ,
			 "social studies" : "violet" , "bengali" : "brown" , "tamil" : "pink" , "sports" : "grey"};

var drawChart = function(data){
	var bars = d3.select('.container').selectAll('.bar')
				.data(data);

	bars.enter().append('div')
		.attr('class','bar')
		.attr('style',(d)=>"width:"+d.score*5+"px")
		.text((d)=>d.name +"  "+ d.score)
		.style('background-color',(d) => colors[d.subject]);
	bars.exit().remove();

};

var sortByName = function () {
    var bars = d3.selectAll('.bar');
    bars.sort(function (current, next) {
        return current.name < next.name ? -1 : current.name > next.name ? 1 : 0;
    });
};

var sortBySubject = function () {
    var bars = d3.selectAll('.bar');
    bars.sort(function (current, next) {
        return current.subject < next.subject ? -1 : current.subject > next.subject ? 1 : 0;
    });
};

var sortByScore = function () {
    var bars = d3.selectAll('.bar');
    bars.sort(function (current, next) {
        return current.score < next.score ? -1 : current.score > next.score ? 1 : 0;
    });
};


var updateChart = function(){
	drawChart(data);
};

window.onload = updateChart;