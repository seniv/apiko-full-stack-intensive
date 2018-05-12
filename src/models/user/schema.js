const { Schema } = require('mongoose');
const { Types } = Schema;

const profile = {
  fullName: String,
  post: String
};

const schema = new Schema ({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile,
});

module.exports = schema;