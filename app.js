import express from 'express';
import cors from 'cors';
import axios from 'axios';
import morgan from 'morgan';


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // this calls for the ejs libary
app.use(express.static('css')); //loads all of the static files from the css folder

app.use(morgan('dev')); //enables logging information regarding the server
const endpoint = 'https://api.meetup.com/gql'
app.use(express.json());
app.use(cors());


const query = `
  query{
    self{
      id,
      name
    }
  }
`;

const body = JSON.stringify({query});

const request = axios({
  url:endpoint,
  method: "GET",
  mode: "cors",
  headers: {
    'Authorization': '{cvdgj137jq4nejecgnh6ce0chr}',
    "Content-Type": "application/json"
  },
  data: body
});

request.then(({data}) => console.log(data));


app.listen(port, () =>{
  console.log('port ready at '+port);
});



app.get('/', (req, res) => { //this gets the request from the navigation from the webpage and loads that page
  res.render('index', { title: 'Home' }); // tells the code to render the index file
});

app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
  res.status(404).render('404', { title: '404 Page' });
});
