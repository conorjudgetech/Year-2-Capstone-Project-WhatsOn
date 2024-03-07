const mongoose = require('mongoose');

const Schema = mongoose.Schema; // used to send the schema to the database

/*
    The code below provides the format the database must take in the code, the
*/

const loginSchema = new Schema ({ // creates the format of the login
    email: {
        type:String, // has to take a string inorder to process the characters of a email
        required: true // making it a requirement to enter a email to the following contents
    },
    password: {
        type: Number, // has to take only numbers for the login in this current stage. If with more time I can make it more complicated but for the current time this will suffice
        required: true // the user must enter a password
    }
},
{timestamps:true});

const Login = mongoose.model('Login', loginSchema); // this is for helping exporting the model
module.exports = Login;