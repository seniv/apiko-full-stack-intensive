const mongoose = require('mongoose')
const schema = require('./schema')

const model = mongoose.model('vote', schema)

module.exports = model