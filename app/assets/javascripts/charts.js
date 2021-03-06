$(document).ready(function() {
    // Make the date fields datepickers and set their default values
    $("#start_date").datepicker();
    $("#end_date").datepicker();
    $("#start_date").datepicker('setDate', '-30');
    $("#end_date").datepicker('setDate', '0');

    //
    // Select the data matching from the chart-data div and apply it to the chart itself
    var redrawChart = function(foundData) {
        $('#chart').remove();
        $('#chart-container').append('<div id=chart>');

        // Set up the chart
        var chart = new Morris.Line({
            // ID of the element in which to draw the chart.
            element: 'chart',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: foundData,
            // The name of the data record attribute that contains x-values.
            xkey: 'created_at',
            // A list of names of data record attributes that contain y-values.
            ykeys: ['property_1', 'property_2'],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels: ['property 1', 'property 2'],
            xLabelFormat: function(d) {
                var curr_date = d.getDate();
                var curr_month = d.getMonth() + 1;
                var curr_year = d.getFullYear();
                return (curr_month + "-" + curr_date + "-" + curr_year)
            },
            xLabelAngle: 45
        });
    };

    var redrawGrid = function(foundData) {
        // Recreate the Grid with the updated data
        $('#gridTable').remove();
        $('#grid').append("<table class='table table-striped' id='gridTable'>");
        $('#gridTable').append("<tr><th>Date</th><th>Property 1</th><th>Property 2</th></tr>");
        for (var el in foundData) {
            $('#gridTable').append("<tr>" +
                "<td>" + foundData[el].created_at + "</td>" +
                "<td>" + foundData[el].property_1 + "</td>" +
                "<td>" + foundData[el].property_2 + "</td>" + "</tr>")
        }
    };

    var redraw = function() {
        var start_date  = $('#start_date').val();
        var end_date    = $('#end_date').val();
        var event_name  = $('#event_names').val();
        var domain_name = $('#domain_names').val();

        var foundData = [];
        var chartData = $('#chart-data').data('events');

        for (i = 0; i < chartData.length; i++) {
            if(chartData[i].event_name === event_name &&
                chartData[i].domain_name === domain_name &&
                dates.inRange(dates.convert(chartData[i].created_at), dates.convert(start_date), dates.convert(end_date))) {
                foundData.push({
                    "created_at": chartData[i].created_at,
                    "property_1": chartData[i].property_1,
                    "property_2": chartData[i].property_2
                });
            }
        }

        redrawChart(foundData);
        redrawGrid(foundData);
    };

    // Set up event handlers for the search fields
    $('#start_date').on("change", function() {redraw()});
    $('#end_date').on("change", function() {redraw()});
    $('#event_names').on("change", function() {redraw()});
    $('#domain_names').on("change", function() {redraw()});

    // Draw the grid and chart when the page loads
    redraw();
});
