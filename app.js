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
  data (variable)
  //call to function to build panel table
}
  


