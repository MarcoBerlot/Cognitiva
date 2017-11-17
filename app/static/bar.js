
// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 900 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .2);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


// add the SVG element
var svg = d3.select("#area2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("static/oneuserlongdata.json", function(error, data) {

    data.forEach(function(d) {
        d.Date = d.Date;
        d.Score = d.Score;
    });

  // scale the range of the data
  x.domain(data.map(function(d) { return d.Date; }));
  y.domain([0, d3.max(data, function(d) { return d.Score; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      // .attr("transform", "rotate(-90)")
      // .attr("y", 1)
      // .attr("dy", ".71em")
      // .style("text-anchor", "end")
      // .text("Idea Density Score");


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Date) + 5; })
      .attr("width", x.rangeBand() - 10)
      .attr("y", function(d) { return y(d.Score); })
      .attr("height", function(d) { return height - y(d.Score); })
      .append("title")
        .text(function(d){
            return "Your Score : " + d.Score;
        });

});