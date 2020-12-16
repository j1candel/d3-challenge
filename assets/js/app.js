// @TODO: YOUR CODE HERE!
let svgWidth = 960;
let svgHeight = 500;

//Setting the dimensions of the margin 
 let margin = {
     top: 20,
     right: 40,
     bottom: 60, 
     left: 100
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
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
    });

    let xLinearScale = d3.scaleLinear()
        .domain([5, d3.max(healthData, d => d.poverty)])
        .range([0, width])

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.smokes) +5])
        .range([height, 0]);

    let bottomAxis = d3.axisBottom(xLinearScale)
    let leftAxis = d3.axisLeft(yLinearScale)

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis)

    chartGroup.append("g")
        .call(leftAxis)
    
    let circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", ".5")
        .attr("class", "abbr")
    
    let textGroup = chartGroup.selectAll(".stateText")
        .data(healthData)
        .enter()
        .append("text")
        .classed("stateText", true)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.smokes))
        .attr("dy", 3)
        .attr("font-size", "10px")
        .text(function(d){return d.abbr})

    let toolTip = d3.tip()
        .offset([80, -60])
        .html(function(d){
            return (`${d.state} <br>Poverty: ${d.poverty} % <br>Smokes: ${d.smokes} %`)
        })
    
    chartGroup.call(toolTip)

    circlesGroup.on("click", function(data) {
        toolTip.show(data, this)
    })

        .on("mouseout", function(data, index){
            toolTip.hide(data)
        })

    textGroup.call(toolTip)

    textGroup.on("click", function(data) {
        toolTip.show(data, this)
        })
    
        .on("mouseout", function(data, index){
            toolTip.hide(data)
        })

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height/1.5))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokers (%)")

    chartGroup.append("text")
        .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Poverty (%)")
}).catch(function(error){
    console.log(error)
})

