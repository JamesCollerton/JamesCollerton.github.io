// // This is using the D3.js library and is covered more fully in the 
// // report. Although this just generates random data currently, the aim
// // is to create a back end database of user statistics that can be fed into
// // this D3 framework and used. 

// // These are all of the page names for the different pages. Later they
// // are update synchronised with the database, but when we first load up
// // the database we want to display some default ones.

// var msc_units = ['Java', 'Arch', 'C', 'Web Tech', 'Research', 'DB', 'Group']
// var msc_results = [86, 74, 82, 75, 77, 90, 72]

// var bsc_units = ['A1', 'NT', 'P1', 'S1', 'L1', 'C1', 'M1',
//                  'A2', 'CM', 'P2', 'S2', 'C2', 'O2', 'MC', 
//                  'DE', 'BA', 'BB', 'PE', 'FM', 'WP', 'TI', 'TS']
// var bsc_results = [73, 76, 66, 81, 74, 77, 82, 83, 82, 83, 82, 79, 94, 76, 91, 75,
//                    59, 72, 80, 78, 70, 71]

// var a_level_units = ['Maths', 'Further Maths', 'Chemistry']
// var a_level_results = [100, 100, 100]

// var data = msc_results;
// var page_names = msc_units;

// // Current page counter for when we're assigning names.
// var curr_page = 0

// // List of all of the radio buttons from the page used for registering
// // clicks.
// var tab_buttons = {

//   comp_sci_tab : document.getElementById("comp_sci_tab"),
//   math_tab : document.getElementById("math_tab"),
//   a_level_tab : document.getElementById("a_level_tab")

// };

// // A selection of nice looking colours that can be randomly chosen from
// // for the graph so that it looks good. I originally wrote a random colour
// // functions, but most of the time it generated rubbish colours.
// var colours = [ 'rgb(51,102,255)', 'rgb(204,51,255)', 'rgb(255,51,204)',
//                 'rgb(102,255,51)', 'rgb(245,184,0)', 'rgb(204,102,255)'];
// var used_colours =[];

// // For all of the buttons in the user stats panel assign a listener.
// function assign_button_listener(){

//   for(button in tab_buttons){ 
//     tab_buttons[button].addEventListener('click', run_checks); 
//   }

// }

// // Every time they are clicked we want to see what is checked in order 
// // to update the data.
// function run_checks(){

//   // console.log(tab_buttons['comp_sci_tab'].className)

//   if(tab_buttons['comp_sci_tab'].className == 'active'){ 
//     button_check('comp_sci_tab'); 
//   }
//   else if(tab_buttons['math_tab'].className == 'active'){ 
//     button_check('math_tab'); 
//   }
//   else if(tab_buttons['a_level_tab'].className == 'active'){
//     button_check('a_level_tab');
//   }
// }

// // Empty the data and the page names columns to add new data and get the
// // page names in order. Then make a request for the given type.
// function button_check(button){

//   curr_page = 0;

//   if(button == 'comp_sci_tab'){
//     data = msc_results;
//     page_names = msc_units;
//   }
//   else if(button == 'math_tab'){
//     data = bsc_results;
//     page_names = bsc_units;
//   }
//   else if(button == 'a_level_tab'){
//     data = a_level_results;
//     page_names = a_level_units;
//   }

// }

// make_d3();
// assign_button_listener();

// ////////////////////////////////////////////////////////////////////////////////

// function make_d3(){

//   // The padding constants are used to move the graph and axes around
//   // to make room for each other. The current page variable is used as an
//   // index to cycle through the data and the page names for feeding information
//   // to the graph.
//   var h_padding = 4;
//   var padding = 30;
//   var curr_page = 0;

//   //Width and height of the graph.
//   var w = 500;
//   var h = 400;

//   // The default dataset to be loaded in. This displays the format of the
//   // graph.
//   var dataset = data;

//   // var dataset = msc_results;
//   // var dataset = bsc_results;

//   // Scales the x axis.
//   var xScale = d3.scale.ordinal()
//           .domain(d3.range(dataset.length))
//           .rangeRoundBands([padding, w - padding], 0.05);

//   // Scales the y axis.
//   var yScale = d3.scale.linear()
//           .domain([0, d3.max(dataset)])
//           .range([4, h - 4]);

