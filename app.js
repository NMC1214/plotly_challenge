function demobox(sample) {
    var names;
    var metadata;
    var samples;

    // Fetch the JSON data and console log it
    d3.json("samples.json").then(function (data) {
        console.log(data.names);
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        var dropdownMenu = d3.select("#selDataset");

        names.forEach(element => dropdownMenu.append("option").text(element).property("value", element));

        var boxinfo = d3.select('#sample-metadata');

        Object.keys(metadata).forEach(key => {
            console.log(key, metadata[key]);
            boxinfo.append("h6").text(`${key}: ${metadata[key]}`);
        });


    });
}

function charts(sample) {
    console.log(sample)
    d3.json("samples.json").then(data => {

        var samplesdata = data.samples;
        console.log(samplesdata);

        var samplearray = samplesdata.filter(element => element.id == sample);
        var firstid = samplearray[0];

        var otu_ids = firstid.otu_ids;
        var out_labels = firstid.otu_labels;
        var sample_values = firstid.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => 'OTU ${otuID}')
        var bargraphdata = [
            {
                y: yticks,
                x: sample_values.slice(0, 10),
                text: out_labels.slice(0, 10),
                type: "bar",
                orientation: "h"
            }
        ]

        Plotly.newPlot("bar", bargraphdata)

        console.log(firstid);

        var bubblelayout = {
            title: "Bateria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID" }
        };

            var bubbledata = [
                {
                    x: otu_ids,
                    y: sample_values,
                    text: out_labels,
                    mode: "markers",
                    marker: {
                        size: sample_values,
                        color: otu_ids,
                        colors: "Earth"
                    }
                }
            ];
        Plotly.newPlot("bubble", bubbledata, bubblelayout);
        })
}

function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then(data => {
        var sampleids = data.names;
        sampleids.forEach(sample => {
            dropdown.append("option").text(sample).property("value", sample);
        })

        var firstone = sampleids[0]
        
        var boxinfo = d3.select('#sample-metadata');

        Object.keys(metadata).forEach(key => {
            console.log(key, metadata[key]);
            boxinfo.append("h6").text(`${key}: ${metadata[key]}`);
        });
    })


    demobox(firstone);
    charts(firstone);
}

function optionChanged(newsample) {
    demobox(newsample);
    charts(newsample);
}

init();
