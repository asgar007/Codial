const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')


// authenticate using passport
passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
},
  async function (req, email, password, done) {
    // find an user and establish the identity
    try{
      const user = await User.findOne({ email: email });
      if (!user || user.password != password) {
        req.flash('error', 'Invalid username/password ');
        console.log('Invalid username/password ');
        return done(null, false); 
      }
      return done(null, user);

    }catch(error){
      req.flash('error', error)
      console.log('Error in finding user ---> Passport'); 
      return done(error);
    }
    // User.findOne({ email: email }, function (err, user) {
    //   if (err) { console.log('Error in finding user ---> Passport'); return done(err); }
    //   if (!user || user.password != password) { console.log('Invalid username/password '); return done(null, false); }
    //   return done(null, user);
    // });
  }
));

//serializing the user  to decide which key is to be kept in the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// deserialize the user using the key in the cookie
passport.deserializeUser(async function (id, done) {

try{
  const user = await User.findById(id);
  return done(null, user);

}catch(error){
  console.log('Error in finding user ---> Passport');
  return done(err);
}
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
  // if the user is signed in then pass on to the next(func that is controller)
  if(req.isAuthenticated()){
    return next();
  }
  // if the user is not signed in
  return res.redirect('/user/signIn');
}

passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
    //req.user contains the current  signed in user from the session cookie that we are just sending this to the local for the views
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;