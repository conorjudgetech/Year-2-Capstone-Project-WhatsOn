import express from 'express';

import axios from 'axios';
import morgan from 'morgan';
import cheerio from 'cheerio'

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // this calls for the ejs libary
app.use(express.static('css')); //loads all of the static files from the css folder

app.use(morgan('dev')); //enables logging information regarding the server








 
// The URL of the main page
const main_url = 'https://www.meetup.com/find/?source=EVENTS&dateRange=tomorrow&distance=twoMiles';
 
axios.get(main_url)
  .then(response => {
    // Parse the HTML of the main page
    const $ = cheerio.load(response.data);
 
    // Find the event cards on the main page
    const eventCards = $('a.w-full.cursor-pointer.hover:no-underline');
 
    // Iterate over each event card
    eventCards.each((i, card) => {
      // Extract the group name and time
      const groupName = $(card).find('span.s1uol3r6').text().split(':')[1].trim();
      const eventTime = $(card).find('time').attr('datetime');
 
      console.log(`Group Name: ${groupName}, Time: ${eventTime}`);
    });
 
    // Find the event details
    const eventDetails = $('#event-details p.mb-4').map((i, el) => $(el).text()).get().join('\n');
 
    console.log(`Event Details: ${eventDetails}`);
 
    // Find the location info
    const locationInfo = $('[data-testid="location-info"]').text();
    const locationLink = $('[data-testid="venue-name-link"]').attr('href');
    const [_, lat, lon] = locationLink.match(/query=(.*?),(.*?)$/);
 
    console.log(`Location Info: ${locationInfo}, Latitude: ${lat}, Longitude: ${lon}`);
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });



app.listen(port, () =>{
  console.log('port ready at '+port);
});

app.get("/", (req,res) => {
  res.render('index');
});



app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
  res.status(404).render('404', { title: '404 Page' });
});
