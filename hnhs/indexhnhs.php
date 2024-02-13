<?php require_once('../config.php') ?>
<?php require_once( ROOT_PATH . '/includes/public_functions.php') ?>
<?php require_once( ROOT_PATH . '/includes/registration_login.php') ?>


<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>HNHS Data</title>
    <link rel="stylesheet" href="../css/style.css">


    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""/>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""></script>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datasource@0.1.0"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js" charset="utf-8"></script>



  </head>
  <body>

    <div class="container">

      <!-- Navigation Start -->
      <?php include('../includes/navigation.php'); ?>
      <!-- Navigation End -->

      <!-- main -->
      <div class="main">
      <!-- topbar Start -->
        <?php include('../includes/topbar.php') ?>
      <!-- topbar End -->

      <!-- cardbox start -->
        <?php include('../hnhs/includes/cardboxhnhs.php') ?>

      <!-- cardbox end -->

        <!-- Charts 1st floor start -->
        <?php include('../hnhs/includes/hnhschartsfloor1.php') ?>
        <!-- Charts 1st floor end -->

        <!-- Charts 2st floor start -->
        <?php include('../hnhs/includes/hnhschartsfloor2.php') ?>
        <!-- Charts 2st floor end -->

      </div>
    </div>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>



    <script src="../hnhs/data/hnhschart1.js" charset="utf-8"></script>
    <script src="../hnhs/data/hnhschart2.js" charset="utf-8"></script>
    <script src="../hnhs/data/hnhschart3.js" charset="utf-8"></script>

    <script src="../hnhs/data/iliganmap.js" charset="utf-8"></script>
    <script src="../hnhs/data/hnhsmap.js" charset="utf-8"></script>



    <script>
      // MenuToggle
      let toggle = document.querySelector('.toggle');
      let navigation = document.querySelector('.navigation');
      let main = document.querySelector('.main');

      toggle.onclick = function(){
        navigation.classList.toggle('active');
        main.classList.toggle('active');
      }

      // add hovered class in selected list item
      let list = document.querySelectorAll('.navigation li');
      function activeLink(){
        list.forEach((item) =>
        item.classList.remove('hovered'));
        this.classList.add('hovered');
      }
      list.forEach((item) =>
      item.addEventListener('mouseover', activeLink));
    </script>

    <script>
      fetch('http://localhost/capstone2/hnhs/data/cardbox.csv')
        .then(response => response.text())
        .then(csvData => {
          const rows = csvData.split('\n');
          const targetRow = 1; // Row 2 in CSV (index 1) corresponds to B2 and C2 cells

          // Total Population
          const populationValue = rows[targetRow].split(',')[2]; // Column C (index 2) corresponds to C2 cell
          document.getElementById('populationNumber').textContent = populationValue;

          // Total Male Population
          const maleValue = rows[targetRow].split(',')[1]; // Column B (index 1) corresponds to B2 cell
          document.getElementById('maleNumber').textContent = maleValue;

          // Total Female Population
          const femaleValue = rows[targetRow + 1].split(',')[1]; // Column B (index 1) corresponds to B3 cell
          document.getElementById('femaleNumber').textContent = femaleValue;
        })
        .catch(error => {
          console.error('Error fetching or parsing CSV data:', error);
        });
    </script>

  </body>
</html>
