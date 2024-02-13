<?php require_once('../config.php') ?>
<?php require_once( ROOT_PATH . '/includes/public_functions.php') ?>
<?php require_once( ROOT_PATH . '/includes/registration_login.php') ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>SMC Religion Data</title>
    <link rel="stylesheet" href="../css/style.css">


    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""/>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""></script>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datasource@0.1.11"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js" charset="utf-8"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>

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
        <?php include('../smc/includes/cardboxSMC.php') ?>

      <!-- cardbox end -->

        <!-- Charts 1st floor start -->
        <?php include('../smc/includes/chartsfloor1smcreligion.php') ?>
        <!-- Charts 1st floor end -->

        <!-- Charts 2st floor start -->
        <?php include('../smc/includes/chartsfloor2smcreligion.php') ?>
        <!-- Charts 2st floor end -->


      </div>
    </div>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>


    <script src="./data/chart1smcreligion.js" charset="utf-8"></script>
    <script src="./data/chart2smcreligion.js" charset="utf-8"></script>

    <script src="./data/mapsmcdata.js" charset="utf-8"></script>
    <script src="./data/mapsmcreligion.js" charset="utf-8"></script>



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



  </body>
</html>
