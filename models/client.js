const { buildSchema } = require('graphql');
const fs = require('fs');

// GraphQL Schema
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

const clientsData = JSON.parse(fs.readFileSync('clients.json'));

// Parse Clients Data - replace id value with $old's value
clientsData.forEach(item => {
  item.id = item.id['$oid'];
});

module.exports = { clientSchema, clientsData };