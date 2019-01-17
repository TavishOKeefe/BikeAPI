let googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API, Promise: Promise
});

class ApiMap {
  constructor(){

  }

  getGoogleGeocodePromise(addressInput) {
    // addressInput '400 SW 6th Ave #800, Portland, OR 97204'
    return googleMapsClient.geocode({
      address: addressInput
    }).asPromise()
  }

  initMap() {
    var map = new google.maps.Map(
      document.getElementById('#map'), { zoom: 4, center: { lat: -34.397, lng: 150.644 } });
  }
}

export {ApiMap};
