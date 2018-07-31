const { buildSchema } = require('graphql');

const clientSchema = buildSchema(`
  type Query {
    clients(name: String, origin: String, limit: Int, endCursor: ID): PaginatedClient
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
    limit: Int
    size: Int
  }
`);

module.exports = { clientSchema };