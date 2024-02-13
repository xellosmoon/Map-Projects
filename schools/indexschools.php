<?php require_once('../config.php') ?>
<?php require_once( ROOT_PATH . '../includes/public_functions.php') ?>
<?php require_once( ROOT_PATH . '../includes/registration_login.php') ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Elementary Schools</title>
    <link rel="stylesheet" href="../css/style2.css">


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

      <div class="graphBox">
        <div class="box">
          <h2>Map</h2>
          <div id="map"></div>
        </div>
      </div>
      <div class="graphBox">

        <div class="boxforlist">
          <div class="form-section">
            <div class="box">
              <h2>Schools</h2>
              <form class="school-form">
                <input type="text" id="search-name" placeholder="Search School Name">
                <button id="search-name-btn">Search Name</button><br>
                <input type="text" id="search-address" placeholder="Search Address">
                <button id="search-address-btn">Search Address</button>
              </form>
            </div>
          </div>
          <h2>School List</h2>

          <ul class="school-ul-list">
            <!-- Append list of schools here -->
          </ul>
        </div>
      </div>

      </div>
    </div>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>



    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
    <script src="data/data.js" charset="utf-8"></script>
    <script src="data/map.js" charset="utf-8"></script>


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
