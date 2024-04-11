import express from 'express';
import morgan from 'morgan';
import fetchData from './Data_Fetching/fetchData.js';
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // this calls for the ejs libary
app.use(express.static('css')); //loads all of the static files from the css folder

app.use(morgan('dev')); //enables logging information regarding the server


app.listen(port, () => {
  console.log('Running on port ', port);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle form submissions
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'appwhatsonapp@gmail.com', // Your Gmail address
      pass: 'RyanSpades' // Your Gmail password
    }
  });

  // Email message options
  let mailOptions = {
    from: '<appwhatsonapp@gmail.com>', // Sender's name and your email address
    to: 'appwhatsonapp@gmail.com', // Recipient's email address
    subject: 'Message',
    text: `From: ${name} <${email}>\n\n${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});



app.get('/', async (req, res) => {
  try {
    // Call fetchData() and wait for it to finish
    await fetchData();
    console.log('Data fetched successfully');
    // Rendering the 'index' template
    res.render('index', { title: 'Home' }); 
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    res.status(500).send('Error fetching data');
  }
});


  

   


app.use((req, res) => { //this is used to direct the user to the 404 page if the page they are looking for does not exist 
  res.status(404).render('404', { title: '404 Page' });
});
