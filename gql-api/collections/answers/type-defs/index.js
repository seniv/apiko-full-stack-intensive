const { gql } = require('../../../utils');

module.exports = gql`
  type Answer {
    _id: ID!
    title: String!
    description: String!
    createdAt: DateTime
    author: User
    votes: [Vote]
  }

  extend type Query {
    answers: [Answer]!
  }
`;
