import express from "express";
import morgan from "morgan";
import fetchData from "./Data Fetching/fetchData.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("css"));
app.use(morgan("dev"));

const startApp = () => {
  // Call fetchData when your server starts
  fetchData()
    .then(() => {
      console.log("Data fetched successfully");
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    });

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

startApp();

app.get("/", (req, res) => {
  //this gets the request from the navigation from the webpage and loads that page
  res.render("index", { title: "Home" }); // tells the code to render the index file
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
});
