var names;
var metadata;
var samples;

// Fetch the JSON data and console log it
d3.json("samples.json").then(function(data) {
    console.log(data.names);
    names = data.names;
    metadata = data.metadata[0];
    samples = data.samples;

    var dropdownMenu = d3.select("#selDataset");

    names.forEach(element => dropdownMenu.append("option").text(element).property("value", element));

    var boxinfo = d3.select('#sample-metadata');

    Object.keys(metadata).forEach(key => {
      console.log(key, metadata[key]);
      boxinfo.append("h6").text(`${key}: ${metadata[key]}`);
    });


  });

function optionChanged(variable) {
  console.log(variable);
  //call to function to build panel table
}
  
// data.map(bbdata);

// function bbdata(details) {
//   return = [details.metadata];
// }
     //create array from values in data?
    // var ID = Object.values(data.id);
    // var wfreq = Object.values(data.ethnicity);
    // var gender =  Object.values(data.gender);
    // var ethn = Object.values(data.ethnicity);
    // var age = Object.values(data.age);
    // var location = Object.values(data.location);
    // var bbtype = Object.values(data.bbtype);

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.node().value;

  var CHART = d3.selectAll("#bar").node();

  // Initialize x and y arrays
  var x = [];
  var y = [];

  switch(dataset) {
    case "dataset1":
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 4, 8, 16];
      break;

    case "dataset2":
      x = [10, 20, 30, 40, 50];
      y = [1, 10, 100, 1000, 10000];
      break;

    case "dataset3":
      x = [100, 200, 300, 400, 500];
      y = [10, 100, 50, 10, 0];
      break;

    default:
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 3, 4, 5];
      break;
  }


  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle(CHART, "x", [x]);
  Plotly.restyle(CHART, "y", [y]);
}

init();





  // Create the Trace
var trace1 = {
  x: eyeColor,
  y: eyeFlicker,
  type: "bar",
  orientation: 'h'
};

// Create the data array for the plot
var data = [trace1];

// Define the plot layout
var layout = {
  title: "Top 10 Bacteria Cultures Found",
};