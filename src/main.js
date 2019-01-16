import { Bike } from './bike.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {

  $('#submitBikeInfo').click(function(event) {
    console.log('reached.');
    event.preventDefault();
    let serial = $('#serial').val();
    let manufacturer = $('#manufacturer').val();
    let location = $('#location').val();
    let distance = parseInt($('#distance').val());
    let stolenness = $('#stolenness').val();

    let newBike = new Bike();
    let promise = newBike.searchAPIforBikeInfo(serial,manufacturer,location,distance,stolenness);


      promise.then(function (response) {
        console.log(response)
        let body = JSON.parse(response);
        $('table#apiTableOutput').text('');
        $('table#apiTableOutput').append("<tr><th>Title</th><th>Serial</th></tr>");
        body.bikes.forEach(function(bike){
          $('#apiTableOutput').append('<tr><td>'+ bike.title + '</td> <td>' + bike.serial + '</td></tr>')
          $('#apiTableOutput').append('</table>')
        });
      });
    });
});
