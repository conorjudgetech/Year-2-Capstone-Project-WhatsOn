const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
    The code below provides the format the database must take in the code, the
*/

const loginSchema = new Schema ({
    email: {
        type:String,
        required: true
    },
    password: {
        type: Number,
        required: true
    }
},
{timestamps:true});

const Login = mongoose.model('Login', loginSchema);
module.exports = Login;