$(document).ready(function() {
   // Intialize our map
 var center = new google.maps.LatLng(47.580237, -122.382218);
 var mapOptions = {
   zoom: 15,
   center: center,
   draggable: true
 };
 
 var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  document.getElementById('dropdown').addEventListener('change', function () {
    var selectedFeature = document.getElementById('dropdown').value
 
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