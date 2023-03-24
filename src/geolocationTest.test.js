const geocode = require('./utils/geocode')

test('test geolocation', () => {
    function callback(error, data){
        if (error){
            throw error
        }
   
    expect (data).toBe(latitude, longitude, location)
}
geocode(callback)
})