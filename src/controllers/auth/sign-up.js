const { NotAcceptable } = require('rest-api-errors');
const { PASSWORD } = require('../../utils/regexes');

const signUp = ({ User }) => (req, res, next) => {
  const { email, password, profile, username } = req.body;

  if (!PASSWORD.test(password)) {
    return next(new NotAcceptable(406, 'Password is in wrong format.'));
  }

  const user = new User({
    email: email,
    profile,
    username,
  });

  User.register(user, password, (err, user) => {
    if (err) {
      return next(err);
    }
    //res.status(200).send({ user });
    return next();
  });
};

module.exports = signUp;
