$(document).ready(function() {
    // Intialize our map
  var center = new google.maps.LatLng(47.6475338, -122.3497474);
  var mapOptions = {
    zoom: 15,
    center: center,
    draggable: false
  };
  
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
  $.ajax({
    url: "https://data.seattle.gov/resource/4xy5-26gy.json",
    method: "GET",
    datatype: "json",
    data: {
        "$order" : "fremont_bridge_nb DESC, fremont_bridge_sb DESC",
      "$where" : "fremont_bridge_nb IS NOT NULL AND fremont_bridge_sb IS NOT NULL",
      "$limit" : 1,
      "$$app_token" : "Y79BdJhSUWsv9mJb3sYCZzESP"
    }
  }).done(function(data) {
    // Construct a flyout
    var content = '<div class="flyout">' + '<ul>' 
        + '<li><em>Date:</em> ' + data[0].date + '</li>' 
        + '<li><em>Northbound:</em> ' + data[0].fremont_bridge_nb + '</li>' 
        + '<li><em>Southbound:</em> ' + data[0].fremont_bridge_sb + '</li>' 
        + '</ul>' + '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: content
    });

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(47.6475338, -122.3497474),
      map: map,
      title: "Fremont Bridge"
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
        });
  });
});