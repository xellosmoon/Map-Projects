var chartColors = {
  red: 'rgb(255, 99, 132)',
  blue: 'rgb(54, 162, 235)',
  green: 'rgb(75, 192, 192)',
  yellow: 'rgb(255, 205, 86)',
  orange: 'rgb(255, 159, 64)',
  purple: 'rgb(153, 102, 255)',
  pink: 'rgb(255, 182, 193)'
  // Add more colors as needed
};

var color = Chart.helpers.color;
var config = {
  type: 'bar',
  data: {
    datasets: []
  },
  options: {
    title: {
      display: true,
      text: 'Data Source SMC'
    }
  }
};

// Fetch data from CSV using AJAX
fetch('http://localhost/Capstone2/smc/data/smcreligion.csv')
  .then(response => response.text())
  .then(csvData => {
    // Parse CSV data
    const parsedData = Papa.parse(csvData, { header: true });
    const data = parsedData.data;

    // Update chart data with fetched data
    config.data.labels = data.map(entry => entry.name); // Update 'name' as needed

    // Calculate color keys based on available colors
    const colorKeys = Object.keys(chartColors);

    // Dynamic update of datasets based on available keys in the data
    Object.keys(data[0]).forEach((key, index) => {
      if (key !== 'name') {
        const colorKey = colorKeys[index % colorKeys.length];

        const newDataset = {
          label: key,
          data: data.map(entry => parseFloat(entry[key])), // Parse data as float if needed
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
    var ctx = document.getElementById('chart1smcreligion').getContext('2d');
    window.chart1smcreligion = new Chart(ctx, config);
  })
  .catch(error => console.error('Error fetching data:', error));
