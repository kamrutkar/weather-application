const request = require('request')

const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=08f3734643ba3bfe0cac76357c6d27cf&query=' + latitude + ',' + longitude + '&units=f'
//console.log(url)
 // json (lower case)- automatically parse responses
 request({ url: url, json: true }, (error, response) => {
      if (error){
         callback('unable to connect to location service', undefined)
      } else if (response.body.error) {
         // console.log(response.body.error)
         callback('unable to find correct input', undefined)
      } else {
         callback(undefined , 'It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chace of rain.')
                 
   }

    
    //console.log(response.body.current)
    // You can write above line like writting below two lines by removing json: true
    //console.log(response)
    //const data = JSON.parse(response.body)
    //console.log(data.current)
 })
}

 module.exports = forecast