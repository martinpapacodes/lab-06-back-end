'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const app = express();



require('dotenv').config();

app.use(cors());


function Location(query, formattedQuery, latitude, longtitude) {
  this.query = query,
  this.formattedQuery = formattedQuery,
  this.latitude = latitude,
  this.longtitude = longtitude
};


app.get('/location', (req, res) => {

  // const location = new Location
  // require does NOT take 1 million years
  const geoData = require('./data/geo.json');
  const query = geoData.results[0].address_components[0].long_name;
  const formattedQuery = geoData.results[0].formatted_address;
  const lat = geoData.results[0].geometry.location.lat;
  const long = geoData.results[0].geometry.location.lng;

  const newLocation = new Location(query, formattedQuery, lat, long);


  res.send(newLocation);

  res.send(` {
    'search_query': ${query},
    'formatted_query': ${formattedQuery},
    'latitude': ${lat},
    'longitude': ${long}
  }`);


});


app.listen(PORT, () => {
  console.log('SERVER IS RUNNING ON PORT ', PORT);
});

// app.get('/unicorn', handleUnicornRequest);
// app.listen(PORT, () => {
//   console.log(`app is up on PORT: ${PORT}`);
// });
// function handleUnicornRequest(request, response){
//   const unicorn = new Unicorn();
//   response.send({unicorn: unicorn});
// }
// function Unicorn(){
//   this.legs = 3 + Math.round(Math.random());
//   this.magical = true;
//   this.children = [{horns : 1}];
// }