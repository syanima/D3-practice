var loadChart = function(){
    var width = 600,height=100,specifiedWidth = 100,specifiedMargin =50;

    var poly = [{"x":specifiedMargin*3 + specifiedWidth*3, "y":height},
                {"x":specifiedMargin*3 + specifiedWidth*3 + specifiedWidth/2,"y":0},
                {"x":specifiedMargin*3 + specifiedWidth*4,"y":height}];

    var svg = d3.select('.container')
                .append('svg')
                .attr('width',width)
                .attr('height',height);

    svg.append('line')
        .attr('x1',0)
        .attr('y1',specifiedWidth)
        .attr('x2',specifiedWidth)
        .attr('y2',0)
        .attr('stroke','grey')
        .classed('Properties',true);
        

    svg.append('circle')
        .attr('cx',specifiedWidth + specifiedMargin + specifiedWidth/2)
        .attr('cy',height/2)
        .attr('r',specifiedWidth/2)
        .attr('stroke','red')
        .classed('Properties',true);
        

    svg.append('rect')
        .attr('x',specifiedWidth*2 + specifiedMargin*2)
        .attr('y',0)
        .attr('rx',10)
        .attr('ry',10)
        .attr('width',specifiedWidth)
        .attr('height',height)
        .attr('stroke','steelblue')
        .classed('Properties',true)

    svg.selectAll('polygon')
        .data([poly])
        .enter()
        .append('polygon')
        .attr('stroke','green')
        .classed('Properties',true)
        .attr('points',function(d) { 
            return d.map(function(d) {
                return [d.x,d.y].join(",");
            }).join(" ");
        });
        

}
window.onload = loadChart;