const { Schema } = require ('mongoose');
const { Types } = Schema;

const schema = new Schema ({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdById: {
    type: Types.ObjectId,
    required: true
  },
});

module.exports = schema;