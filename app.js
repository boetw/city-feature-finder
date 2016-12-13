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

  document.getElementById('dropdown').addEventListener('change', function() {
    var marker;
    var selectedFeature = document.getElementById('dropdown').value
    if (selectedFeature === "clear") {
      selected.forEach(function (item) {
        document.getElementById(item).removeAttribute("style");
        document.getElementById(item).disabled=false;
      }
        );
      selected = [];
    for (var i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
        markers = [];
      
    } else {
      document.getElementById(selectedFeature).style.background="lightgray";
      document.getElementById(selectedFeature).disabled=true;
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
          var content = '<div class="flyout">' + '<ul>' + '<li><em>Name:</em> ' + data[i].common_name + '</li>' + '<li><em><a href="' + data[i].website + '" target="_blank">Website</a></em></li>' + '<li><em>Address:</em> ' + data[i].address + '</li>' + '</ul>' + '</div>';
          var infowindow = new google.maps.InfoWindow({
            content: content
          });
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
            map: map,
            title: data[i].city_feature,
            animation: google.maps.Animation.DROP,
          });
          markersArray.push(marker);
        }

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      });
    };
  });
});