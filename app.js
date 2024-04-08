import express from 'express';
import cors from 'cors';
import axios from 'axios';
import morgan from 'morgan';
import {config} from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // this calls for the ejs libary
app.use(express.static('css')); //loads all of the static files from the css folder

app.use(morgan('dev')); //enables logging information regarding the server

config();
const {CLIENT_ID, APP_SECRET} = process.env;

const base ="https://api.meetup.com/gql";



//test route 
app.get("/test", async (req,res) => {
  const data = await generateAccessToken();
  console.log(data);

  res.json(data);
});


function testQuery(test) {
  return queryFetch(`
      query {
          self {
              id,
              name
          }
      }
  `, {self: test}).then(data => {
      console.log(data.data.event);
    });
  }

async function generateAccessToken()
{
  const reposne = await axios({
    url:"https://secure.meetup.com/oauth2/authorize",
    method: "post",
    data:"grant_type=client_credentials",
    auth: {
      username: CLIENT_ID,
      password: APP_SECRET,
    },
  });
  reposne.data;
}




app.listen(port, () =>{
  console.log('port ready at '+port);
});



app.get('/', (req, res) => { //this gets the request from the navigation from the webpage and loads that page
  res.render('index', { title: 'Home' }); // tells the code to render the index file
});

app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
  res.status(404).render('404', { title: '404 Page' });
});
