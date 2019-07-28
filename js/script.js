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
    	.text("NBA 2018/19 Regular Season Leaders")    

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text("click for more details");

var tabulate = function (data,columns) {	
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 200 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
     
    var svgtext = svg.append("text")
    	.attr("x",(width/2))
    	.attr("y",0-(margin.top/4))
    	.style("text-anchor","middle")
    	.style("font-size","16px")
    	.style("fill","#006bb6")
    	.style("text-decoration","underline")
    	.style("font-weight","bold") 
    	.text("Points Per Game")

	
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 160)
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


var tabulate1 = function (data,columns) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 200 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
  var svgtext = svg.append("a")    	
    	.attr("xlink:href", "rpg.html")
        .append("text")
    	.attr("x",(width/2))
    	.attr("y",0-(margin.top/4))
    	.style("text-anchor","middle")
    	.style("font-size","16px")
    	.style("fill","#006bb6")
    	.style("text-decoration","underline")
    	.style("font-weight","bold") 
    	.text("Rebounds Per Game")
	.on("mouseover", function(){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
	
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 160)
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
	var columns = ['Name','Team','Position','RPG']
  	rpg = tabulate1(data,columns)
	rpg.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.RPG), parseFloat(b.RPG))})
})

var tabulate2 = function (data,columns) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 200 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var svgtext = svg.append("a")    	
    	.attr("xlink:href", "spg.html")
        .append("text")
    	.attr("x",(width/2))
    	.attr("y",0-(margin.top/4))
    	.style("text-anchor","middle")
    	.style("font-size","16px")
    	.style("fill","#006bb6")
    	.style("text-decoration","underline")
    	.style("font-weight","bold") 
    	.text("Steals Per Game")
	.on("mouseover", function(){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 160)
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
	var columns = ['Name','Team','Position','SPG']
  	spg = tabulate2(data,columns)
	spg.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.SPG), parseFloat(b.SPG))})
})


var tabulate3 = function (data,columns) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 200 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
 
    var svgtext = svg.append("a")    	
    	.attr("xlink:href", "apg.html")
        .append("text")
    	.attr("x",(width/2))
    	.attr("y",0-(margin.top/4))
    	.style("text-anchor","middle")
    	.style("font-size","16px")
    	.style("fill","#006bb6")
    	.style("text-decoration","underline")
    	.style("font-weight","bold") 
    	.text("Assists Per Game")
	.on("mouseover", function(){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");}); 
    
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 160)
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
	var columns = ['Name','Team','Position','APG']
  	apg = tabulate3(data,columns)
	apg.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.APG), parseFloat(b.APG))})
})


var tabulate4 = function (data,columns) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 200 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
 
    var svgtext = svg.append("a")    	
    	.attr("xlink:href", "ortg.html")
        .append("text")
    	.attr("x",(width/2))
    	.attr("y",0-(margin.top/4))
    	.style("text-anchor","middle")
    	.style("font-size","16px")
    	.style("fill","#006bb6")
    	.style("text-decoration","underline")
    	.style("font-weight","bold") 
    	.text("Offsensive Rating")
	.on("mouseover", function(){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 160)
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
	var columns = ['Name','Team','Position','OffRating']
  	offr = tabulate4(data,columns)
	offr.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.OffRating), parseFloat(b.OffRating))})
})


var tabulate5 = function (data,columns) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 200 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  
    var svgtext = svg.append("a")    	
    	.attr("xlink:href", "drtg.html")
        .append("text")
    	.attr("x",(width/2))
    	.attr("y",0-(margin.top/4))
    	.style("text-anchor","middle")
    	.style("font-size","16px")
    	.style("fill","#006bb6")
    	.style("text-decoration","underline")
    	.style("font-weight","bold") 
    	.text("Defensive Rating")
	.on("mouseover", function(){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
	
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 160)
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
	var columns = ['Name','Team','Position','DefRating']
  	defr = tabulate5(data,columns)
	defr.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.DefRating), parseFloat(b.DefRating))})
})

var tabulate6 = function (data,columns) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 200 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
   
    var svgtext = svg.append("a")    	
    	.attr("xlink:href", "mpg.html")
        .append("text")
    	.attr("x",(width/2))
    	.attr("y",0-(margin.top/4))
    	.style("text-anchor","middle")
    	.style("font-size","16px")
    	.style("fill","#006bb6")
    	.style("text-decoration","underline")
    	.style("font-weight","bold") 
    	.text("Minutes Per Game")
	.on("mouseover", function(){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 160)
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
	var columns = ['Name','Team','Position','MPG']
  	mpg = tabulate6(data,columns)
	mpg.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.MPG), parseFloat(b.MPG))})
})


var tabulate7 = function (data,columns) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 200 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
   
    var svgtext = svg.append("a")    	
    	.attr("xlink:href", "ftpct.html")
        .append("text")
    	.attr("x",(width/2))
    	.attr("y",0-(margin.top/4))
    	.style("text-anchor","middle")
    	.style("font-size","16px")
    	.style("fill","#006bb6")
    	.style("text-decoration","underline")
    	.style("font-weight","bold") 
    	.text("Free Throw %")
	.on("mouseover", function(){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");}); 
    
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 160)
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
	
     percent = d3.format(".2%")
     cells.filter(function(d,i){
	       return i === 3})
	.html(function(d){
	  return(percent(parseFloat(d.value)));
		 })
  return table;
}

d3.csv('data.csv',function (data) {
	var columns = ['Name','Team','Position','FTPt']
    	ftpt = tabulate7(data,columns)
	ftpt.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.FTPt), parseFloat(b.FTPt))})
})


var tabulate8 = function (data,columns) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var width = 400 - margin.left - margin.right, height = 200 - margin.top - margin.bottom	
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)    
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
   
    var svgtext = svg.append("a")    	
    	.attr("xlink:href", "fgpct.html")
        .append("text")
    	.attr("x",(width/2))
    	.attr("y",0-(margin.top/4))
    	.style("text-anchor","middle")
    	.style("font-size","16px")
    	.style("fill","#006bb6")
    	.style("text-decoration","underline")
    	.style("font-weight","bold") 
    	.text("Field Goal %")
	.on("mouseover", function(){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    var forobj = svg.append("foreignObject")
      .attr("width", 380)
      .attr("height", 160)
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
     percent = d3.format(".2%")
     cells.filter(function(d,i){
	       return i === 3})
	.html(function(d){
	  return(percent(parseFloat(d.value)));
		 })
  return table;
}

d3.csv('data.csv',function (data) {
	var columns = ['Name','Team','Position','FGPt']    	
	fgpt = tabulate8(data,columns)
	fgpt.select("tbody").selectAll("tr")	
	.sort(function(a,b){
		return d3.descending(parseFloat(a.FGPt), parseFloat(b.FGPt))})
})

