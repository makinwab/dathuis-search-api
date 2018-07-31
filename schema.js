const { buildSchema } = require('graphql');

const clientSchema = buildSchema(`
  type Query {
    clients(name: String, origin: String, limit: Int, cursor: ID, endCursor: ID): PaginatedClient
  },

  type PaginatedClient {
    edges: [Client]
    pageInfo: PageInfo
  },

  type Client {
    id: ID
    first_name: String
    last_name: String
    email: String
    gender: String
    photo: String
    origin: String
  },

  type PageInfo {
    endCursor: ID
    cursor: ID
    limit: Int
    size: Int
    hasNextPage: Boolean
    totalCount: Int
  }
`);

module.exports = { clientSchema };