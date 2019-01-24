
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')

const routes = require('./routes')

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME
const DB_URI = `mongodb://${DB_USER}:${DB_PASS}@ds161104.mlab.com:61104/${DB_NAME}`

const app = express()

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);


/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors({ optionsSuccessStatus: 200 }))

app.use('/public', express.static(process.cwd() + '/public'));

app.use('/api', routes)

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


mongoose.connect(DB_URI, { useNewUrlParser: true })
   .then(result => app.listen(port))
   .catch(err => console.log(err))
