const request = require('request')

const geocode = (address , callback ) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia29tYWwxIiwiYSI6ImNrc3BqNjJ5czAybGcyd28zemRxbWU2OXgifQ._1bbQJ6aw0MJIIIPM_7j4w&limit=1'
   // console.log('geocode ', url)
    request({ url: url, json: true }, (error, response) => {
        //console.log('geocde ', response.body)
       if (error) {
          callback('unable to connect to locationservices!', undefined)
       } else if (response.body.features.lenght === 0){
          callback('unable to find location', undefined)
       } else {
           callback(undefined, {
               latitude: response.body.features[0].center[1],
               longitude: response.body.features[0].center[0],
               location: response.body.features[0].place_name

           })
         // console.log('latitude is ' + response.body.features[0].center[1] + ' and longitude is ' + response.body.features[0].center[0] + 'location is ' + response.body.features[0].place_name)

      
      
        }
    })
 }
 
 module.exports = geocode