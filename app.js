import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import morgan from 'morgan';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // this calls for the ejs libary
app.use(express.static('css')); //loads all of the static files from the css folder
app.use(express.urlencoded({ extende:true })); // parses all of the information from the web page as an object
app.use(morgan('dev')); //enables logging information regarding the server


const typeDefs = `
type Query {
  self: SelfInfo
}

type SelfInfo {
  id: ID
  name: String
}
`;

// A map of functions which return data for the schema.
//these resolvers queries will be used to load and display the events that are happening the in the website
const resolvers = {
  Query: {
    self: async (_, __, { token }) => {
      const query = `
      query{self{id, name}}`;

      const variables = {
        "query": "query"
      };

      const response = await fetch('https://api.meetup.com/gql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ query, variables })
      });

      const { data, errors } = await response.json();

      if (errors) {
        throw new Error(`failed to fetch from api: ${errors[0].message}`);
      }
      console.log('data fetched: ' + data);

      return data.self;
    }
  }
};




const server = new ApolloServer({
  persistedQueries: false,
  context: ({ req }) => {
    const token = req.headers.authorization || 'cvdgj137jq4nejecgnh6ce0chr';

    return { token };
  },
  cacheControl: {
    defaultMaxAge: 3600
  },
  typeDefs,
  resolvers
});

await server.start();

const startApp = () => {
  //inject apollo server on express app

  server.applyMiddleware({ app });
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

startApp();

app.get('/', (req, res) => { //this gets the request from the navigation from the webpage and loads that page
  res.render('index', { title: 'Home' }); // tells the code to render the index file
});

app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
  res.status(404).render('404', { title: '404 Page' });
});
