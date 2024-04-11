import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

async function fetchData() {
// The URL of the main page
const main_url = 'https://www.meetup.com/find/?sortField=DATETIME&source=EVENTS&eventType=inPerson&dateRange=tomorrow&location=ie--Dublin';

let eventsData = [];
let eventDetails = '';

axios.get(main_url)
  .then(response => {
    // Parse the HTML of the main page
    const $ = cheerio.load(response.data);

    // Find all event links on the main page that have an img tag
    const eventLinks = $('a[data-event-label="Event card"]:has(img)')
      .map((i, el) => $(el).attr("href"))
      .get();

    // Loop over each event link and create a promise for each request
    const eventPromises = eventLinks.map((eventLink) => {
      return axios.get(eventLink)
        .then(response => {
          // Parse the HTML of the event page
          const $ = cheerio.load(response.data);

          // Find the img tag inside the picture tag with data-testid="event-description-image" and get its src attribute
          const imgSrc = $('picture[data-testid="event-description-image"] img').attr('src');

          // Find all script tags on the event page
          const scripts = $('script[type="application/ld+json"]');

          // Check if there are at least two scripts
          if (scripts.length >= 2) {
            // Get the HTML of the second script
            const script = $(scripts[1]).html();

            // Parse the JSON-LD script
            const data = JSON.parse(script);

            // Find all p tags inside the div with class break-words and get their text content
            const eventDetailsSections = $('div.break-words p');
            eventDetails = eventDetailsSections.map((i, el) => $(el).text()).get().join(' ');

            // Now eventDetails is a string that contains the text content of all selected sections

            // Check if the properties exist and add them to the eventsData array
            eventsData.push({
              groupName: data.organizer ? data.organizer.name : 'The organizer property does not exist.',
              eventTime: data.startDate ? data.startDate : 'The startDate property does not exist.',
              eventDetails: eventDetails ? eventDetails : 'The event details do not exist.',
              lat: data.location && data.location.geo ? data.location.geo.latitude : 'The latitude property does not exist.',
              lon: data.location && data.location.geo ? data.location.geo.longitude : 'The longitude property does not exist.',
              locationInfo: data.location && data.location.address ? data.location.address.streetAddress : 'The streetAddress property does not exist.',
              eventName: data.name ? data.name : 'The name property does not exist.',
              eventEndTime: data.endDate ? data.endDate : 'The endDate property does not exist.',
              eventImage: imgSrc ? imgSrc : 'The img src does not exist.',
            });
          } else {
            console.log('There are not enough scripts of type application/ld+json on the page.');
          }
        })
        .catch(error => {
          console.error(`Error: ${error}`);
        });
    });

    // Use Promise.all to wait for all the event detail requests to complete
    Promise.all(eventPromises)
      .then(() => {
        // Write the eventsData array to a JSON file
        fs.writeFile('eventsData.json', JSON.stringify(eventsData, null, 2), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      });


  });
}

fetchData();

app.listen(port, () => {
  console.log('FetchData on port ', port);
});
