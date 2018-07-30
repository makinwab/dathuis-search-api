const express = require('express');
const express_graphql = require('express-graphql');
const { clientSchema } = require('./models/client');
const port = process.env.PORT || 4000;
const { clients } = require('./controllers/clients');

// Root Resolver
const root = {
  clients: clients.getAll
};

const app = express();
app.use('/graphql', express_graphql({
  schema: clientSchema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => console.log(`Server listening on ${port}`));