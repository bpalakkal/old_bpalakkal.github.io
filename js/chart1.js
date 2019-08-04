var showPlayerInfo = function(player){ 
var playerName = player.Name;
d3.json('Roster.json',function (data) {
  
var filteredData =  data.players.filter(function(d) {  if( d.name == playerName) {return d};});
  
var margin = {top: 40, right: 160, bottom: 35, left: 30}
var width = 1300 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var div = document.getElementById("playerInfo");
while(div.firstElementChild){
    div.removeChild(div.firstElementChild);
}

/*d3.select("body").select("#playerInfo")  
 .append("svg")
 .attr("id","svg2")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + 100 + margin.top + margin.bottom)
 .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");	
*/
var html = '<div class="row" style="margin-right: 15px;margin-left: 15px;">'+
            '<div class="col" style="max-width: 30%;"> <img style="height:200px" src = "' + filteredData[0]["imgURL"] +'"></img> </div>'+
            '<div class="col" > <div id="chart"> </div> </div> ' +
      '<div class="col" > <div id="chart2"> </div> </div> ' +
      '<div class="col" > <div id="chart3"> </div> </div> ' +
            '<div class="col" > <div id="linechart"> </div> </div> ' 
      '</div>';

//var svgid = d3.select("#playerInfo").select("#svg1");
//var svgid = document.getElementById("svg2")
//svgid.insertAdjacentHTML('afterbegin',html);
	document.getElementById("playerInfo").insertAdjacentHTML('afterbegin',html);
displayLineChart (player);
	 var newData ={};
	newData.FTA =  parseInt(player["FTA"]);
	newData["2PA"] = parseInt(player["2PA"]);
	newData["3PA"] = parseInt(player["3PA"]);
	
	 donut(newData, "#chart", ["FT Attempts","2 Pt Attempts", "3 Pt Attempts"]);
	
	 var newData_2 ={};
	newData_2.FTM =  parseInt(player["FTM"]);
	newData_2["2PM"] = parseInt(player["2PM"]);
	newData_2["3PM"] = parseInt(player["3PM"]);
	
	 donut(newData_2, "#chart2", ["FT Made","2 Pt Made", "3 Pt Made"]);
	
	var newData_3 ={};
	newData_3["FGPt"] =  parseInt(player["FGPt"]);
	newData_3["5TO9FGPt"] =  parseInt(player["5TO9FGPt"]);
	newData_3["10TO14FGPt"] = parseInt(player["10TO14FGPt"]);
	newData_3["15TO19FGPt"] = parseInt(player["15TO19FGPt"]);
	newData_3["20TO24FGPt"] = parseInt(player["20TO24FGPt"]);
	newData_3["25TO29FGPt"] = parseInt(player["25TO29FGPt"]);
	//barchart(newData_3, "#chart3", ["FT Made","2 Pt Made", "3 Pt Made"]);
	
	
	
   //document.write(html);
})
}

var displayLineChart = function(player)
{
var playerName = player.Name
d3.json("Roster.json", function(error, data) {
  	if (error) throw error;
  	var filteredData =  data.players.filter(function(d) {  if( d.name == playerName) {return d};});
	var newData = []; 
	for (var key in filteredData[0]["ratings"][0]) {
		var newObj ={};
  		newObj.Rating =  key;
		newObj.RatingValue =parseInt( filteredData[0]["ratings"][0][key]); 
		newData.push(newObj);
	}
	
	newData = newData.sort(function (a, b) {
            return d3.ascending(a.RatingValue, b.RatingValue);
        })
  	//data.sort(function(a, b) { return a.value - b.value; });
	//var svgline =  d3.select("#linechart").append("svg").attr("width",560).attr("height",300),
    	margin = {top: 40, right: 20, bottom: 30, left: 80},
    	width = +svg2.attr("width") - margin.left - margin.right,
   	 height = +svg2.attr("height") - margin.top - margin.bottom;
  
	var tooltip = d3.select("#linechart").append("div").attr("class", "toolTip");
  

	var g = svg2.append("g")
		.attr("transform", "translate("+ margin.top + "," + margin.top  + ")");
  
 	 //var x = d3.scaleLinear().range([0, width]);
	//var y = d3.scaleBand().range([height, 0]).padding(.1);
	//var color = d3.scaleOrdinal(d3.schemeCategory10);
	
	 var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(newData, function (d) {
                return d.RatingValue;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(newData.map(function (d) {
                return d.Rating;
            }));


	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	  var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");
	
	
  	x.domain([0, d3.max(newData, function(d){ return  d.RatingValue ; })])
        y.domain(newData.map(function(d) { return d.Rating }));
 	//color.domain(newData.map(function(d) { return d.Rating }));
    
	g.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis);

    	g.append("g")
        .attr("class", "y axis")
        .call(yAxis);

	 var bars = g.selectAll(".bar")
            .data(newData)
            .enter()
            .append("g");

	
   // g.selectAll(".bar")
    //        .data(newData)
     //       .enter()
      //      .append("g")
	 
      bars.append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.rangeBand())
        .attr("y", function(d) { return y(d.Rating); })
        .attr("width", function(d) { return x(d.RatingValue); })
	// .style('fill',function(d,i) {return color(i);})
        
	
	bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.Rating) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.RatingValue) + 3;
            })
            .text(function (d) {
                return d.RatingValue;
            })
});
}
