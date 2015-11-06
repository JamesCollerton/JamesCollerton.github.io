// This is using the D3.js library and is covered more fully in the 
// report. Although this just generates random data currently, the aim
// is to create a back end database of user statistics that can be fed into
// this D3 framework and used. 

// These are all of the page names for the different pages. Later they
// are update synchronised with the database, but when we first load up
// the database we want to display some default ones.
var page_names = ['About', 'Home', 'User Stats','Art', 'Photography', 'Models']

var msc_units = ['Java', 'Comp Arch', 'C', 'Web Tech', 'Research', 'Databases', 'Group Project']
var msc_results = [86, 74, 82, 75, 77, 90, 72]

var bsc_units = ['Analysis 1', 'Num Theory', 'Prob 1', 'Stats 1', 'LAG 1', 'Calc 1', 'Mech 1',
                 'Analysis 2', 'Comp Math', 'Prob 2', 'Stats 2', 'Calc 2', 'Optimisation',
                 'Chinese', 'ODE 2', 'Bayesian A', 'Bayesian B', 'Economics', 'Financial',
                 'Project', 'Inference', 'Time Series']
var bsc_results = [73, 76, 66, 81, 74, 77, 82, 83, 82, 83, 82, 79, 94, 76, 91, 75,
                   59, 72, 80, 78, 70, 71]

var a_level_units = ['Maths', 'Further Maths', 'Chemistry']
var a_level_results = [100, 100, 100]

// This is updated with data each time we make a request.
var data = [1, 2, 3, 4, 5, 6];

var first_pass = true;

// List of all of the radio buttons from the page used for registering
// clicks.
// var radio_buttons = {
//   time_radio : document.getElementById("time"),
//   clicks_radio : document.getElementById("clicks"),
//   hits_radio: document.getElementById("hits"),
//   contacts_radio: document.getElementById("contacts"),
// };

// List of all of the possible page titles.
var pages = {
  home: 'Home.',
  art: 'Art Gallery.',
  photography: 'Photography Gallery.',
  models: 'Models.',
  about: 'About.',
  user_stats: 'User Statistics.',
}

// A selection of nice looking colours that can be randomly chosen from
// for the graph so that it looks good. I originally wrote a random colour
// functions, but most of the time it generated rubbish colours.
var colours = [ 'rgb(51,102,255)', 'rgb(204,51,255)', 'rgb(255,51,204)',
                'rgb(102,255,51)', 'rgb(245,184,0)', 'rgb(204,102,255)'];
var used_colours =[];

// For all of the buttons in the user stats panel assign a listener.
// function assign_button_listener(){

//   for(button in radio_buttons){ 
//     radio_buttons[button].addEventListener('click', run_checks); 
//   }

// }

// Every time they are clicked we want to see what is checked in order 
// to update the data.
// function run_checks(){

//   if(radio_buttons['time_radio'].checked){ 
//     button_check('time_radio', 'Time'); 
//   }
//   else if(radio_buttons['clicks_radio'].checked){ 
//     button_check('clicks_radio', 'Num_Clicks'); 
//   }
//   else if(radio_buttons['hits_radio'].checked){
//     button_check('hits_radio', 'Hits');
//   }
//   else if(radio_buttons['contacts_radio'].checked){
//     button_check('contacts_radio', 'Contacts');
//   }
// }

// Empty the data and the page names columns to add new data and get the
// page names in order. Then make a request for the given type.
// function button_check(button, type){

//   data = [];
//   page_names = [];

//   if(radio_buttons[button].checked){ stat_request(type); }

// }

// This is the stat request. We use the socket to communicate a request
// back fo a certain type, then add it onto the data array.
// function stat_request(req_type){

//   var data_point = 0;
//   var first_pass = true;

//   request = {type : req_type};
//   socket.emit('stat request', { req: request });

//   socket.on('request ans', function (data) {
//     data_point = data['ans'];
//     if(first_pass){ 
//       update_data_array(data_point, req_type); 
//       first_pass = false; 
//     }
//   });

// }

// Once we have the data back from the database we add it and the name of the
// page it is from to the data and page name arrays to be referenced later.
// function update_data_array(data_point, req_type) {

//   for(i = 0; i < data_point.length; ++i){
//     data.push(data_point[i][req_type]);
//     page_names.push(data_point[i]['Page']);
//   }

//   if(first_pass){ first_pass = false; make_d3();}
// }

// assign_button_listener();

