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

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(healthData){
    // console.log(healthData)

    //Parse data as integer
    healthData.forEach(function(data){
        data.age = +data.age;
        data.income = +data.income;
    })

    let xLinearScale = d3.scaleLinear()
        .domain([20, d3.max([healthData, d => d.age])])
        .range([0, width])

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.income)])
        .range([height, 0])

    let bottomAxis = d3.axisBottom(xLinearScale)
    let leftAxis = d3.axisLeft(yLinearScale)

})
