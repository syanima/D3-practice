const WIDTH = 550;
const HEIGHT = 550;
const RADIUS = Math.min(WIDTH,HEIGHT)/2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var translate = function(x, y){

    return "translate("+x+","+y+")";
};


var initializeChart = function(){

    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', translate(WIDTH/2, HEIGHT/2));

    return svg;
};

var createPath = function(data,pie,arc,svg){
    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {return color(i);});

    return path;

};


var loadChart = function(){

     var points = [1, 1, 2, 2, 1, 2, 1];

    var arc = d3.arc()
        .outerRadius(RADIUS-10)
        .innerRadius(0);

    var pie = d3.pie()
        .sort(null)
        .endAngle(function(){ return Math.PI;});


    var pieChart = initializeChart();

    d3.select(".container")
        .attr("align","center");


    createPath(points,pie,arc,pieChart);
    
};

window.onload = loadChart;





