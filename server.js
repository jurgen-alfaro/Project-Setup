if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// Import the router from index.js
const indexRouter = require('./routes/index');
// Import the authors route
const authorRouter = require('./routes/authors');

// Set the view template
app.set('view engine', 'ejs');

// All the diferent views or files are going to go for our server
app.set('views', __dirname + '/views');

// Hookup Express layouts
app.set('layout', 'layouts/layout');

// Use Express layouts
app.use(expressLayouts);

// Where the public files are going to be (HTML, CSS, JavaScript...)
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));

// Import mongoose to connect to MongoDB
const mongoose = require('mongoose');
// Use DB connection string
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
});

// Import db variable
const db = mongoose.connection;
// If there is any error, log it. 
db.on('error', error => console.error(error));
// Once we connect for the very first time
db.once('open', () => console.log('Connected to Mongoose'));


// Tell the server which router handles this route /
app.use('/', indexRouter);
app.use('/authors', authorRouter);

// Listen to port 3000 
app.listen(process.env.PORT || 3000);