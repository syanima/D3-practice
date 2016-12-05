const WIDTH = 680;
const HEIGHT = 620;
const MARGIN = 30;
const INITIAL_DOMAIN = 0.0;
const FINAL_DOMAIN = 1.0;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var xScale = d3.scaleLinear()
    .domain([INITIAL_DOMAIN,FINAL_DOMAIN])
    .range([0, INNER_WIDTH]);

var yScale = d3.scaleLinear()
    .domain([INITIAL_DOMAIN,FINAL_DOMAIN])
    .range([INNER_HEIGHT, 0]);


var creatingSinData = function(data){
    var sinPoints = data.map(function(point){
           point.x = point.x;
           point.y = Math.sin(point.x) + 5;
           return point; 
        })
    return sinPoints;
};

  

var translate = function(x, y){
    return "translate("+x+","+y+")";
};


var initializeChart = function(xAxis,yAxis){

    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .call(yAxis);

    return svg;
};


var createLineChart = function (data,line,svg) {
    svg.append('g').append('path')
        .datum(data)
        .attr('d', line)
        .attr('transform',  translate(MARGIN, MARGIN))
        .classed('linepath', true);
};


var createCirclesOnLine = function(data,svg){
    svg.append('g').selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .classed('dot',true)
        .attr('r',5)
        .attr('cx',function(d){return xScale(d.x/10)})
        .attr('cy',function(d){return yScale(d.y/10)})
        .attr('transform',  translate(MARGIN, MARGIN));

}


var loadChart = function(){

    var points = [{x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}];

    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    d3.select(".container")
            .attr("align","center");


    var lineChart = initializeChart(xAxis,yAxis);

    var line = d3.line()
        .x(function(d){
            return xScale(d.x/10);
        })
        .y(function(d){
            return yScale(d.y/10);
        });
        
    createLineChart(points,line,lineChart);
    createCirclesOnLine(points,lineChart);
    
    var sinData = creatingSinData(points);
       
    createLineChart(sinData,line,lineChart);
    createCirclesOnLine(sinData,lineChart);
};


window.onload = loadChart;

