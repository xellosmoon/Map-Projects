let map;
let markersLayer = L.layerGroup(); // Create a layer group for markers
let markerControl;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success);
}

function success(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;

  map = L.map('map', { center: [lat, lng], zoom: 5 });
  let layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
  layer.addTo(map);

  let iconOption = {
    iconUrl: '../images/school-outline.svg',
    iconSize: [40, 40],
  }
  let icon = L.icon(iconOption);

  function runForEachFeature(feature, layer) {
    layer.bindPopup(customPopup(feature))
  }

  let schoolLayer = L.geoJSON(schoolList, {
    onEachFeature: runForEachFeature,
    pointToLayer: function (feature, latlng) {
      let marker = L.marker(latlng, { icon: icon });
      markersLayer.addLayer(marker); // Add marker to the markers layer group
      return marker;
    }
  });

  schoolLayer.addTo(map);

  // Create marker control
  markerControl = L.control.layers(null, { 'Elementary Schools': markersLayer }).addTo(map);
}

function customPopup(school) {
  return `<div>
    <h4>${school.properties.name}</h4>
    <p>${school.properties.address}</p>
  </div>`;
}

function customPopup(school) {
  return `<div>
    <h4>${school.properties.name}</h4>
    <p>${school.properties.address}</p>
  </div>`;
}

function generateschoolList() {
  let ul = document.querySelector('.school-ul-list');

  // Clear existing content in the ul element
  ul.innerHTML = '';

  schoolList[0].features.forEach(function (school) {
    let li = document.createElement('li');
    let div = document.createElement('div');
    div.classList.add('school-item');
    let nameLink = document.createElement('a');
    let addressPara = document.createElement('p');

    // Check if the school object has properties and a name
    if (school.properties && school.properties.name) {
      nameLink.innerText = school.properties.name;
      nameLink.href = '#';
      nameLink.addEventListener('click', ()=>{
        flyToSchool(school);
      })

      addressPara.innerText = school.properties.address;

      div.appendChild(nameLink);
      div.appendChild(addressPara);
      li.appendChild(div);
      ul.appendChild(li);
    }
  });
}

// Call the function to generate the school list
generateschoolList();

function flyToSchool(school){
  let lat = school.geometry.coordinates[0];
  let lng = school.geometry.coordinates[1];
  map.flyTo([lng,lat], 17)
}
//Search
document.addEventListener('DOMContentLoaded', function() {
  function searchByName() {
        event.preventDefault();
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search-name');
  filter = input.value.toUpperCase();
  ul = document.querySelector('.school-ul-list');
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('a')[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

function searchByAddress() {

      event.preventDefault();
  let input, filter, ul, li, p, i, txtValue;
  input = document.getElementById('search-address');
  filter = input.value.toUpperCase();
  ul = document.querySelector('.school-ul-list');
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    p = li[i].getElementsByTagName('p')[0];
    txtValue = p.textContent || p.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

document.getElementById('search-name-btn').addEventListener('click', searchByName);
document.getElementById('search-address-btn').addEventListener('click', searchByAddress);

});
