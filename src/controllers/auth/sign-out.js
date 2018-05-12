const { sendAccepted } = require('../../utils');

const signOut = (req, res) => {
  req.logOut();
  sendAccepted(res)();
};

module.exports = signOut;
