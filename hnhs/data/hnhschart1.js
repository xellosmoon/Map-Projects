var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  brown: 'rgb(165, 42, 42)',
  teal: 'rgb(0, 128, 128)',
  pink: 'rgb(255, 182, 193)',
  gold: 'rgb(255, 215, 0)',
  lavender: 'rgb(230, 230, 250)'
  // Add more colors as needed
};

var color = Chart.helpers.color;
var config = {
  type: 'bar',
  data: {
    datasets: [{
      type: 'line',
      backgroundColor: [
        chartColors.red,
        chartColors.blue,
        chartColors.green,
        chartColors.yellow,
        chartColors.orange,
        chartColors.purple,
        chartColors.pink
        // Add more colors here based on the number of datasets
      ],
    }]
  },
  options: {
    title: {
      display: true,
      text: 'MySQL data source HNHS'
    }
  }
};

// ...

// Fetch data from MySQL using AJAX
fetch('http://localhost/capstone2/hnhs/get_datahnhs.php')
  .then(response => response.json())
  .then(data => {
    // Update chart data with fetched data
    config.data.labels = data.map(entry => entry.name); // Update 'name' as needed

    // Calculate color keys based on available colors
    const colorKeys = Object.keys(chartColors);

    // Dynamic update of datasets based on available keys in the data
    Object.keys(data[0]).forEach((key, index) => {
      if (key !== 'name' && index > 0) {  // Skip the first data entry
        const colorKey = colorKeys[index % colorKeys.length];

        const newDataset = {
          label: key,
          data: data.map(entry => entry[key]),
          backgroundColor: color(chartColors[colorKey]).alpha(0.5).rgbString(),
          borderColor: chartColors[colorKey],
          fill: false,
          tension: 0,
          type: 'line'
        };
        config.data.datasets.push(newDataset);
      }
    });

    // Create chart after fetching data
    var ctx = document.getElementById('hnhschart1').getContext('2d');
    window.hnhschart1 = new Chart(ctx, config);
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to toggle chart type for individual datasets
function toggleChartType() {
  // Toggle the type for each dataset
  config.data.datasets.forEach(dataset => {
    dataset.type = dataset.type === 'bar' ? 'line' : 'bar';
  });

  // Destroy and recreate the chart with the updated configuration
  window.hnhschart1.destroy();
  const ctx = document.getElementById('hnhschart1').getContext('2d');
  window.hnhschart1 = new Chart(ctx, config);
}

// Function to save the chart as PNG
document.getElementById('saveAsPngBtn1').addEventListener('click', function () {
  const chartCanvas = document.getElementById('hnhschart1');
  chartCanvas.toBlob(function (blob) {
    const link = document.createElement('a');
    link.download = 'myChart.png'; // Filename for the downloaded image
    link.href = URL.createObjectURL(blob);
    link.click();
  });
});
