const mongoose = require('mongoose');



const dbUri = 'mongodb://localhost:27017/Login' //creating a link to load the connection to the mongo db 
mongoose.connect(dbUri) // establishing the connection to the mongodb 
    .then( () => {  //works like the next function that we have done in DDL
        console.log("The Database has connected successfully without any errors") //gives a message into the terminal to let the user know that the connection has been established
})
    .catch((err) => console.log(err)); //will catch any errors that may be wrong with the connection to the db

    //creating the format of the login/signup
    const LoginSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type:String,
            required:true
        }
    });

    const collection = new mongoose.model("Login_Details", LoginSchema ); //making an instance of the schema in the javascript and in the mongo db
    module.exports = collection; //exports the data as a object to other js files
