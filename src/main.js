import { Bike } from './bike.js';
import { ApiMap } from './apiMap.js'
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { error } from 'util';


$(document).ready(function () {
  $('#mapButton').click(function () {
    let googleMapsClient = require('@google/maps').createClient({
      key: process.env.GOOGLE_MAPS_API, Promise: Promise
    });
    let geocodeResult = googleMapsClient.geocode({
      address: '400 SW 6th Ave #800, Portland, OR 97204'
    }, function (err, response) {
      if (!err) {
        console.log("geocode result:");
        console.log(geocodeResult);
      }
    });
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
      });
    });
  });
});
