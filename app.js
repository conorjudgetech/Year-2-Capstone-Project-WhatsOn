import express from 'express';
import cors from 'cors';
import axios from 'axios';
import morgan from 'morgan';
import {config} from 'dotenv';
import querystring from 'querystring'

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // this calls for the ejs libary
app.use(express.static('css')); //loads all of the static files from the css folder

app.use(morgan('dev')); //enables logging information regarding the server

config();


// Redirect URI for handling authorization code response
const redirectUri = 'https://whatson-kbt9.onrender.com/';

// OAuth configuration
const clientId = 'cvdgj137jq4nejecgnh6ce0chr';
const clientSecret = 'gqp5aml1e6fii1b9hpmmesnsff';
const authorizationEndpoint = 'https://secure.meetup.com/oauth2/authorize';
const tokenEndpoint = 'https://secure.meetup.com/oauth2/access';

// Step 1: Redirect user to authorization endpoint
app.get('/', (req, res) => {
  // Rendering the 'index' template
  res.render('index', { title: 'Home' }, () => {
    // Callback after rendering the template
    const params = querystring.stringify({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: 'openid profile', // Example scopes
    });

    // Redirecting the user after rendering the template
    res.redirect(`${authorizationEndpoint}?${params}`);
  });
});


// Step 2: Handle callback with authorization code
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  // Step 3: Exchange authorization code for access token
  const tokenParams = querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  }, res.render('index', { title: 'Home' })
  );

  try {
    const tokenResponse = await axios.post(tokenEndpoint, tokenParams);
    const accessToken = tokenResponse.data.access_token;

    // Use the access token to make API requests
    // Example: Fetch user data from Meetup API
    const userDataResponse = await axios.get('https://api.meetup.com/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Display user data
    res.send(userDataResponse.data);
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).send('Error occurred while exchanging authorization code for access token');
  }
});







app.listen(port, () =>{
  console.log('port ready at '+port);
});





app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
  res.status(404).render('404', { title: '404 Page' });
});
