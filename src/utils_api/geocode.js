const request = require('request')


const geocode = (address, callback) => {
     // Geocode url             // You should enter your ApiKey
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    + encodeURIComponent(address) + '&key=ApiKey'

    // http request             //destructuring
    request({ url, json: true}, (err, { body })=>{
        if (err) {
            callback('Unable to connect to location service ', undefined)
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find address ', undefined)
        } else {
            callback(undefined, {
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng,
                location: body.results[0].formatted_address
            })
        }
    })
}

module.exports = geocode