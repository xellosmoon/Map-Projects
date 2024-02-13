var hnhsmap = L.map('hnhsmap').setView([8.2258,124.2443], 13);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(hnhsmap);

function getColor(d) {
    return d > 100 ? '#08589e' :
           d > 90  ? '#2b8cbe' :
           d > 50  ? '#4eb3d3' :
           d > 10 ? '#7bccc4' :
           d > 10   ? '#a8ddb5' :
           d > 1   ? '#ccebc5' :
           d > 0  ? '#f0f9e8' :
                      '#FFEDA0';
}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.hnhs),
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
    hnhsmap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var info = L.control();

info.onAdd = function (hnhsmap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};


// ... our listeners
geojson = L.geoJson(statesData);

var geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(hnhsmap);

var info = L.control();

info.onAdd = function (hnhsmap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Baranggay Population</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.hnhs + ' Students in 2023'

        : 'Hover over a Baranggay');
};

info.addTo(hnhsmap);
