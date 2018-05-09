const mongoose = require('mongoose');
const schema = require('./schema');

const model = mongoose.model('question', schema);

module.exports = model;