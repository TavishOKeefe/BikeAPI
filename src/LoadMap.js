var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = process.env.GOOGLE_MAPS_API;

class LoadMap {
  constructor(){

  }

//{center: {lat: 45.5206322, lng: -122.6773577}, zoom: 8} document.getElementById('map')
  loadGoogleMap(latlong){
    GoogleMapsLoader.load(function(google) {
      return new google.maps.Map(document.getElementById('map'), {center: latlong, zoom: 8});
    });
  };

}

export {LoadMap};
