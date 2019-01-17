let googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API, Promise: Promise
});

class ApiMap {
  constructor(){
  }

  getGoogleGeocodePromise(addressInput) {
    return googleMapsClient.geocode({
      address: addressInput }, function (err, response) {
        if (err) {
          console.log(err);
        }
      }).asPromise()
  }

  initMap() {
    var map = new google.maps.Map(
      document.getElementById('#map'), { zoom: 4, center: { lat: -34.397, lng: 150.644 } });
  }
}

export {ApiMap};
