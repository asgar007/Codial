// order here is important
const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8001;
const app = express();
//use express layout
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

app.use(expressLayout);

app.use(express.urlencoded());
app.use(cookieParser());

//use static folder
app.use(express.static('./assets'));

//extract style and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store session cookie in db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/codial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        // console.log('error in starting server', err);
        //another way of writing using interpolation
        console.log(`error in starting server: ${err}`);
    }
    console.log(`successfull server started on port: ${port}`);
})