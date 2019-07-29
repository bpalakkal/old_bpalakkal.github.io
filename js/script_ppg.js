var margin = {top: 10, right: 10, bottom: 10, left: 10}
var width = 1200 - margin.left - margin.right, height = 40 - margin.top - margin.bottom	
var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var svgtext = svg.append("text")
       .attr("x",(width/2))
    	.attr("y",(margin.top*2))
    	.style("text-anchor","middle")
    	.style("font-size","24px")
    	.style("fill","#006bb6")    	
    	.style("font-weight","bold")
    	.text("NBA 2018/19 Regular Season - Points Per Game Leaders")    

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text("click for more details");

var tabulate = function (data,columns) {	
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 1000 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 960)
      .append("xhtml:body")
    var table = forobj.append("table")
    var thead = table.append('thead')
    var tbody = table.append('tbody')
	thead.append('tr')
	  .selectAll('th')
	    .data(columns)
	    .enter()
	  .append('th')
	    .text(function (d) { return d })

	var rows = tbody.selectAll('tr')
	    .data(data)
	    .enter()
	  .append('tr')

	var cells = rows.selectAll('td')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value })

  return table;
}

d3.csv('data.csv',function (data) {
	var columns = ['Name','Team','Position','PPG']
  	ppg = tabulate(data,columns)
	ppg.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.PPG), parseFloat(b.PPG))})
})

var margin = {top: 20, right: 20, bottom: 30, left: 400},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// setup x 
var xScale = d3.scale.linear().range([0, width]),
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
// setup y
var yScale = d3.scale.linear().range([height, 0]),
    yAxis = d3.svg.axis().scale(yScale).orient("left");
// x-axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("MPG");
// y-axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("PPG");

d3.csv("data.csv", function(d) { // d is a common d3 variable for the data
    return {
      val1: parseFloat(d.MPG), // for the most part, you can build an object using dot notation and column header value
      val2: +parseFloat(d.PPG), // you can convert types through a variety of ways. The '+' converts a string to a number
      val3: +d["Team"], // you can also use the bracket notation if the header values are funky
      val4: +d["Name"]
    };
}, function(error, data) {
   // update scales
   xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
   yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
   // update x-axis
   svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
   .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("MPG");
   // update y-axis
   svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
   .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("PPG");

svg.selectAll(".dot")
      .data(data)
   .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) { return d["Name"] == 0 ? 0 : d["Name"]})
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));})
      .on("mouseover", function(d) {
         tooltip.transition()
            .duration(200)
            .style("opacity", .9);
         tooltip.html("Message with " + d.MPG)
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
         tooltip.transition()
            .duration(500)
            .style("opacity", 0);
      });	
});
// setup x
var xValue = function(d) { return parseFloat(d.MPG);},
   xScale = d3.scale.linear().range([0, width]),
   xMap = function(d) { return xScale(xValue(d));},
   xAxis = d3.svg.axis().scale(xScale).orient("bottom");
// setup y
var yValue = function(d) { return parseFloat(d.PPG);},
   yScale = d3.scale.linear().range([height, 0]),
   yMap = function(d) { return yScale(yValue(d));},
   yAxis = d3.svg.axis().scale(yScale).orient("left");
var cValue = function(d) { return d["Name"];},
   color = d3.scale.category20();
var tooltip = d3.select("body").append("div")
   .attr("class", "tooltip")
   .style("opacity", 0);