//   // This is used to create the axis scale. By
//   // default D3 plots from the other side, so the
//   // scale needs to be reversed to display how we
//   // want it to.
//   var yScale_rev = d3.scale.linear()
//                      .domain([0, d3.max(dataset)])
//                      .range([h - 4, 4]);

//   // This creates the y axis for the graph using the
//   // reversed y scale.
//   var y_axis = d3.svg.axis()
//                  .scale(yScale_rev)
//                  .orient("left")
//                  .ticks(5);

//   //Creates the SVG which holds all of the information
//   var svg = d3.select("#d3_graph")
//               .append("svg")
//               .attr("width", w)
//               .attr("height", h);

//   //Creates a bar for each of the datapoints.
//   svg.selectAll("rect")
//      .data(dataset)
//      .enter()
//      .append("rect")
//      .attr("x", function(d, i) {
//         return xScale(i);
//      })
//      .attr("y", function(d) {
//         return h - yScale(d);
//      })
//      .attr("width", xScale.rangeBand())
//      .attr("height", function(d) {
//         return yScale(d);
//      })
//      .attr("fill", function(d) {
//       return pick_colour();
//      });

//   //Creates text labels for each of the bars.
//   svg.selectAll("text")
//      .data(dataset)
//      .enter()
//      .append("text")
//      .text(function(d) {
//         return get_page_name();
//      })
//      .attr("text-anchor", "middle")
//      .attr("x", function(d, i) {
//         return xScale(i) + xScale.rangeBand() / 2;
//      })
//      .attr("y", function(d) {
//         return h - yScale(d) + 14;
//      })
//      .attr("font-size", "14px")
//      .attr("fill", "white");

//   // Finally we add on the y axis to the graph.
//   svg.append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(" + padding + ",0)")
//     .call(y_axis);

//   //On click, update with new data      
//   d3.select("#tab_update")
//     .on("click", function() {

//       console.log('Hello')

//       // When we click we update the dataset to the new data,
//       // say we have no new colours and the current page is the
//       // first one in the list.
//       dataset = data;
//       used_colours = [];
//       curr_page = 0;

//       // Rescaling x domain.
//       xScale.domain(d3.range(dataset.length))
//             .rangeRoundBands([padding, w - padding], 0.05);

//       // We rescale the display domain and the axis domain.
//       yScale_rev.domain([0, d3.max(dataset)]);
//       yScale.domain([0, d3.max(dataset)]);

//       //Update all rects
//       // svg.selectAll("rect")
//       //    .data(dataset)
//       //    // .transition()
//       //    .enter()
//       //    .delay(function(d, i) {
//       //      return i / dataset.length * 1000;
//       //    })
//       //    .duration(500)
//       //    .attr("x", function(d, i) {
//       //       return xScale(i);
//       //     })
//       //    .attr("width", xScale.rangeBand())
//       //    .attr("y", function(d) {
//       //       return h - yScale(d);
//       //    })
//       //    .attr("height", function(d) {
//       //       return yScale(d);
//       //    })
//       //    .attr("fill", function(d) {
//       //     return pick_colour();
//       //    });

//       bars = svg.selectAll("rect")
//                  .data(data);

//       bars.enter().append("svg:g")
//           .attr("class", "bar")
//           .append("rect");

//       bars.transition().duration(500)
//           .attr("transform", function(d, i) { 
//                return "translate(" + h_padding + "," + yScale(i) + ")"; 
//            })
//           .selectAll("rect")
//            .attr("width", xScale.rangeBand())
//            .attr("y", function(d) {
//               return h - yScale(d);
//            })
//            .attr("height", function(d) {
//               return yScale(d);
//            })
//            .attr("fill", function(d) {
//             return pick_colour();
//            });

//       bars.exit().transition().duration(500)
//           .selectAll("rect")
//           .attr("height", 0)
//           .remove();

//       svg.selectAll("rect")
//        .data(dataset)
//        .remove()

//       svg.selectAll("rect")
//        .data(dataset)
//        .enter()
//        .append("rect")
//        .attr("x", function(d, i) {
//           return xScale(i);
//        })
//        .attr("y", function(d) {
//           return h - yScale(d);
//        })
//        .attr("width", xScale.rangeBand())
//        .attr("height", function(d) {
//           return yScale(d);
//        })
//        .attr("fill", function(d) {
//         return pick_colour();
//        });

