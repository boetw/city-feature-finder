var map;

  // Intialize our map
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 47.6079494, lng: -122.3354707},
          zoom: 16
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

 

      
$(document).ready(function() {

    
    document.getElementById('dropdown').addEventListener('change', function() {
        
    var selectedFeature = document.getElementById('dropdown').value;

    $.ajax({
        url: "https://data.seattle.gov/resource/3c4b-gdxv.json",
        method: "GET",
        datatype: "json",
        data: {
          "city_feature": selectedFeature
        }
      }).done(function(data) {
        // Construct a flyout
        console.log(data.length);
        for (var i = 0; i < data.length; i++) {
          var content = '<div class="flyout">' + '<ul>' + '<li><em>Name:</em> ' + data[i].common_name + '</li>' + '<li><em><a href="' + data[i].website + '" target="_blank">Website</a></em></li>' + '<li><em>Address:</em> ' + data[i].address + '</li>' + '</ul>' + '</div>';
          var infowindow = new google.maps.InfoWindow({
            content: content
          });
          console.log(data[i].common_name);
          // var dataObj = JSON.parse(data);
          // console.log(dataObj);
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
            map: map,
            title: data[i].common_name
          });
        }
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
        });
    });
});