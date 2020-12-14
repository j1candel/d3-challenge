// @TODO: YOUR CODE HERE!
let svgWidth = 960;
let svgHeight = 500;

//Setting the dimensions of the margin 
 let margin = {
     top: 20,
     bottom: 40,
     left: 60, 
     right: 80
 };

 //Setting the width and height
 let width = svgWidth - margin.left -  margin.right;
 let height = svgHeight - margin.top - margin.bottom;  

 //Creating an svg wrapper, and appending attributes to the chart
 let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)