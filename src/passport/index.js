const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const local = require('./local');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, local(User)));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;