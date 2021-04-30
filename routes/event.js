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

// app.post('/addEvent', function(req, res) {
//     console.log(1);
//     // var id = req.body.id;
//     // MongoClient.connect(uri, function(err, db) {
//     //   if (err) throw err;
//     //   var dbo = db.db("CalendarDB");
//     //   var query = { username: username};
//     //   dbo.collection("event").find(query).toArray(function(err, result) {
//     //     if (err) throw err;
//     //     if (result.length == 0){
//     //         dbo.collection('account').insertOne(data,function(err, collection){
//     //             if (err) throw err;
//     //             console.log("Record inserted Successfully");
                      
//     //         });
//     //         res.render('login', { thongBao: 'Successfully!', color: 'red' })
//     //     } else {
//     //     }
//     //     db.close();
//     //   });
//     // }); 
//     res.send();
// });


// app.post('/addEvent', function(req, res) {
//     var id = req.body.id;
//     MongoClient.connect(uri, function(err, db) {
//       if (err) throw err;
//       var dbo = db.db("CalendarDB");
//       var query = { 'id' : id};
//       dbo.collection("event").find(query).toArray(function(err, result) {
//         if (err) throw err;
//         res.send(result);
//       });
//       db.close();
//     });
// });


app.post('/addEvent', function(req, res) {
    var id = req.body.id;
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