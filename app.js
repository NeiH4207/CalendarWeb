var express = require('express')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('./configuration/config')
var mysql = require('mysql')
var app = express()
var register = require('./routes/register')
const { authenticate } = require('passport');
var get = require('./routes/get')
var forgot = require('./routes/send_email')

var mongoose = require('mongodb')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

function check_email(email) {
    // checking email exist in database
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    if (req.cookies.username === undefined) {
        res.render('index', {
            username: 'Canlendar will help your teams be more professional and do more' +
                'organize work and study in a more reasonable way'
        });
    } else {

    }
});

app.get('/forgot', function(req, res) {
    res.render('forgot')
});

// thiet lap chuc nang login
app.get('/login.html', function(req, res) {
    res.render('login', { thongBao: '' });
})

// get
app.use('/get', get)

// xử lý phần đăng kí
app.use('/register', register)

// chuc nang quen mat khau
app.use('/forgot', forgot)

module.exports = app;