////////////////////////////////////////////////////////////////////////////////
make_d3()

function make_d3(){

  // The padding constants are used to move the graph and axes around
  // to make room for each other. The current page variable is used as an
  // index to cycle through the data and the page names for feeding information
  // to the graph.
  var h_padding = 4;
  var padding = 30;
  var curr_page = 0;

  //Width and height of the graph.
  var w = 600;
  var h = 400;

  // The default dataset to be loaded in. This displays the format of the
  // graph.
  // var dataset = data;

  var dataset = msc_results;

  // Scales the x axis.
  var xScale = d3.scale.ordinal()
          .domain(d3.range(dataset.length))
          .rangeRoundBands([padding, w - padding], 0.05);

  // Scales the y axis.
  var yScale = d3.scale.linear()
          .domain([0, d3.max(dataset)])
          .range([4, h - 4]);

  // This is used to create the axis scale. By
  // default D3 plots from the other side, so the
  // scale needs to be reversed to display how we
  // want it to.
  var yScale_rev = d3.scale.linear()
                     .domain([0, d3.max(dataset)])
                     .range([h - 4, 4]);

  // This creates the y axis for the graph using the
  // reversed y scale.
  var y_axis = d3.svg.axis()
                 .scale(yScale_rev)
                 .orient("left")
                 .ticks(5);

  //Creates the SVG which holds all of the information
  var svg = d3.select("#d3_graph")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  //Creates a bar for each of the datapoints.
  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {
        return xScale(i);
     })
     .attr("y", function(d) {
        return h - yScale(d);
     })
     .attr("width", xScale.rangeBand())
     .attr("height", function(d) {
        return yScale(d);
     })
     .attr("fill", function(d) {
      return pick_colour();
     });

  //Creates text labels for each of the bars.
  // svg.selectAll("text")
  //    .data(dataset)
  //    .enter()
  //    .append("text")
  //    .text(function(d) {
  //       return get_page_name();
  //    })
  //    .attr("text-anchor", "middle")
  //    .attr("x", function(d, i) {
  //       return xScale(i) + xScale.rangeBand() / 2;
  //    })
  //    .attr("y", function(d) {
  //       return h - yScale(d) + 14;
  //    })
  //    .attr("font-size", "14px")
  //    .attr("fill", "white");

  // Finally we add on the y axis to the graph.
  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(y_axis);

  //On click, update with new data      
  d3.select("#update_stats")
    .on("click", function() {

      // When we click we update the dataset to the new data,
      // say we have no new colours and the current page is the
      // first one in the list.
      dataset = data;
      used_colours = [];
      curr_page = 0;

      // We rescale the display domain and the axis domain.
      yScale_rev.domain([0, d3.max(dataset)]);
      yScale.domain([0, d3.max(dataset)]);

      //Update all rects
      svg.selectAll("rect")
         .data(dataset)
         .transition()
         .delay(function(d, i) {
           return i / dataset.length * 1000;
         })
         .duration(500)
         .attr("y", function(d) {
            return h - yScale(d);
         })
         .attr("height", function(d) {
            return yScale(d);
         })
         .attr("fill", function(d) {
          return pick_colour();
         });

      //Update all labels
      svg.selectAll("text")
         .data(dataset)
         .transition()
         .delay(function(d, i) {
           return i / dataset.length * 1000;
         })
         .duration(500)
         .text(function(d) {
            return get_page_name();
         })
         .attr("x", function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2;
         })
         .attr("y", function(d) {
            return h - yScale(d) + 14;
         });

      // Redraws the y axis after a transition.
       svg.select(".y.axis")
        .transition()
        .duration(500)
        .call(y_axis);
                
    });

  // This is used to get the names of the pages to put onto the graph.
  // We work up the numbers 0-6 where the names are stored and if they
  // are too long we only print the first word. The only exception is
  // user statistics as 'User' makes no sense, so we change this to stats.
  function get_page_name(){
    page_title = curr_page % 7;
    ++curr_page;
    var page_name = String(page_names[page_title]);
    var split = page_name.split(" ")[0];
    if(split == "User"){ split = "Stats"; }
    return(split);
  }

  // This randomly picks a unique colour from the colour scheme not used
  // before on the same graph.
  function pick_colour(){
    // do{
    //   colour = Math.floor(Math.random() * 6);
    // }while(used_colours.indexOf(colour) > -1);
    // used_colours.push(colour);
    // return colours[colour];

    return('rgb(51,102,255)');
  }

}  
