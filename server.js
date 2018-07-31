const express = require('express');
const express_graphql = require('express-graphql');
const { clientSchema } = require('./schema');
const port = process.env.PORT || 4000;
const { Clients } = require('./resolvers');
const cors = require('cors');

const root = {
  clients: Clients.all
};

const app = express();

app.use('/graphql', cors(), express_graphql({
  schema: clientSchema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => console.log(`Server listening on ${port}`));