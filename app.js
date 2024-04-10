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
// The URL of the main page
const main_url = 'https://www.meetup.com/find/?sortField=DATETIME&source=EVENTS&eventType=inPerson&dateRange=tomorrow&location=ie--Dublin';
 
axios.get(main_url)
  .then(response => {
    // Parse the HTML of the main page
    const $ = cheerio.load(response.data);
 
    // Find all event links on the main page
    const eventLinks = $('a[data-event-label="Event card"]').map((i, el) => $(el).attr('href')).get();
 
    // Loop over each event link
    eventLinks.forEach(eventLink => {
      axios.get(eventLink)
        .then(response => {
          // Parse the HTML of the event page
          const $ = cheerio.load(response.data);
 
          // Find all script tags on the event page
          const scripts = $('script[type="application/ld+json"]');
 
          // Check if there are at least two scripts
          if (scripts.length >= 2) {
            
            // Get the HTML of the second script
            const script = $(scripts[1]).html();
 
            // Parse the JSON-LD script
            const data = JSON.parse(script);
 
            // Check if the properties exist
            const groupName = data.organizer ? data.organizer.name : console.log('The organizer property does not exist.');
            const eventTime = data.startDate ? data.startDate : console.log('The startDate property does not exist.');
            const eventDetails = data.description ? data.description : console.log('The description property does not exist.');
            const lat = data.location && data.location.geo ? data.location.geo.latitude : console.log('The latitude property does not exist.');
            const lon = data.location && data.location.geo ? data.location.geo.longitude : console.log('The longitude property does not exist.');
            const locationInfo = data.location && data.location.address ? data.location.address.streetAddress : console.log('The streetAddress property does not exist.');
 
            // Extract the additional information
            const eventName = data.name ? data.name : console.log('The name property does not exist.');
            const eventEndTime = data.endDate ? data.endDate : console.log('The endDate property does not exist.');
            const eventStatus = data.eventStatus ? data.eventStatus : console.log('The eventStatus property does not exist.');
            const eventAttendanceMode = data.eventAttendanceMode ? data.eventAttendanceMode : console.log('The eventAttendanceMode property does not exist.');
            
            console.log(`Group Name: ${groupName}, Time: ${eventTime}, Event Details: ${eventDetails}, Latitude: ${lat}, Longitude: ${lon}, Location Info: ${locationInfo}`);
            console.log(`Event Name: ${eventName}, End Time: ${eventEndTime}, Event Status: ${eventStatus}, Event Attendance Mode: ${eventAttendanceMode}`);
          } else {
            console.log('There are not enough scripts of type application/ld+json on the page.');
          }
        })
        .catch(error => {
          console.error(`Error: ${error}`);
        });
    });
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
