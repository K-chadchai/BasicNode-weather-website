const request = require('request')

const temp = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5782fb9d97ff751a659d5e3fb7afb3b9&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lng)

    request({url: url, json: true}, (error,response) => {
        if (error) {
            callback("Can't connect service. !!",undefined)
        } else if (response.body.error) {
            callback('Unable to find',undefined)
        } else {
            callback(undefined,{
                temperature: "It is currently " + response.body.current.temperature + " degrees out."
            })
        }
    })
}

module.exports = temp