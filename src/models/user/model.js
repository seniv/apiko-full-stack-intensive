const mongoose = require('mongoose');
const schema = require('./schema');
const passportLocalMongoose = require('passport-local-mongoose');

schema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

const model = mongoose.model('user', schema);

module.exports = model;