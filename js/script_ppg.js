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


d3.json('data.json',function (data) {
	data.forEach(function(d) {
        d.Name = d.Name;
        d.Team = d.Team;
	d.Position = d.Position;
	d.PPG = +d.PPG })
  	ppg = tabulate(data,["Name","Team","Position","PPG"])
	ppg.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.PPG), parseFloat(b.PPG))})
});

d3.json('data.json',function (data) {
	data.forEach(function(d) {
        d.Name = d.Name;
        d.Team = d.Team;
	d.Position = d.Position;
	d.PPG = +d.PPG;
	d.MPG = +d.MPG})
});

var margin = {top: 20, right: 10, bottom: 20, left:10};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var svg = d3.select('body')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


var xScale = d3.scaleLinear()
		.range([0, width]);

var yScale = d3.scaleLinear()
		.range([height, 0]);

var radius = d3.scaleSqrt()
		.range([2,5]);

var xAxis = d3.axisBottom()
		.scale(xScale);

var yAxis = d3.axisLeft()
		.scale(yScale);

var color = d3.scaleOrdinal(d3.schemeCategory20);

xScale.domain(d3.extent(data, function(d){
			return d.MPG;
		})).nice();

yScale.domain(d3.extent(data, function(d){
			return d.PPG;
		})).nice();

radius.domain(d3.extent(data, function(d){
			return d.PPG;
		})).nice();

svg.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'x axis')
	.call(xAxis);

svg.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'y axis')
	.call(yAxis);

var bubble = svg.selectAll('.bubble')
	.data(data)
	.enter().append('circle')
	.attr('class', 'bubble')
	.attr('cx', function(d){return xScale(d.MPG);})
	.attr('cy', function(d){ return yScale(d.PPG); })
	.attr('r', function(d){ return radius(d.PPG); })
	.style('fill', function(d){ return color(d.Name); });

	bubble.append('title')
		.attr('x', function(d){ return radius(d.PetalLength); })
		.text(function(d){
		return d.Name;
			});

	svg.append('text')
			.attr('x', 10)
			.attr('y', 10)
			.attr('class', 'label')
			.text('Points Per Game');

	var legend = svg.selectAll('legend')
			.data(color.domain())
			.enter().append('g')
			.attr('class', 'legend')
			.attr('transform', function(d,i){ return 'translate(0,' + i * 20 + ')'; });

		// give x value equal to the legend elements. 
		// no need to define a function for fill, this is automatically fill by color.
		legend.append('rect')
			.attr('x', width)
			.attr('width', 18)
			.attr('height', 18)
			.style('fill', color);


		svg.append('text')
			.attr('x', width)
			.attr('y', height - 10)
			.attr('text-anchor', 'end')
			.attr('class', 'label')
			.text('Minutes Per Game');

		
legend.append('text')
			.attr('x', width - 6)
			.attr('y', 9)
			.attr('dy', '.35em')
			.style('text-anchor', 'end')
			.text(function(d){ return d; });
		
legend.on('click', function(type){
			d3.selectAll('.bubble')
				.style('opacity', 0.15)
				.filter(function(d){
					return d.Name == type;
				})
				.style('opacity', 1);
		})
