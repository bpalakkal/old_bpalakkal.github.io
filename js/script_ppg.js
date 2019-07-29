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

fdata = d3.csv('data.csv',function (data) {
	var columns = ['Name','Team','MPG','PPG']
  	ppg = tabulate(data,columns)
	ppg.select("tbody").selectAll("tr")	
	.filter(function(d){
		return d["Team"]==="GOL"})
})

// Calling the method below  
 showScatterPlot(fdata);  
   
function showScatterPlot(data)   
 {  
     // Spacing Around   
     var margins =  
     {  
         "left": 40,  
         "right": 30,  
         "top": 30,  
         "bottom": 30  
     };  
   
     var width = 500;  
     var height = 500;  
   
     // This will be our colour scale. An Ordinal scale.  
     var colors = d3.scale.category10();  
   
     // Adding the SVG component to the scatter-load div  
     var svg = d3.select("#scatter-load").append("svg").attr("width", width).attr("height", height).append("g")  
     .attr("transform", "translate(" + margins.left + "," + margins.top + ")");  
   
     // Setting the scale that we're using for the X axis.   
     // Domain define the min and max variables to show. In this case, it's the min and max Votes of items.  
     // this is made a compact piece of code due to d3.extent which gives back the max and min of the Vote variable within the dataset  
     var x = d3.scale.linear()  
     .domain(d3.extent(data, function (d)   
     {  
         return d.MPG;  
     }))  
   
     // Range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)  
     .range([0, width - margins.left - margins.right]);  
   
     // Scalling for the y axis but maps from the rating variable to the height to 0.   
     var y = d3.scale.linear()  
     .domain(d3.extent(data, function (d)  
     {  
         return d.PPG;  
     }))  
   
     // Note that height goes first due to the weird SVG coordinate system  
     .range([height - margins.top - margins.bottom, 0]);  
   
     // Adding the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit  
     svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");  
     svg.append("g").attr("class", "y axis");  
   
     // X axis label. Nothing too special to see here.  
     svg.append("text")  
     .attr("fill", "#414241")  
     .attr("text-anchor", "end")  
     .attr("x", width / 2)  
     .attr("y", height - 35)  
     .text("MPG");  
   
   
     // Actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information  
 var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);  
 var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);  
   
     // Selecting the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.   
     svg.selectAll("g.y.axis").call(yAxis);  
     svg.selectAll("g.x.axis").call(xAxis);  
   
     // Now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.  
     var chocolate = svg.selectAll("g.node").data(data, function (d)   
     {  
         return d.name;  
     });  
   
     // We 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.  
   
     var chocolateGroup = chocolate.enter().append("g").attr("class", "node")  
   
     // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items   
     .attr('transform', function (d)   
     {  
         return "translate(" + x(d.MPG) + "," + y(d.PPG) + ")";  
     });  
   
     // Adding our first graphics element! A circle!   
     chocolateGroup.append("circle")  
     .attr("r", 5)  
     .attr("class", "dot")  
     .style("fill", function (d)  
     {  
         // remember the ordinal scales?   
         // We use the colors scale to get a colour for our votes. Now each node will be coloured  
         // by votes to the languages.   
         return colors(d.Team);  
     });  
   
     // Adding some text, so we can see what each item is.  
     chocolateGroup.append("text")  
     .style("text-anchor", "middle")  
     .attr("dy", -10)  
     .text(function (d)  
     {  
         // this shouldn't be a surprising statement.  
         return d.Name;  
     });  
 }  

