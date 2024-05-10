// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then (function (sample) {

    // get the metadata field


    // Filter the metadata for the object with the desired sample number


    // Use d3 to select the panel with id of `#sample-metadata`
  var sample_metadata = d3.select ("#sample-metadata");

    // Use `.html("") to clear any existing metadata
  sample_metadata.html ("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
  Object.entries (sample).forEach (([key, value]) => {
    var row = sample_metadata.append ("p");
    row.text (`${key}: ${value}`);
    });
  });
}
// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(function(data) {

    // Get the samples field


    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values


    var xValues = data.otu_ids;
    var yValues = data.sample_values;
    var tValues = data.otu_labels;
    var mSize = data.sample_values;
    var mClrs = data.otu_ids;

    // Build a bubble chart
    

    var trace_bubble = {
      x: xValues,
      y: yValues,
      text: tValues,
      mode: 'markers',
      marker: {
        size: mSize,
        color: mClrs
      }
    };

    var data = [trace_bubble];

    var layout = {
      xaxis: {title: "OTU ID"}
    };

    // Render the Bubble Chart
    Plotly.newPlot ('bubble', data, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var ybar = data.otu_ids;
    var xbar = data.sample_values;
    var barHover = data.otu_labels;

    var trace1 = {
      y: ybar (slice (0, 10).map (object => `OTU ${object}`)),
      x: xbar.slice (0, 10).reverse (),
      hovertext: barHover.slice (0, 10).reverse (),
      type: "bar",
      orientation: "h"
    }

    var data = [trace1];

    var layout = {
      title: "Top 10 OTUs",
      showlegend: true,
      margin: {
        l: 75,
        r: 75,
        t: 75,
        b: 75
      }
    };

    // Render the Bar Chart
    Plotly.newPlot ("plot", data, layout);
  });
};


// Function to run on page load
function init() {

  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field

    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample


// Function for event listener


  // Build charts and metadata panel each time a new sample is selected


  });
};
// Initialize the dashboard
init ();