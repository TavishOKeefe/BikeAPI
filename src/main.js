import { Bike } from './bike.js';
import { Map } from './Map.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
let myMap = new Map();


$(document).ready(function () {
  $('#mapButton').click(function () {
    let addressTestInput = '400 SW 6th Ave #800, Portland, OR 97204';
    myMap.instantiateMap(addressTestInput, myMap);
  });

  $('#dropMarker').click(function(){
    let pin = {lat: 45.5206322, lng: -122.6773577};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: pin
    });
    let latLong = new google.maps.LatLng(45.5206322,-122.6773577);
    myMap.googleMapObject = map;
    var marker = new google.maps.Marker({position: pin, title:"Hello World!"});
    marker.setMap(myMap.googleMapObject);
    // myMap.addMarker({lat: 45.5206322, long: -122.6773577}).setMap(myMap);
  });

  $('#dropMarker2').click(function(){
    console.log('dropMarker2');
    let pin = {lat: 45.5206322, lng: -122.6773577};
    var marker = new google.maps.Marker({position: pin, title:"Hello World!"});
    marker.setMap(myMap.googleMapObject);
    // myMap.addMarker({lat: 45.5206322, long: -122.6773577}).setMap(myMap);
  });


  $('#submitBikeInfo').click(function (event) {
    console.log('reached.');
    event.preventDefault();
    let serial = $('#serial').val();
    let manufacturer = $('#manufacturer').val();
    let location = $('#location').val();
    let distance = parseInt($('#distance').val());
    let stolenness = $('#stolenness').val();

    let newBike = new Bike();
    let promise = newBike.searchAPIforBikeInfo(serial, manufacturer, location, distance, stolenness);

    let bikeList = [];
    promise.then(function (response) {
      let body = JSON.parse(response);
      $('table#apiTableOutput').text('');
      $('table#apiTableOutput').append("<tr><th>Title</th><th>Serial</th><th>Stolen Location</th><</tr>");
      console.log('myMap:')
      console.log(myMap);
      console.log('----');
      let i = 1;
      body.bikes.forEach(function (bike) {
        $('#apiTableOutput').append('<tr><td class="bikeTitle">' + bike.title + '</td> <td class="bikeSerial">' + bike.serial + '</td> <td class="bikeSolenLocation">' + bike.stolen_location + '</td></tr>');
        $('#apiTableOutput').append('</table>');
        let newBikeForList = new Bike();
        newBikeForList.bikeIndexId = bike.id;
        newBikeForList.title = bike.title;
        newBikeForList.serial = bike.serial;
        newBikeForList.manufacturer = bike.manufacturer_name;
        newBikeForList.stolenDate = new Date(parseInt(bike.date_stolen) * 1000);
        newBikeForList.stolenLocation = bike.stolen_location;
        bikeList.push(newBikeForList);
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^");
        console.log('made it to bike list drop pin')
        console.log('i: ' + i);
        i++;
        setMarkers(newBikeForList);
      });
    });
    function setMarkers(bikeList) {
      console.log("in setMarkers");
      let pin = {lat: 45.5206322, lng: -122.6773577};
      var marker = new google.maps.Marker({position: pin, title:"Hello World!"});
      console.log(marker);
      console.log("-----------------");
      console.log("");
      marker.setMap(myMap.googleMapObject);
    }
  });
});
