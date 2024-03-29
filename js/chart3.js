function donut(newData , chartName, displayName ){  
  
	
  // Default settings
  var $el = d3.select(chartName)
 
  // var showTitle = true;
  var width = 350,
      height = 200,
      radius = Math.min(width, height) / 2;

  var currentVal;
  var color = d3.scale.category20();
  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });

  var svgdonut, g, arc; 


  var object = {};
    if(!svgdonut){
      arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius - (radius/2.5));

      svgdonut = $el.append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      g = svgdonut.selectAll(".arc")
        .data(pie(d3.entries(newData)))
      .enter().append("g")
      .attr("class", "arc");

      g.append("path")
        // Attach current value to g so that we can use it for animation
        .each(function(d) { this._current = d; })
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.key); });
     // g.append("text")
     //     .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
     //     .attr("dy", ".35em")
     //     .style("text-anchor", "middle");
     // g.select("text").text(function(d) { return d.data.key  + " - " + d.data.value ; });

      svgdonut.append("text")
          .datum(newData)
          .attr("x", 0 )
          .attr("y", 0 + radius/10 )
          .attr("class", "text-tooltip")        
          .style("text-anchor", "middle")
          .attr("font-weight", "bold")
          .style("font-size", radius/2.5+"px");

      g.on("mouseover", function(obj){
        console.log(obj.data)
        svgdonut.select("text.text-tooltip")
        .attr("fill", function(d) { return color(obj.data.value ); })
        .text(function(d){
          return d[obj.data.key];
        });
      });

      g.on("mouseout", function(obj){
        svgdonut.select("text.text-tooltip").text( "")
      });

    }else{
      g.data(pie(d3.entries(newData))).exit().remove();

      g.select("path")
      .transition().duration(200)
      .attrTween("d", function(a){
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
      })

      g.select("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; });

      svgdonut.select("text.text-tooltip").datum(newData);
    }      
 
var legendG = svgdonut.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
  .data(pie(d3.entries(newData)))
  .enter().append("g")
  .attr("transform", function(d,i){
    return "translate(" + (100) + "," + (i * 10 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
  })
  .attr("class", "legend");   

legendG.append("rect") // make a matching color rect
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", function(d, i) {
    return color(d.data.key);
  });

legendG.append("text") // add the text
  .text(function(d,i){
    return displayName[i];
  })
  .style("font-size", 10)
  .attr("y", 10)
  .attr("x", 11);
  // Getter and setter methods
  object.newData = function(value){
    if (!arguments.length) return newData;
    newData = value;
    return object;
  };

  object.$el = function(value){
    if (!arguments.length) return $el;
    $el = value;
    return object;
  };

  object.width = function(value){
    if (!arguments.length) return width;
    width = value;
    radius = Math.min(width, height) / 2;
    return object;
  };

  object.height = function(value){
    if (!arguments.length) return height;
    height = value;
    radius = Math.min(width, height) / 2;
    return object;
  };

  return object;

	
	
        };
