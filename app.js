const express = require('express'); //calls the express libary
const app = express(); // changes the name of the express call to app, saves time on typing
const morgan = require('morgan');
//const collection = require('./mongodb/mongo'); //pulls in the schema and mongo db connection code
//app.use(express.urlencoded({extended:false}));
const path = require('path');
app.set('view engine', 'ejs'); // this calls for the ejs libary

//All of the middle ware technologies
app.use(express.static('css')); //loads all of the static files from the css folder
//app.use(express.urlencoded({ extende:true })); // parses all of the information from the web page as an object
app.use(morgan('dev')); //enables logging information regarding the server

const port = process.env.PORT || 3000;

app.listen(port, (req,res) => {
    console.log('Loading on port: '+port);
})


 app.get('/', (req, res) => { //this gets the request from the navigation from the webpage and loads that page
    res.render('index', {title: 'Home'}); // tells the code to render the index file
});
/*
app.post("/signup", async(req,res) => {
    // the lines below clarify the schema from the db while also taking the information from the index.ejs
    const data = {
        email: req.body.email, //taking the email field from the index
        password:req.body.password //taking the password from the index
    }

   await collection.insertMany([data]) //since mongo db is ay
   .then(res.render("/")) // will render the home page after the login/signup is successfull
   .catch((err) => console.log(err)); // will let us know if there is any errors with the code

});
*/

app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
    res.status(404).render('404', {title: '404 Page'});
});
