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

var data = [
        {"x": -123, "y": 63, "r": 37, "c": "#50C2E3", "name": "A"},
        {"x": 71, "y": 0, "r": 15, "c": "#50C2E3", "name": "B"},
        {"x": 3845, "y": 77, "r": 15, "c": "#50C2E3", "name": "C"},
        {"x": 3176, "y": 90, "r": 15, "c": "#50C2E3", "name": "D"},
        {"x": -17, "y": 56, "r": 15, "c": "#50C2E3", "name": "D"},
        {"x": 1357, "y": 58, "r": 15, "c": "#50C2E3", "name": "E"},
        {"x": 7684, "y": 75, "r": 15, "c": "#50C2E3", "name": "F"}
    ];

    var width = 500;
    var height = 500;

    var margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    };

    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var minX = _(data).orderBy('x').first().x;
    var maxX = _(data).orderBy('x').last().x;

    x.domain([minX - 500, maxX + 500]);
    y.domain([0, 100]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

    var svg = d3
            .select("#d3")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + 0 + "," + height / 2 + ")")
            .call(xAxis);

    svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width / 2 + "," + 0 + ")")
            .call(yAxis)
            .append("text");
              

  var gdots =  svg.selectAll("g.dot")
            .data(data)
            .enter().append('g');
            
            gdots.append("circle")
            .attr("class", "dot")
            .attr("r", function (d) {
                return d.r;
            })
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return y(d.y);
            })
            .style("fill", function (d) {
                return d.c;
            });
            gdots.append("text").text(function(d){
            	return d.name;
            })
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("y", function (d) {
                return y(d.y);
            });
