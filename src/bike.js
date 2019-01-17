

class Bike {
  constructor() {
    this.bikeIndexId;
    this.title;
    this.serial;
    this.manufacturer;
    this.colors;
    this.year;
    this.stolen;
    this.stolenLocation;
    this.stolenDate;
  }

  searchAPIforBikeInfo(serial, manufacturer, location, distance = 10,stolenness = 'stolen') {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&serial=${serial}&manufacturer=${manufacturer}&location=${location}&distance=${distance}&stolenness=${stolenness}&access_token=${process.env.BIKE_API}`;
      request.onload = function () {
        if (this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }

      request.open("GET", url, true);
      request.send();
    });
  }

}

export { Bike };
