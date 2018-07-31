const { buildSchema } = require('graphql');

const clientSchema = buildSchema(`
  type Query {
    clients(name: String, origin: String): [Client]
  },

  type Client {
    id: ID
    first_name: String
    last_name: String
    email: String
    gender: String
    photo: String
    origin: String
  }
`);

module.exports = { clientSchema };