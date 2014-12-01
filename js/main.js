function initMap() {
  var l;
  var map = L.map('map', { minZoom: 6, maxZoom: 15 }).setView([37.8922, -119.3335], 6);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //  L.tileLayer('https://a.tiles.mapbox.com/v4/erictheise.k93ep0p9/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXJpY3RoZWlzZSIsImEiOiJqanBuc3NvIn0.3n-yBu6rKZtkb19T5Bh8GQ', {
    attribution: 'Map layer &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Colorbrewer2: ten data classes, qualitative, applied to HR_NAME
  var cb_hr_name = [
    'rgb(141,211,199)',
    'rgb(255,255,179)',
    'rgb(190,186,218)',
    'rgb(251,128,114)',
    'rgb(128,177,211)',
    'rgb(253,180,98)',
    'rgb(179,222,105)',
    'rgb(252,205,229)',
    'rgb(217,217,217)',
    'rgb(188,128,189)'
  ];

  var activeAJAX = 0;

  // Notes on simplification
  //  6 -  8: 01.json w/2 decimal places
  //  9 - 10: 04.json
  // 11 - 12: 07.json
  // 13 - 14: 10.json

  activeAJAX++;
  $.ajax({
    url: 'data/AU_CA.dec.01.json',
    dataType: 'json',
    type: 'get'
  }).done(function (data) {

    console.log(data);
    l = L.geoJson(data, {
      style: function(feature) {
        var fillColor;
        switch (feature.properties.HR_NAME) {
          case 'Central Coast':     fillColor = cb_hr_name[0]; break;
          case 'Colorado River':    fillColor = cb_hr_name[1]; break;
          case 'North Coast':       fillColor = cb_hr_name[2]; break;
          case 'North Lahontan':    fillColor = cb_hr_name[3]; break;
          case 'Sacramento River':  fillColor = cb_hr_name[4]; break;
          case 'San Francisco Bay': fillColor = cb_hr_name[5]; break;
          case 'San Joaquin River': fillColor = cb_hr_name[6]; break;
          case 'South Coast':       fillColor = cb_hr_name[7]; break;
          case 'South Lahontan':    fillColor = cb_hr_name[8]; break;
          case 'Tulare Lake':       fillColor = cb_hr_name[9]; break;
        }
        return { stroke: true, color: '#111', weight: 1, opacity:0.7, fill: true, fillColor: fillColor, fillOpacity: 0.5 };
      },
      onEachFeature: function (feature, layer) {
        layer.on('mouseover mousemove', function(e) {
          layer.setStyle({ fillOpacity: 0.9 });
        });

        layer.on('mouseout', function(e) {
          l.resetStyle(e.target);
          map.closePopup();
        });

        layer.bindPopup(
          '<b>' + feature.properties.FIRST_HU_1 + '</b><br/>' +
            '(' + feature.properties.HR_NAME + ')'
        );
      }
    }).addTo(map);

    map.on('load zoomend', function () {
      console.log(map.getZoom());
    });

    if (--activeAJAX == 0) { var foo = 'bar' }
  })
}
