var express = require('express')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('../configuration/config')
var mysql = require('mysql');
var app = express()
    // thiet lap views va public
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

app.post('/', function(req, res) {
    var confirm = req.body.confirm
    var username = req.body.username
    var password = req.body.password
    var phone = req.body.phone
    var email = req.body.email

    var data = {
        "username": username,
        "email":email,
        "password":password,
        "phone":phone
    }
    if (password == confirm){
        MongoClient.connect(uri, function(err, db) {
          if (err) throw err;
          var dbo = db.db("CalendarDB");
          var query = { username: username};
          dbo.collection("account").find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length == 0){
                dbo.collection('account').insertOne(data,function(err, collection){
                    if (err) throw err;
                    console.log("Record inserted Successfully");
                          
                });
                res.render('login', { thongBao: 'Successfully!', color: 'red' })
            } else {
            }
            db.close();
          });
        }); 
    } else{

    }

});

module.exports = app;