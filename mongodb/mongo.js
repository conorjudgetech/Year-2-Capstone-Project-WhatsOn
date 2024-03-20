const mongoose = require('mongoose');



const dbUri = 'mongodb://localhost:27017/Login'
mongoose.connect(dbUri)
    .then( () => { 
        console.log("The Database has connected successfully without any errors")
})
    .catch((err) => console.log(err));

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

    const collection = new mongoose.model("Login_Details", LoginSchema );
    module.exports = collection;
