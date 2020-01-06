// Set up SVG definitions
let svgWidth = 960;
let svgHeight = 620;


let margin = {
  top: 20, 
  right: 40, 
  bottom: 200,
  left: 100
};


let width = svgWidth - margin.right - margin.left;
let height = svgHeight - margin.top - margin.bottom;


let chart = d3.select('#scatter')
  .append('div')
  .classed('chart', true);


let svg = chart.append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);


let chartGroup = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);


let bottomAxis = 'poverty';
let leftAxis = 'healthcare';



d3.csv('./data.csv').then(function(healthData) {

    console.log(healthData);
    
    
    healthData.forEach(function(data){
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

   
 
  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);

  
 
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  var xMin;
  var xMax;
  var yMin;
  var yMax;
  
  xMin = d3.min(healthData, function(data) {
      return data.poverty;
  });
  
  xMax = d3.max(healthData, function(data) {
      return data.poverty;
  });
  
  yMin = d3.min(healthData, function(data) {
      return data.healthcare;
  });
  
  yMax = d3.max(healthData, function(data) {
      return data.healthcare;
  });
  
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);
  console.log(xMin);
  console.log(yMax);

 
  
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   


  
  var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append('circle')
    .classed('stateCircle', true)
    .attr('cx', d => xLinearScale(d.poverty))
    .attr('cy', d => yLinearScale(d.healthcare))
    .attr('r', 14)
    .attr('opacity', '.5');

  var textGroup = chartGroup.selectAll('.stateText')
    .data(healthData)
    .enter()
    .append('text')
    .classed('stateText', true)
    .attr('x', d => xLinearScale(d.poverty))
    .attr('y', d => yLinearScale(d.healthcare))
    .attr('dy', 3)
    .attr('font-size', '10px')
    .text(function(d){return d.abbr});

  
  // Cannot get toolTip to work

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (abbr + '%');
//     });

// 
// chartGroup.call(toolTip);

// 
// circlesGroup.on("click", function(data) {
//   toolTip.show(data);
// })
//   // onmouseout event
//   .on("mouseout", function(data, index) {
//     toolTip.hide(data);
//   });


var yLabelsGroup = chartGroup.append('g')
      .attr('transform', `translate(${0 - margin.left/4}, ${height/2})`);

var healthcareLabel = yLabelsGroup.append('text')
      .classed('aText', true)
      .classed('active', true)
      .attr('x', 0)
      .attr('y', 0 - 20)
      .attr('dy', '1em')
      .attr('transform', 'rotate(-90)')
      .attr('value', 'healthcare')
      .text('Without Healthcare (%)');

var xLabelsGroup = chartGroup.append('g')
      .attr('transform', `translate(${width / 2}, ${height + 10 + margin.top})`);

var povertyLabel = xLabelsGroup.append('text')
      .classed('aText', true)
      .classed('active', true)
      .attr('x', 0)
      .attr('y', 20)
      .attr('value', 'poverty')
      .text('In Poverty (%)');

});


