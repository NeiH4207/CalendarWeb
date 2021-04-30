var express = require('express')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var app = express()

app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../public'));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hienvq:123321@cluster0.hklcy.mongodb.net/test?retryWrites=true&w=majority";

app.post('/addEvent', function(req, res) {
    var data = {
        start: req.body.start,
        title: req.body.title,
        location: req.body.location,
        details: req.body.detail
    };
    console.log(data);
    console.log('ok1');
    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      var dbo = db.db("CalendarDB");
      dbo.collection("event").insertOne(data,function(err, collection) {
        if (err) throw err;
      });
      db.close();
    }); 
    res.send(true);
});

app.post('/checkEvent', function(req, res) {
    var id = req.body.id;
    console.log(id);
    console.log(req.body);
    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      var dbo = db.db("CalendarDB");
      var query = { 'id' : id};
      dbo.collection("event").find(query).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
      });
      db.close();
    });
});

module.exports = app;