//       //Update all labels
//       svg.selectAll("text")
//          .data(dataset)
//          .transition()
//          .delay(function(d, i) {
//            return i / dataset.length * 1000;
//          })
//          .duration(500)
//          .text(function(d) {
//             return get_page_name();
//          })
//          .attr("x", function(d, i) {
//             return xScale(i) + xScale.rangeBand() / 2;
//          })
//          .attr("y", function(d) {
//             return h - yScale(d) + 14;
//          });

//       // Redraws the y axis after a transition.
//        svg.select(".y.axis")
//         .transition()
//         .duration(500)
//         .call(y_axis);

//       svg.select(".x.axis")
//         .transition()
//         .duration(500)
//         .call(x_axis);
                
//     });

//   // This is used to get the names of the pages to put onto the graph.
//   // We work up the numbers 0-6 where the names are stored and if they
//   // are too long we only print the first word. The only exception is
//   // user statistics as 'User' makes no sense, so we change this to stats.
//   function get_page_name(){

//     page_to_display = curr_page
//     curr_page = (curr_page + 1) % page_names.length;

//     return(page_names[page_to_display]);

//   }

//   // This randomly picks a unique colour from the colour scheme not used
//   // before on the same graph.
//   function pick_colour(){

//       return('rgb(0,137,255)')

//   }

// }  


// .bar {
//   fill: steelblue;
// }

// .bar:hover {
//   fill: brown;
// }

// .axis {
//   font: 10px sans-serif;
// }

// .axis path,
// .axis line {
//   fill: none;
//   stroke: #000;
//   shape-rendering: crispEdges;
// }

// .x.axis path {
//   display: none;
// }

// </style>
// <body>
// <script src="d3.v3.min.js"></script>
// <script>

// Mike Bostock "margin conventions"
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// D3 scales = just math
// x is a function that transforms from "domain" (data) into "range" (usual pixels)
// domain gets set after the data loads
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

// D3 Axis - renders a d3 scale in SVG
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

// create an SVG element (appended to body)
// set size
// add a "g" element (think "group")
// annoying d3 gotcha - the 'svg' variable here is a 'g' element
// the final line sets the transform on <g>, not on <svg>
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")

svg.append("g")
    .attr("class", "y axis")
  .append("text") // just for the title (ticks are automatic)
    .attr("transform", "rotate(-90)") // rotate the text!
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

// d3.tsv is a wrapper around XMLHTTPRequest, returns array of arrays (?) for a TSV file
// type function transforms strings to numbers, dates, etc.
d3.tsv("data.tsv", type, function(error, data) {
  replay(data);
});

function type(d) {
  // + coerces to a Number from a String (or anything)
  d.frequency = +d.frequency;
  return d;
}

function replay(data) {
  var count = 4;
  var slices = [];
  for (var i = 0; i < data.length; i++) {
    slices.push(data.slice(0, i));
  }
  slices.forEach(function(slice, index){
    setTimeout(function(){
      draw(slice);
    }, index * 300);
  });
}

function draw(data) {
  // measure the domain (for x, unique letters) (for y [0,maxFrequency])
  // now the scales are finished and usable
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  // another g element, this time to move the origin to the bottom of the svg element
  // someSelection.call(thing) is roughly equivalent to thing(someSelection[i])
  //   for everything in the selection\
  // the end result is g populated with text and lines!
  svg.select('.x.axis').transition().duration(300).call(xAxis);

  // same for yAxis but with more transform and a title
  svg.select(".y.axis").transition().duration(300).call(yAxis)

  // THIS IS THE ACTUAL WORK!
  var bars = svg.selectAll(".bar").data(data, function(d) { return d.letter; }) // (data) is an array/iterable thing, second argument is an ID generator function

  bars.exit()
    .transition()
      .duration(300)
    .attr("y", y(0))
    .attr("height", height - y(0))
    .style('fill-opacity', 1e-6)
    .remove();

  // data that needs DOM = enter() (a set/selection, not an event!)
  bars.enter().append("rect")
    .attr("class", "bar")
    .attr("y", y(0))
    .attr("height", height - y(0));

  // the "UPDATE" set:
  bars.transition().duration(300).attr("x", function(d) { return x(d.letter); }) // (d) is one item from the data array, x is the scale object from above
    .attr("width", x.rangeBand()) // constant, so no callback function(d) here
    .attr("y", function(d) { return y(d.frequency); })
    .attr("height", function(d) { return height - y(d.frequency); }); // flip the height, because y's domain is bottom up, but SVG renders top down

}