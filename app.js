import express from 'express';
import morgan from 'morgan';
import querystring from 'querystring'
import axios from 'axios'


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // this calls for the ejs libary
app.use(express.static('css')); //loads all of the static files from the css folder

app.use(morgan('dev')); //enables logging information regarding the server

const redirectUri = 'https://whatson-kbt9.onrender.com/callback';

// OAuth configuration
const clientId = 'API_KEY';
const clientSecret = 'SECRET_KEY';
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
  });

  try {
    const tokenResponse = await axios.post(tokenEndpoint, tokenParams);
    const accessToken = tokenResponse.data.access_token;

    // Use the access token to make API requests
    // Example: Fetch user data from Meetup API
    const userDataResponse = await axios.post(
      'https://api.meetup.com/gql',
      {}, // Empty object for the request body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json', // Correctly set content type header
        },
      }
    );

    // Render the 'index' template with the retrieved user data
    res.render('index', { title: 'Home', userData: userDataResponse.data });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).send('Error occurred while exchanging authorization code for access token');
  }
});




app.listen(port, () => {
  console.log('Loading on port ', port);
});


app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
  res.status(404).render('404', { title: '404 Page' });
});
