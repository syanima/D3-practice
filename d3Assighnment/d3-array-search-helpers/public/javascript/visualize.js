var data = [2,5,6,7,3];

var info = [
  {date: new Date(2011, 1, 1), value: 0.5},
  {date: new Date(2011, 2, 1), value: 0.6},
  {date: new Date(2011, 3, 1), value: 0.7},
  {date: new Date(2011, 4, 1), value: 0.8}
];

var scan = d3.scan(data);
var bisect = d3.bisect(data);
var bisector = d3.bisector(function(d) { return d; }).right;
var ascending = d3.ascending(data);
var descending = d3.descending(data);


console.log(scan);
console.log(bisect);
console.log(bisector(data,9));
console.log(data);
console.log(ascending);
console.log(descending);