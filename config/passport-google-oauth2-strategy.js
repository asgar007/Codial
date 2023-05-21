const express = require('express');
const crypto = require('crypto');
const User = require('../models/user');
const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

// tell passport to use new strategy for google login
passport.use(new GoogleStrategy({
    clientID: "628059664921-f6e76k3c526d3cb0u1e3s56u554hbcnf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8001/user/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
        //find user
        console.log(profile);
        let user = await User.findOne({ email: profile.emails[0].value });
        if(user){ // if user existed
            return done(null, user);
        }
        else{ // if not then do sign up craete one
            let user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            })
            return done(null, user);
        }
    }catch(err){
        console.log('Error in google passport startegy', err);
        return;
    }

  }
));

module.exports = passport;