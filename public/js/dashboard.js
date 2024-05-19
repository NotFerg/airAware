$(function () {
  google.charts.load('current', { 'packages': ['gauge'] });

  $("#datepicker").datepicker({
    onSelect: function (dateText) {
      const selectedDate = new Date(dateText);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      // Fetch data for the selected date
      $.ajax({
        url: '/fetch-data',
        method: 'GET',
        data: { date: formattedDate },
        success: function (data) {
          if (data.length > 0) {
            google.charts.setOnLoadCallback(() => drawGauges(data[0]));
          } else {
            console.log('No data available for the selected date.');
          }
        },
        error: function (error) {
          console.error('Error fetching data:', error);
        }
      });
    }
  });

  function drawGauges(data) {
    // Data for gauges
    var temperatureData = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Temperature', parseFloat(data.field1)]
    ]);

    var humidityData = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Humidity', parseFloat(data.field2)]
    ]);

    var airQualityData = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Air Quality', parseFloat(data.field3)]
    ]);

    var windSpeedData = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Wind Speed',parseFloat(data.field4)]
    ]);

    var pm1Data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['PM 1.0', parseFloat(data.field6)]
    ]);

    var pm25Data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['PM 2.5', parseFloat(data.field7)]
    ]);

    var pm100Data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['PM 100', parseFloat(data.field8)]
    ]);

    // Options for each gauge
    var temperatureOptions = {
      width: 400, height: 150,
      redFrom: 40, redTo: 50,
      yellowFrom: 30, yellowTo: 40,
      minorTicks: 5, max: 50
    };

    var humidityOptions = {
      width: 400, height: 150,
      redFrom: 90, redTo: 100,
      yellowFrom: 85, yellowTo: 90,
      minorTicks: 5
    };

    var airQualityOptions = {
      width: 400, height: 150,
      redFrom: 100, redTo: 150,
      yellowFrom: 51, yellowTo: 100,
      minorTicks: 5, max: 150
    };

    var windSpeedOptions = {
      width: 400, height: 150,
      redFrom: 40, redTo: 50,
      yellowFrom: 21, yellowTo: 40,
      minorTicks: 5, max: 50
    };

    var pm1Options = {
      width: 400, height: 150,
      redFrom: 20, redTo: 30,
      yellowFrom: 11, yellowTo: 20,
      minorTicks: 5, max: 30
    };

    var pm25Options = {
      width: 400, height: 150,
      redFrom: 55, redTo: 70,
      yellowFrom: 36, yellowTo: 55,
      minorTicks: 5, max: 70
    };

    var pm100Options = {
      width: 400, height: 150,
      redFrom: 100, redTo: 150,
      yellowFrom: 51, yellowTo: 100,
      minorTicks: 5 ,max: 150
    };

    // Draw the gauge
    var temperatureChart = new google.visualization.Gauge(document.getElementById('temperature-gauge'));
      temperatureChart.draw(temperatureData, temperatureOptions);

      var humidityChart = new google.visualization.Gauge(document.getElementById('humidity-gauge'));
      humidityChart.draw(humidityData, humidityOptions);

      var airQualityChart = new google.visualization.Gauge(document.getElementById('air-quality-gauge'));
      airQualityChart.draw(airQualityData, airQualityOptions);

      var windSpeedChart = new google.visualization.Gauge(document.getElementById('wind-speed-gauge'));
      windSpeedChart.draw(windSpeedData, windSpeedOptions);

      var pm1Chart = new google.visualization.Gauge(document.getElementById('pm1-gauge'));
      pm1Chart.draw(pm1Data, pm1Options);

      var pm25Chart = new google.visualization.Gauge(document.getElementById('pm2.5-gauge'));
      pm25Chart.draw(pm25Data, pm25Options);

      var pm10Chart = new google.visualization.Gauge(document.getElementById('pm10-gauge'));
      pm10Chart.draw(pm100Data, pm100Options);
  }
});