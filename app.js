import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import morgan  from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // this calls for the ejs libary
app.use(express.static('css')); //loads all of the static files from the css folder
//app.use(express.urlencoded({ extende:true })); // parses all of the information from the web page as an object
app.use(morgan('dev')); //enables logging information regarding the server


const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
//these resolvers queries will be used to load and display the events that are happening the in the website
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};



const server = new ApolloServer({
    typeDefs,
    resolvers,
    persistedQueries: false
});

await server.start();

const startApp = () => {
    //inject apollo server on express app
    
    server.applyMiddleware({app});
    app.listen(port, () => console.log(`Server is running on port ${port}`));
}

//this method should allow us to avoid the cors error 
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
});

app.get('https://api.meetup.com/events');

startApp();

app.get('/', (req, res) => { //this gets the request from the navigation from the webpage and loads that page
    res.render('index', {title: 'Home'}); // tells the code to render the index file
});

app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
    res.status(404).render('404', {title: '404 Page'});
});
