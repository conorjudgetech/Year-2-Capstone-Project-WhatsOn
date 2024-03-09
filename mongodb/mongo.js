const mongoose = require('mongoose');



const dbUri = 'mongodb+srv://usertesting:test123@cluster0.sb4w5pv.mongodb.net/Login?retryWrites=true&w=majority'
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

    const collection = new mongoose.model("Detail", LoginSchema );
    module.exports = collection;
