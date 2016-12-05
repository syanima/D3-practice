const WIDTH = 600;
const HEIGHT = 600;
const RADIUS = Math.min(WIDTH,HEIGHT)/2;
const INNER_RADIUS = 0.3*RADIUS;


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

var createOuterPath = function(data,pie,arc,svg){
    var outerPath = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('stroke','gray')
        .attr('fill', 'none');

    return outerPath;

};

var createInnerPath = function(data,pie,arc,svg,tip){
    var innerPath = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .classed("solidArc",true)
        .attr('fill',function(d, i) {return color(i);})
        .attr('stroke','gray')
        .call(tip)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    return innerPath;
}


var loadChart = function(){

    var points = [3,4,5,6,8,7];
    var quartile = 0.5;

    var min = d3.min(points);
    var max = d3.max(points);
    var mean = d3.mean(points);
    var median = d3.median(points);
    var sum = d3.sum(points);
    var quantile = d3.quantile(points,quartile);
    var variance = d3.variance(points);
    var deviation = d3.deviation(points);
    var extent = d3.extent(points);

    var showItems = [{title:"Min",value:min},{title:"Max",value:max},{title:"Median",value:median},{title:"Mean",value:mean},
                    {title:"Quantile",value:quantile},{title:"Deviation",value:deviation},{title:"Variance",value:variance},
                    {title:"Extent",value:extent},{title:"Sum",value:sum}];

    var outerArc = d3.arc()
        .outerRadius(RADIUS)
        .innerRadius(INNER_RADIUS);

    var innerArc = d3.arc()
        .innerRadius(INNER_RADIUS)
        .outerRadius(function (d) { 
            return (RADIUS - INNER_RADIUS) * (d.value/50) + INNER_RADIUS; 
        });


    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 0])
        .html(function(d) {
            console.log(d);
            return d.data.title + ": <span style='color:orangered'>" + d.data.value + "</span>";
        });

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.value; });


    var pieChart = initializeChart();

    d3.select(".container")
        .attr("align","center");


    var outerPath = createOuterPath(showItems,pie,outerArc,pieChart);
    var innerPath = createInnerPath(showItems,pie,innerArc,pieChart,tip);
    
};

window.onload = loadChart;





    