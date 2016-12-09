$(document).ready(function() {
   // Intialize our map
 var center = new google.maps.LatLng(47.580237, -122.382218);
 var mapOptions = {
   zoom: 15,
   center: center,
   draggable: false
 };
 
 var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
 $.ajax({
   url: "https://data.seattle.gov/resource/3c4b-gdxv.json",
   method: "GET",
   datatype: "json",
   data: {
      "city_feature" : "Parks"
   }
 }).done(function(data) {
   // Construct a flyout
   console.log(data.length);
   var content = '<div class="flyout">' + '<ul>' 
       + '<li><em>Name:</em> ' + data[0].common_name + '</li>' 
       + '<li><em>Website:</em> ' + data[0].website + '</li>' 
       + '<li><em>Address:</em> ' + data[0].address + '</li>' 
       + '</ul>' + '</div>';

   var infowindow = new google.maps.InfoWindow({
     content: content
   });
   // var dataObj = JSON.parse(data);
   // console.log(dataObj);
   var marker = new google.maps.Marker({
     position: new google.maps.LatLng(data[0].latitude, data[0].longitude),
     map: map,
     title: "Fremont Bridge"
   });
   
   google.maps.event.addListener(marker, 'click', function() {
       infowindow.open(map, marker);
       });
 });
});