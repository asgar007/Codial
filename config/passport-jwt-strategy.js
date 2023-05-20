const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, async function(jwt_payload, done){

    try{
        const user = await User.findById(jwt_payload._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch(err){
        console.log('Error in finding user from JWT');
        return done(err, false);
    }

}));


module.exports = passport;