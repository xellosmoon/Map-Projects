d3.csv('http://localhost/Capstone2/smc/data/smcreligiontotal.csv').then(makeChart);

function makeChart(students) {
  var name = students.map(function(d) {return d.name});
  var totaldata = students.map(function(d) {return d.total});
  var ctx = document.getElementById('chart2smc').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: name,
      datasets: [
        {
          data: totaldata,
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
