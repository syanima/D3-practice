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


var initializeChart = function(xAxis,yAxis,curves){


    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .call(yAxis);

    svg.append('text')
        .attr('x',INNER_HEIGHT - 2 * MARGIN)
        .attr('y',MARGIN*2)
        .text(curves.title);

    return svg;
};


var createLineChart = function (data,line,svg,className) {
    svg.append('g').append('path')
        .datum(data)
        .attr('d', line)
        .attr('transform',  translate(MARGIN, MARGIN))
        .classed(className, true);
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

    var simpleLineClass = "simplelinepath";
    var sinLineClass = "sinpath";

    var curves = [{curve:d3.curveLinear,title:"Curve Linear"},{curve:d3.curveLinearClosed,title:"Curve Linear Closed"},
                    {curve:d3.curveStep,title:"Curve Step"},{curve:d3.curveBasis,title:"Curve Basis"},{curve:d3.curveBundle,title:"Curve Bandle"},
                    {curve:d3.curveCardinalClosed,title:"Curve Cardinal Closed"},{curve:d3.curveCardinal,title:"Curve Cardinal"},
                    {curve:d3.curveMonotoneX,title:"Curve Monotex"}];

    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    for (var i = 0; i < curves.length ; i++) {

        var points = [{x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}];

        var line = d3.line()
        .x(function(d){
            return xScale(d.x/10);
        })
        .y(function(d){
            return yScale(d.y/10);
        })
        .curve(curves[i].curve);


        d3.select(".container")
            .attr("align","center");


        var lineChart = initializeChart(xAxis,yAxis,curves[i]);

        createLineChart(points,line,lineChart,simpleLineClass);
        createCirclesOnLine(points,lineChart);
    
        var sinData = creatingSinData(points);
       
        createLineChart(sinData,line,lineChart,sinLineClass);
        createCirclesOnLine(sinData,lineChart);

    }  
    
};


window.onload = loadChart;


