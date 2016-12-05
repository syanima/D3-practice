    const WIDTH = 680;
const HEIGHT = 620;
const MARGIN = 30;

const INITIAL_DOMAIN_ON_Y = 0.0;
const FINAL_DOMAIN_ON_Y= 1.0;

const INITIAL_DOMAIN_ON_X = 0.0;
const FINAL_DOMAIN_ON_X= 1.0;


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
    for (var i = 0; i <=10; i++) {
        var obj = {};
        obj['x'] = i;
        obj['y'] = (3*(Math.sin(i))+ 5) ;
        points.push(obj);
    }
    return points;
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
        .call(xAxis);

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

};

var createAreaOnLine = function(data,area,svg){
    svg.append('g').append('path')
      .datum(data)
      .attr("d", area)
      .classed('area',true)
      .attr('transform',translate(MARGIN+1,MARGIN));
}

var loadChart = function(){

    var points = createPoints();

    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    var line = d3.line()
    .x(function(d){
        return xScale(d.x/10);
    })
    .y(function(d){
        return yScale(d.y/10);
    });

    var area = d3.area()
        .x(function(d) { return xScale(d.x/10); })
        .y0(INNER_HEIGHT)
        .y1(function(d) { return yScale(d.y/10); });


    var lineChart = initializeChart(xAxis,yAxis);

    d3.select(".container")
        .attr("align","center");


    createAreaOnLine(points,area,lineChart);
    createLineChart(points,line,lineChart);
    createCirclesOnLine(points,lineChart);
    
};

window.onload = loadChart;



