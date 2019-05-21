const request = require('request')

const weather = (latitude, longitude, callback) => {
     // Weather url                         // You should enter your ApiKey
    const url = 'https://api.darksky.net/forecast/ApiKey/'+ latitude +','+ longitude +'?units=si'

    // http request             //destructuring
    request({ url, json:true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service ', undefined)
        } else if (body.error) {
            callback('Unable to find location ', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' currently temperature in the ' + 
            body.timezone + ' ' + body.currently.temperature + 
            ' degress. This high today is a' + body.daily.data[0].temperatureHigh + 
            ' with low of ' + body.daily.data[0].temperatureLow 
            + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = weather