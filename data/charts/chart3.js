d3.csv('http://localhost/capstone2/data/avgyear.csv').then(makeChart);

function makeChart(players) {
  var playerLabels = players.map(function(d) {return d.Year});
  var weeksData = players.map(function(d) {return d.Growthrate2});
  var ctx = document.getElementById('chart3').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: playerLabels,
      datasets: [
        {
          data: weeksData,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(127, 17, 224)',
            'rgb(110, 143, 143)',
            'rgb(17, 33, 116)',
            'rgb(39, 107, 1)',
            'rgb(130, 60, 12)',
            'rgb(19, 175, 163)'


          ],
            hoverOffset: 4,
            borderWidth: 5,
            borderRadius: 10,
            hoverborderwidth: 0,
        }
      ]
    },
    options: {
      //maintainAspectRation: false
      aspectRatio: 1
    },
  });
}
