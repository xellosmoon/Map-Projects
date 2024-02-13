var map = L.map('map').setView([8.2258, 124.2443], 13);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var satelliteLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Define the base map layers
var baseMaps = {
  "OpenStreetMap": osm,
  "Satellite": satelliteLayer
};

// Create a pane for labels
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';

// Add the GeoJSON layer to the map
var geojson = L.geoJson(statesData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML = '<h4>Baranggay Population</h4>' + (props ?
    '<b>' + props.name + '</b><br />' + props.pop2020 + ' people in 2020' + '</b><br />' + props.house + ' Households' :
    'Hover over a Baranggay');
};

info.addTo(map);

// Create layer control
L.control.layers(baseMaps).addTo(map);

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1000, 3000, 5000, 8000, 10000, 15000, 30000],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
};


legend.addTo(map);


function getColor(d) {
    return d > 30000 ? '#08589e' :
           d > 15000  ? '#2b8cbe' :
           d > 10000  ? '#4eb3d3' :
           d > 80000  ? '#7bccc4' :
           d > 5000   ? '#a8ddb5' :
           d > 3000   ? '#ccebc5' :
           d > 1000  ? '#f0f9e8' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.pop2020),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {

    var layer = e.target;

    info.update(layer.feature.properties);

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {

  var layer = e.target;

  info.update(layer.feature.properties);

  layer.setStyle({
      weight: 0,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }

    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// Function to handle events on each feature
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });

    // Bind tooltip with the name to each layer
    layer.bindTooltip(feature.properties.name, {
        direction: 'center',

        pane: 'labels', // Use the 'labels' pane for tooltips
        className: 'custom-tooltip',
        style: {
            background: 'none',
            border: 'none',
            boxShadow: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#000'
        }
    });
}
