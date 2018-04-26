const mongoose = require('mongoose')
const schema = require('./schema')

const model = mongoose.model('answer', schema)

module.exports = model