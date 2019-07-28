var tabulate = function (data,columns) {
    var svg = d3.select("body").append("svg")
      .attr("width", 500)
      .attr("height", 300);
    var forobj = svg.append("foreignObject")
      .attr("width", 400)
      .attr("height", 200)
      .append("xhtml:body")
    var objtitle = forobj.append("text").text("Points Per Game")
    var table = objtitle.append("table")
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
  tabulate(data,columns)
})

var tabulate = function (data,columns) {
    var svg = d3.select("body").append("svg")
      .attr("width", 500)
      .attr("height", 300);
    var forobj = svg.append("foreignObject")
      .attr("width", 400)
      .attr("height", 200)
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
  tabulate(data,columns)
})

var tabulate = function (data,columns) {
    var svg = d3.select("body").append("svg")
      .attr("width", 500)
      .attr("height", 300);
    var forobj = svg.append("foreignObject")
      .attr("width", 400)
      .attr("height", 200)
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
  tabulate(data,columns)
})

var tabulate = function (data,columns) {
    var svg = d3.select("body").append("svg")
      .attr("width", 500)
      .attr("height", 300);
    var forobj = svg.append("foreignObject")
      .attr("width", 400)
      .attr("height", 200)
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
  tabulate(data,columns)
})

var tabulate = function (data,columns) {
    var svg = d3.select("body").append("svg")
      .attr("width", 500)
      .attr("height", 300);
    var forobj = svg.append("foreignObject")
      .attr("width", 400)
      .attr("height", 200)
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
	var columns = ['Name','Team','Position','BPG']
  tabulate(data,columns)
})

var tabulate = function (data,columns) {
    var svg = d3.select("body").append("svg")
      .attr("width", 500)
      .attr("height", 300);
    var forobj = svg.append("foreignObject")
      .attr("width", 400)
      .attr("height", 200)
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
	var columns = ['Name','Team','Position','FGPt']
  tabulate(data,columns)
})
