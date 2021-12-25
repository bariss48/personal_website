const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


router.get("/signup", async (req,res) => {
    res.redirect("/");
});

router.post('/signup', async (req, res) => {
    try{
       const newUser = await User.register(new User({
          username: req.body.username,
          email: req.body.email
       }), req.body.password);
       passport.authenticate('local')(req, res, () => {
           res.redirect('/blogs');
       });
    }catch(err){
        console.log(err);
        res.send(err);
    }
 });
 
 //login-page
 router.get("/login", (req,res) => {
     res.render('login');
 });
 //login
 router.post("/login", passport.authenticate('local', {
     successRedirect: '/blogs',
     failureRedirect: '/login',
 })); 
 
 //logout
 router.get("/logout",(req,res) => {
     req.logOut();
     res.redirect('/blogs');
 });

module.exports = router;