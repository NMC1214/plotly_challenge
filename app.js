function demobox(sample) {
    // Fetch the JSON data and console log it
    d3.json("samples.json").then(data => {
        var metadata = data.metadata;
        var metaarray = metadata.filter(metaElement => metaElement.id == sample)

        var demoresult = metaarray[0]

        var boxinfo = d3.select('#sample-metadata');
        boxinfo.html("");

        Object.entries(demoresult).forEach(([key, value]) => {
            console.log(key, value);
            boxinfo.append("h6").text(`${key}: ${value}`);
        });


    });
}

function charts(sample) {
    // console.log(sample)
    d3.json("samples.json").then(data => {

        var samplesdata = data.samples;
        // console.log(samplesdata);

        var samplearray = samplesdata.filter(element => element.id == sample)
        var firstid = samplearray[0]

        var otu_ids = firstid.otu_ids;
        var otu_labels = firstid.otu_labels;
        var sample_values = firstid.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()
        var bargraphdata = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ]

        Plotly.newPlot("bar", bargraphdata)

        // console.log(firstid);

        var bubblelayout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID" }
        };

            var bubbledata = [
                {
                    x: otu_ids,
                    y: sample_values,
                    text: otu_labels,
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

        demobox(demoresult);
        charts(firstone);
    })



}

function optionChanged(newsample) {
    demobox(newsample);
    charts(newsample);
}

init();
