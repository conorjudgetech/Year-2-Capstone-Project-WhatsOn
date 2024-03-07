const express = require('express'); //calls the express libary
const morgan = require('morgan');
const app = express(); // changes the name of the express call to app, saves time on typing
const mongoose = require('mongoose');

app.set('view engine', 'ejs'); // this calls for the ejs libary


//All of the middle ware technologies
app.use(express.static('css')); //loads all of the static files from the css folder
//app.use(express.urlencoded({ extende:true })); // parses all of the information from the web page as an object
app.use(morgan('dev')); //enables logging information regarding the server


const dbURI = 'mongodb+srv://usertesting:test123@cluster0.sb4w5pv.mongodb.net/Login?retryWrites=true&w=majority'


mongoose.connect(dbURI)
    .then((result) => console.log('connected to db'), app.listen(3000, () => {
        console.log('Listening on port 3000');
        
    }))
    .catch((err) => console.log(err));


//middle ware to access static files



 app.get('/', (req, res) => { //this gets the request from the navigation from the webpage and loads that page
    res.render('index', {title: 'Home'}); // tells the code to render the index file
});




app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
    res.status(404).render('404', {title: '404 Page'});
});
