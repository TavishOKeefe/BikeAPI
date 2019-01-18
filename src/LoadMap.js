var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = process.env.GOOGLE_MAPS_API;

class LoadMap {
  constructor(){

  }

  loadGoogleMap(latlong){
    GoogleMapsLoader.load(function(google) {
      return new google.maps.Map(document.getElementById('map'), {center: latlong, zoom: 11});
    });
  };

}

export {LoadMap};
