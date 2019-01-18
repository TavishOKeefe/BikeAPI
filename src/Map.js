let googleMapsClient = require('@google/maps').createClient(
  {key: process.env.GOOGLE_MAPS_API, Promise: Promise}
  );
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = process.env.GOOGLE_MAPS_API;
GoogleMapsLoader.VERSION = 'weekly';

class Map {
  constructor(){
    this.results = "";
    this.googleMapObject;
  }

  getGoogleGeocodePromise(addressInput) {
    return googleMapsClient.geocode({
      address: addressInput }
      ).asPromise()
  }

  loadGoogleMap(latlong, map){
    GoogleMapsLoader.load(function(google) {
      // map.googleMapObject = new google.maps.Map(document.getElementById('map'), {center: latlong, zoom: 11});
      return new google.maps.Map(document.getElementById('map'), {center: latlong, zoom: 11});
    });
  }

  instantiateMap(addressTestInput, map){
    this.getGoogleGeocodePromise(addressTestInput).then(function(response) {
      let body = response.json.results[0];
      map.results = response.json.results;

      return map.loadGoogleMap(body.geometry.location, map);
    });
  }



  addMarker(latLong){
    this.loadGoogleMap(function(google) {

    })
    let ilat = this.results[0].geometry.location.lat;
    let ilong = this.results[0].geometry.location.lng;
    // this.latLong = new google.maps.LatLng(ilat,ilong);
    let marker = new google.maps.Marker({position: latLong, title:"Hello World!"});
    return new google.maps.Marker({
    position: {lat: 45.5206322, long: -122.6773577},
    title:"Hello World!"
    });
  }
}

export {Map};
