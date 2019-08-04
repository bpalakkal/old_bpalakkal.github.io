var drawBarChart = function(team) {
var margin = {top: 40, right: 160, bottom: 35, left: 30}
var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
//d3.select("body").select(".chartArea").select("svg1").selectAll("*").remove();
//d3.select("body").select("#playerInfo").select("svg1").remove();
var div = document.getElementById("playerInfo");
while(div.firstElementChild){
    div.removeChild(div.firstElementChild);
}
var svg1 = d3.select("body").select("#playerInfo")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + 100 + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var teamdata = d3.json("data.json", 
       function(error, data){
  	// change string (from CSV) into number format
    	var alldata = data.filter(function(d) { 
    	if( d.Team === team){
		d.ppg = +d.PPG;
		d.mpg = +d.MPG;	
		d.spg = +d.SPG;
		d.name = d.Name;
		d.apg = +d.APG;
		d.rpg = +d.RPG	
	    return(d);
	}
  }) 
// Transpose the data into layers
var dataset = d3.layout.stack()(["ppg", "rpg", "apg", "spg"].map(function(stat) {
  return alldata.map(function(d) {
    return {x: d.name, y: +d[stat]};
  });
}));

// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, 500], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  .range([400, 0]);

var colors = ["#a30622", "#c9441e", "#e87413", "#ffa600"];

// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");  

svg1.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .selectAll("text")	
  .style("fill","#FFFFFF")  

svg1.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")  
  .call(xAxis)
.selectAll("text")	
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(65)")
    .style("fill","#FFFFFF")    	
    .style("text-anchor", "start");

// Create groups for each series, rects for each segment 
var groups = svg1.selectAll("g.stat")
  .data(dataset)
  .enter().append("g")
  .attr("class", "stat")
  .style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
  .on("mouseover", function() { tooltip.style("display", null); })
  .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.y);
  });

// Draw legend
var legend = svg1.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)  	
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .style("fill","#FFFFFF")	
  .text(function(d, i) { 
    switch (i) {
      case 0: return "Points Per Game";
      case 1: return "Rebounds Per Game";
      case 2: return "Assists Per Game";
      case 3: return "Steals Per Game";
    }
  });

// Prep the tooltip bits, initial display is hidden
var tooltip = svg1.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
	});  
} //end of function
