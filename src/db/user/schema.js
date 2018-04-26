const { Schema } = require('mongoose')
const { Types } = Schema

const profile = {
  fullName: String,
  post: String
}

const schema = new Schema ({
  email: {
    type: String,
    required: true,
  },
  profile,
  services: Object
})

module.exports = schema