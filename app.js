sampleID = "958";

// Load JSON data.  Ths won't work with a local url, perhaps something to do with the size of the file

d3.json ('https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json').then (function (data) {

  const Names = data.names

  const selector = d3.select ('#selDataset');

  Names.forEach ((ID) => {
    selector
      .append ('option')
      .text (ID)
      .property ('value', ID)
  });

buildMetadata (sampleID);
buildCharts (sampleID);

});

function buildMetadata (ID) {

  d3.json ('https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json').then (function (data) {

    const Metadata = data.metadata;

    // Filter Metadata for the Metadata with the desired id

    var filteredMetadata = Metadata.filter (object => object.id == ID);

    // Get the only item in the filteredMeatadata array, which is the dictionary with the desired id

    var filteredMetadataDictionary = filteredMetadata [0];

    const panel = d3.select ('#sample-metadata');

    panel.html ('');

    Object.entries (filteredMetadataDictionary).forEach (([key, value]) => {
      panel
        .append ('h6')
        .text (`${key.toUpperCase()}: ${value}`);
    });

  });

};

function buildCharts (ID) {

  d3.json ('https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json').then (function (data) {

    const Samples = data.samples;

    var filteredSamples = Samples.filter (object => object.id == ID);

    var filteredSamplesDictionary = filteredSamples [0];

    // Get the first ten sample_values, otu_ids and otu_labels from filteredSamplesDictionary

    var Sample_Values = filteredSamplesDictionary.sample_values.slice (0, 10);
    var Otu_Ids = filteredSamplesDictionary.otu_ids.slice (0, 10);
    var Otu_Labels = filteredSamplesDictionary.otu_labels.slice (0, 10);

    // Assign Sample_Values to the x-axis, Otu_Ids to the y-axis
    
    var barData = [{
      x: Sample_Values.reverse (),
      y: Otu_Ids.map (object => `OTU ${object}`).reverse (),
      type: 'bar',
      marker: {color: 'blue'},
      orientation: 'h'
    }];

    // Display text

    var barLayout = {
      title: `Top 10 Bacteria Cultures Found for Sample ${ID}`,
      xaxis: {title: 'SAMPLE VALUES'},
      yaxis: {title: 'OTU IDS'}
    };

    // Use plotly to produce a bar chart

    Plotly.newPlot ('bar-chart', barData, barLayout);

    // Do similar for the bubble chart

    var bubbleData = [{
      x: Otu_Ids,
      y: Sample_Values,
      text: Otu_Labels,
      mode: 'markers+text',
      marker: {size: Sample_Values,
               color: Otu_Ids} 
    }];

    var bubbleLayout = {
      title: `Top 10 Bacteria Cultures Found for Sample ${ID}`,
      xaxis: {title: 'OTU IDS'},
      yaxis: {title: 'SAMPLE VALUES'}
    };

    //Use plotly to produce a bubble chart

    Plotly.newPlot ('bubble-chart', bubbleData, bubbleLayout);

  });

};