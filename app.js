import express from 'express';
// import { ApolloServer, gql } from 'apollo-server-express';
import morgan from 'morgan';
// import fetch from 'node-fetch';

import fetchData from './Data Fetching/fetchData.js';


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // this calls for the ejs libary
app.use(express.static('css')); //loads all of the static files from the css folder

app.use(morgan('dev')); //enables logging information regarding the server


// Call fetchData when your server starts fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
fetchData().then(() => {
  console.log('Data fetched successfully');
}).catch((error) => {
  console.error(`Error fetching data: ${error}`);
});

const startApp = () => {
  //inject apollo server on express app

  // server.applyMiddleware({ app });
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

startApp();

app.get('/', (req, res) => { //this gets the request from the navigation from the webpage and loads that page
  res.render('index', { title: 'Home' }); // tells the code to render the index file
});

app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
  res.status(404).render('404', { title: '404 Page' });
});
