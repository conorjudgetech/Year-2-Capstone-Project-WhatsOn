const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);


app.use((req, res, next) => {
    console.log('new request has been made');
    console.log('Host name: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
}); 


/* app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.use((req, res) => {
    res.status(404).render('404', {title: '404 Page'});
});

*/