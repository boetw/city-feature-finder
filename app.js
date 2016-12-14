$(document).ready(function() {
  // Intialize our map
  var center = new google.maps.LatLng(47.607417, -122.335864);
  var mapOptions = {
    zoom: 16,
    center: center,
    draggable: true
  };
  var markersArray = [];
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var selected = [];
  var paths = document.querySelectorAll('.selectPlace');

  for (var i = 0; i < paths.length; i++) {
    paths[i].addEventListener('click', function(e) {
      mapPlacer(e);
    });
  };

  function mapPlacer(e) {
    var marker;
    var elem = e.target;
    var selectedFeature = elem.id;
    console.log("selectedFeature " + selectedFeature+elem.style.background);
    if (elem.style.background === "red") {
      console.dir(markersArray);
      for(var i = 0; i < markersArray.length; i++){
        console.dir(markersArray[i].visible);
        if( selectedFeature === markersArray[i].type){
          markersArray[i].visible = false;
          markersArray[i].setMap(map);
        }
      };
      document.getElementById(selectedFeature).removeAttribute("style");
    }
    else if (selectedFeature === "clear") {
      selected.forEach(function(selectedFeature) {
        document.getElementById(selectedFeature).removeAttribute("style");
        document.getElementById(selectedFeature).disabled = false;
      });
      selected = [];
      for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
      }
      markers = [];
    }
    else {
      document.getElementById(selectedFeature).style.background = "red";
      document.getElementById(selectedFeature).disabled = true;
      selected.push(selectedFeature);
      $.ajax({
        url: "https://data.seattle.gov/resource/3c4b-gdxv.json",
        method: "GET",
        datatype: "json",
        data: {
          "city_feature": selectedFeature
        }
      }).done(function(data) {
        // Construct a flyout
        for (var i = 0; i < data.length; i++) {
          var content = '<div class="flyout">' + '<ul>' + '<li><em>Name:</em> ' + data[i].common_name + '</li>' + '<li><em>Name:</em> ' + data[i].city_feature + '</li>' + '<li><em><a href="' + data[i].website + '" target="_blank">Website</a></em></li>' + '<li><em>Address:</em> ' + data[i].address + '</li>' + '</ul>' + '</div>';
          var infowindow = new google.maps.InfoWindow({
            content: content
          });
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
            map: map,
            title: data[i].common_name + " " + data[i].city_feature,
            animation: google.maps.Animation.DROP,
            type: data[i].city_feature,
            visible: true
          });
          markersArray.push(marker);
        }
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      });
    };
  };
});