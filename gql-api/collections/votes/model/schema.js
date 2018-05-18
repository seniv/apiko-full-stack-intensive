const { Schema } = require('mongoose');
const { Types } = Schema;

const schema = new Schema ({
  isPositive: {
    type: Boolean,
    required: true
  },
  answerId: {
    type: Types.ObjectId,
    required: true
  },
  createdById: {
    type: Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = schema;