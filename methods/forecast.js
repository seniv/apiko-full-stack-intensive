const axios = require('axios')
const { darkSkyKey } = require('../config')

const REQUEST_URL = `https://api.darksky.net/forecast/${darkSkyKey}`

function forecast (lat, lng, units) {
  return axios.get(`${REQUEST_URL}/${lat},${lng}`, {
    params: {
      units
    }
  }).then(res => res.data)
}

module.exports = forecast