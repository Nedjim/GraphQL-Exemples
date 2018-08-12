const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQl schema
const schema = buildSchema(`
  type Query {
    message: String,
    zauguidou: String,
  }
`);

// Root resolver
const root = {
  message: () => 'Hello World!',
  zauguidou: () => 'Joue à Dota! Ho Yeah Nigga!',
};

// Express Server and GraphQl endpoint
const app = express();

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, console.log('Express GraphQL Server Now Running On localhost:3000/graphql'))