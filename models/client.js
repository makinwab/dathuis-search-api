const { buildSchema } = require('graphql');
const fs = require('fs');

// GraphQL Schema
const clientSchema = buildSchema(`
  type Query {
    clients(name: String, origin: String): [Client]
  },

  type Client {
    id: Oid
    first_name: String
    last_name: String
    email: String
    gender: String
    photo: String
    origin: String
  },

  type Oid {
    oid: ID
  }
`);

const clientsData = JSON.parse(fs.readFileSync('clients.json'));

module.exports = { clientSchema, clientsData };