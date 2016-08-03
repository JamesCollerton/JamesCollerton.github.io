/**

@class gradeVisualisations

@classdesc Holds all of the information around creating the grade visualisations.

*/
function gradeVisualisations() {

	/**

	@memberof gradeVisualisations
	@inner previousButtonID
	@description Holds the ID of the last clicked button. An empty string if
	nothing has been clicked.

	*/
	var previousButtonID = "";

	/**

	@memberof gradeVisualisations
	@inner sectionButtons
	@description Dictionary of all the button IDs we can click on the page.

	*/
	var sectionButtons = {

		mscSection : "educationPageMScIcon",
		bscSection : "educationPageBScIcon",
		aLevelSection : "educationPageALevelIcon"

	};

	/**

	@function assignButtonListeners

	@param tsv_data - The data we want to draw.

	@description This function assigns all of the button listeners
	to the different stats buttons, changing the graph and updating
	the CSS of the clicked ones.

	*/
	function assignButtonListeners(tsv_data){

		for(button in sectionButtons){

			$("#" + sectionButtons[button]).click( function(){

				var buttonID = $(this).attr('id');
				changeGradeVisualisation(tsv_data, buttonID);
				changeButtonCSS(buttonID);

			});

		}

		changeButtonCSS(sectionButtons["mscSection"]);

	}

	/**

	@function assignButtonListeners

	@param buttonID - The ID of the button that was clicked.

	@description If a button was previously marked as active, removes that
	CSS. Then adds the CSS to the last clicked button and sets the 
	previously clicked button.

	*/
	function changeButtonCSS(buttonID){

		if(previousButtonID !== ""){ 
			$("#" + previousButtonID).removeClass("educationPageStatsIconActive");
		}

		$("#" + buttonID).addClass("educationPageStatsIconActive");

		previousButtonID = buttonID;

	}

	/**

	@function assignButtonListeners

	@param data - The data for the grades.
	@param buttonID - The ID of the button that was clicked.

	@description We assign the sliced data as the data itself, then depending
	on what was clicked we change it to reflect that selection and then draw
	it in the graph.

	*/
	function changeGradeVisualisation(data, buttonID){

		var slice = data;

		switch(buttonID){

			case sectionButtons["mscSection"]:
				slice = data.slice(0, 7);
				break;
			case sectionButtons["bscSection"]:
				slice = data.slice(7, 29);
				break;
			case sectionButtons["aLevelSection"]:
				slice = data.slice(29, data.length);
				break;

		}

		educationD3GraphOne.draw(slice);
		educationD3GraphTwo.draw(slice);

	}

	// Functions to be accessible outside the class.
	return {
		assignButtonListeners: assignButtonListeners
	}

}

/**

@class d3Graph

@classdesc Holds all of the information around the actual d3 graph.

*/
function d3Graph(d3GraphID){

	/**

	@memberof d3Graph
	@inner margin
	@description These are the margins assigned to the graph. 

	*/
	var margin = {top: 20, right: 20, bottom: 70, left: 40},
				  width = $("#" + d3GraphID + "PanelBody").width() - margin.left - margin.right,
				  height = 300 - margin.top - margin.bottom;

	/**

	@memberof d3Graph
	@inner x / y
	@description These are the scales for the graph. 

	*/
	var x = d3.scale.ordinal()
				.rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
				.range([height, 0]);

	/**

	@memberof d3Graph
	@inner xAxis / yAxis
	@description These are the axes for the graph.

	*/
	var xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom");

	var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left")
					.ticks(10, "%");

	/**

	@memberof d3Graph
	@inner svg
	@description This is the SVG element, sets the width, height and adds a 
	group. Then adds the x and y axes with some labelling.

	*/
	var svg = d3.select("#" + d3GraphID).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")");

	svg.append("g")
			.attr("class", "y axis")
			.append("text") 
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Percentage");

	/**

	@memberof d3Graph
	@inner d3.tsv
	@description d3.tsv is a wrapper around XMLHTTPRequest, returns array of 
	arrays (?) for a TSV file type function transforms strings to numbers, 
	dates, etc.

	*/
	d3.tsv("Data/data.tsv", type, function(error, data) {
		msc_slice = data.slice(0, 7)
		draw(msc_slice)
		educationGradeVisualisations.assignButtonListeners(data)
	});

	/**

	@memberof d3Graph
	@inner svg
	@description This is the SVG element, sets the width, height and adds a 
	group. Then adds the x and y axes with some labelling.

	*/
	function type(d) {
		d.frequency = +d.frequency;
		return d;
	}

	/**

	@function assignButtonListeners

	@param data - The data for the grades.
	@param buttonID - The ID of the button that was clicked.

	@description This redraws the graph.

	*/
	function draw(data) {

		// Measure the domain (for x, unique letters) (for y [0,maxFrequency])
		// now the scales are finished and usable.
		x.domain(data.map(function(d) { return d.letter; }));
		y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

		// Another g element, this time to move the origin to the bottom of 
		// the svg element someSelection.call(thing) is roughly equivalent to 
		// thing(someSelection[i]) for everything in the selection the end 
		// result is g populated with text and lines!
		svg.select('.x.axis').transition().duration(300).call(xAxis);

		// Same for yAxis but with more transform and a title
		svg.select(".y.axis").transition().duration(300).call(yAxis)

		svg.select('.x.axis')
			.selectAll("text")  
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", function(d) {
					return "rotate(-65)" 
			});

		var bars = svg.selectAll(".bar")
						.data(data, function(d) { 
							return d.letter; 
						})

		bars.exit()
			.transition()
			.duration(300)
			.attr("y", y(0))
			.attr("height", height - y(0))
			.style('fill-opacity', 1e-6)
			.remove();

		// Data that needs DOM = enter() (a set/selection, not an event!)
		bars.enter().append("rect")
			.attr("class", "bar")
			.attr("y", y(0))
			.attr("height", height - y(0));

		// The "UPDATE" set:
		bars.transition().duration(300).attr("x", function(d) { return x(d.letter); }) 
			.attr("width", x.rangeBand()) 
			.attr("y", function(d) { return y(d.frequency); })
			.attr("height", function(d) { return height - y(d.frequency); }); 

	}

	// Functions available outside class.
	return{
		draw: draw
	}
}

// Initialising closures.
var educationGradeVisualisations = gradeVisualisations();
var educationD3GraphOne = d3Graph("d3GraphOne");
var educationD3GraphTwo = d3Graph("d3GraphTwo");