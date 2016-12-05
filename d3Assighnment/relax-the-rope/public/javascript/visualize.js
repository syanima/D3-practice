const WIDTH = 680;
const HEIGHT = 620;
const MARGIN = 30;

const INITIAL_DOMAIN_ON_Y = 0.0;
const FINAL_DOMAIN_ON_Y= 1.0;

const INITIAL_DOMAIN_ON_X = 0;
const FINAL_DOMAIN_ON_X= 10;


const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var xScale = d3.scaleLinear()
    .domain([INITIAL_DOMAIN_ON_X,FINAL_DOMAIN_ON_X])
    .range([0, INNER_WIDTH]);

var yScale = d3.scaleLinear()
    .domain([INITIAL_DOMAIN_ON_Y,FINAL_DOMAIN_ON_Y])
    .range([INNER_HEIGHT, 0]);


var createPoints = function(){
    var points = [];
    for (var i = 0; i < 10; i++) {
        var obj = {};
        obj['x'] = i;
        obj['y'] = ((Math.sin(3*i) + 1)/2) ;
        points.push(obj);
    }
    return points;
};

var creatingTensionPoints = function(){
    var tensionPoints = [];
    var startingPoint = -2;
    var endingPoint = 1;
    for (var i = startingPoint; i <= endingPoint ; i++) {
        tensionPoints.push(i * (20/100));
    }
    tensionPoints.push(1);
    return tensionPoints;
}

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
        .attr('cx',function(d){return xScale(d.x)})
        .attr('cy',function(d){return yScale(d.y)})
        .attr('transform',  translate(MARGIN, MARGIN));

};

var loadChart = function(){

    var points = createPoints();


    var tensionPoints = creatingTensionPoints();
    console.log(tensionPoints);


    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    for (var i = 0; i < tensionPoints.length; i++) {

        var line = d3.line()
            .x(function(d){
            return xScale(d.x);
        })
        .y(function(d){
            return yScale(d.y);
        })
        .curve(d3.curveCardinal.tension(tensionPoints[i]));

    d3.select(".container")
        .attr("align","center");


    var lineChart = initializeChart(xAxis,yAxis);

    createLineChart(points,line,lineChart);
    createCirclesOnLine(points,lineChart);
    }
    
};


window.onload = loadChart;


