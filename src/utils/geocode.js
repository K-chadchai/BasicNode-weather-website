const request = require('request')

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYm9zc3dpenoiLCJhIjoiY2s5emdyamltMDlxOTNqbHQ1YXJiNzFscCJ9.SZ-KUjFi1ousHHB_q-pNhQ&limit=1' // use encodeURL becuz if input ? it will translate to string ? -> %3F

    request({url: url , json: true}, (error,response) => {
        if (error) {
            callback('Unable to connect to location..', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else if (response.body.query.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitute: response.body.features[0].bbox[1],
                longitute: response.body.features[0].bbox[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode