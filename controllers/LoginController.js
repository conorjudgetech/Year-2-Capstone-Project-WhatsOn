const Login = require('../models/LoginSchema'); //importing the object from the login schema or in java terms making an instance of an object



const signUp = (req, res) => {
    const signUp = new Login(req.body);
    Login.save() //this will upload the newly added accounts to the database
        .then((result) => {
            res.redirect('/'); //will redirect the user to page after logging in
        })
        .catch((err) => {
            console.log(err); //will send the server there is an error
        });
};


const deleteAccount = (req,res) => {
    const id = req.params.id;

    Login.findByIdAndDelete(id) //this is will be handled when the user is on their account and press the delete button
        .then(result => {
            res.json({ redirect: '/' }) //redirects the user to the home page
        })
        .catch((err) => console.log(err)); //reports any errors with the user deleting their account
};

module.exports = {
    signUp,
    deleteAccount
}