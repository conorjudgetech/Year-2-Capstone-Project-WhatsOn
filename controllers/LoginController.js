const Login = require('../models/LoginSchema');



const signUp = (req, res) => {
    const signUp = new Login(req.body);
    Login.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
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