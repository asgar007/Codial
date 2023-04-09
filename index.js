const express = require('express');
const port = 8001;
const app = express();
//use express layout
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);

//use static folder
app.use(express.static('./assets'));

//extract style and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//any request will route through routes folder
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        // console.log('error in starting server', err);
        //another way of writing using interpolation
        console.log(`error in starting server: ${err}`);
    }
    console.log(`successfull server started on port: ${port}`);
})