const { gql } = require('../../../utils');

module.exports = gql`
  type Vote {
    _id: ID!
    isPositive: Boolean!
    createdAt: DateTime!
  }
`;
