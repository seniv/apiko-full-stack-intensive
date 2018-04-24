const axios = require('axios')
const { googleApiKey } = require('../config')

const REQUEST_URL = `https://maps.googleapis.com/maps/api/geocode/json`

function geocoding (address) {
  return axios.get(REQUEST_URL, {
    params: {
      address,
      key: googleApiKey
    }
  }).then(res => res.data.results[0])
}

module.exports = geocoding