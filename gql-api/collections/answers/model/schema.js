const { Schema } = require('mongoose');
const { Types } = Schema;

const schema = new Schema ({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questionId: {
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