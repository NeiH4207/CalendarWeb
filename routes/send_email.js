var express = require('express')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('../configuration/config')
var app = express()

app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../public'));


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.close();
});

var nodemailer = require('nodemailer');
const { render, connect } = require('./register')
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'congnghewebnhom9@gmail.com',
        pass: 'congngheweb9'
    }
});

function send_email(taikhoan, matkhau) {
    var mailOptions = {
        from: 'congnghewebnhom9@gmail.com',
        to: taikhoan,
        subject: 'This is your new password',
        text: matkhau
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.post('/', function(req, res) {
    var email = req.body.email
        // var password = req.cookies['password']
});

module.exports = app;