const express = require('express'); //calls the express libary

const app = express(); // changes the name of the express call to app, saves time on typing

app.set('view engine', 'ejs'); // this calls for the ejs libary

app.listen(3000); //sets the port number to 3000


//middle ware to access static files
app.use(express.static('css'));

app.use((req, res, next) => {
    console.log('new request has been made');
    console.log('Host name: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
}); 


/* app.get('/', (req, res) => { //this gets the request from the navigation from the webpage and loads that page
    res.render('index', {title: 'Home'}); // tells the code to render the index file
});

app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
    res.status(404).render('404', {title: '404 Page'});
});

*/