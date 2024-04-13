import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

const categories = {
  "Charity": ["511", "604", "624", "673", "449"],
  "Cultural": ["521", "622", "467"],
  "Education": ["405", "593", "436", "546"],
  "Entertainment": ["612", "535", "395"],
  "Social": ["571", "652", "701"],
  "Sports": ["482", "612", "684"]
};

async function fetchData() {
  let eventsData = [];

  for (let eventType in categories) {
    for (let categoryId of categories[eventType]) {
      const main_url =
        "https://www.meetup.com/find/?sortField=DATETIME&source=EVENTS&eventType=inPerson&dateRange=tomorrow&location=ie--Dublin&categoryId=" + categoryId;

      let eventDetails = "";

      await axios.get(main_url).then((response) => {
        const $ = cheerio.load(response.data);
        const eventLinks = $('a[data-event-label="Event card"]:has(img)')
          .map((i, el) => $(el).attr("href"))
          .get();

        const eventPromises = eventLinks.map((eventLink) => {
          return axios
            .get(eventLink)
            .then((response) => {
              const $ = cheerio.load(response.data);
              const imgSrc = $('picture[data-testid="event-description-image"] img').attr("src");
              const scripts = $('script[type="application/ld+json"]');

              if (scripts.length >= 2) {
                const script = $(scripts[1]).html();
                const data = JSON.parse(script);
                const eventDetailsSections = $("div.break-words p");
                eventDetails = eventDetailsSections
                  .map((i, el) => $(el).text())
                  .get()
                  .join(" ");

                eventsData.push({
                  groupName: data.organizer ? data.organizer.name : "The organizer property does not exist.",
                  eventTime: data.startDate ? data.startDate : "The startDate property does not exist.",
                  eventDetails: eventDetails ? eventDetails : "The event details do not exist.",
                  lat: data.location && data.location.geo ? data.location.geo.latitude : "The latitude property does not exist.",
                  lon: data.location && data.location.geo ? data.location.geo.longitude : "The longitude property does not exist.",
                  locationInfo: data.location && data.location.address ? data.location.address.streetAddress : "The streetAddress property does not exist.",
                  eventName: data.name ? data.name : "The name property does not exist.",
                  eventEndTime: data.endDate ? data.endDate : "The endDate property does not exist.",
                  eventImage: imgSrc ? imgSrc : "The img src does not exist.",
                  eventType: eventType
                });
              } else {
                console.log("There are not enough scripts of type application/ld+json on the page.");
              }
            })
            .catch((error) => {
              console.error(`Error: ${error}`);
            });
        });

        Promise.all(eventPromises)
          .then(() => {
            fs.writeFile(
              "Data Fetching/eventsData.json",
              JSON.stringify(eventsData, null, 2),
              (err) => {
                if (err) throw err;
                console.log("The file has been saved!");
              }
            );
          })
          .catch((error) => {
            console.error(`Error: ${error}`);
          });
      });
    }
  }
}

export default fetchData;
