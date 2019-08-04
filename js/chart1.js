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
var html = '<div class="row" style="margin-right: 15px;margin-left: 15px;margin-top: 30px">'+
            '<div class="col" style="max-width: 30%;"> <img style="height:200px" src = "' + filteredData[0]["imgURL"] +'"></img> </div>'+
            '<div class="col" ><text font-size:16px> Shot Attempts </text> <div id="chart"> </div> </div> ' +
      '<div class="col" > <text font-size:16px> Shots Made </text> <div id="chart2"> </div> </div> ' +
      '<div class="col" > <text font-size: 16px>Shot Range<div id="chart3"> </div> </div> ' +
            '<div class="col" > <text font-size:16px> Player Stats </text> <div id="linechart"> </div> </div> ' 
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
	
	
	
   //document.write(html);
})
}
