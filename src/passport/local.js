const { Unauthorized } = require('rest-api-errors');

const local = User => (username, password, done) => {
  User.findOne({ email: username })
    .then(user => {
      if(!user) {
        return done(new Unauthorized(401, 'Incorrect username or password'), false);
      }
      
      return user.authenticate(password, (err, userData) => {
        if(!userData) {
          return done(new Unauthorized(401, 'Incorrect username or password'), false);
        }
        return done(null, user);
      });
    })
    .catch(done);
};

module.exports = local;