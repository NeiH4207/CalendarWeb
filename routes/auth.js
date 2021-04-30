var express = require('express')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy
var bodyParser = require('body-parser')
var config = require('../configuration/config')
var mysql = require('mysql');
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

app.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        MongoClient.connect(uri, function(err, db) {
          if (err) throw err;
          var dbo = db.db("CalendarDB");
          var query = { username: username, password: password};
          dbo.collection("account").find(query).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            if (result.length > 0){
                res.render('home');
            } else {
                res.render('login', { thongBao: 'Error login, please try again', color: 'red' })
            }
          });
        });
    } 
});

app.get('/google', passport.authenticate('google', { scope: 'email' }));
app.get('/google/callback',
    passport.authenticate('google', { successRedirect: '/gmail', failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);

passport.use(new GoogleStrategy({
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: config.callback_url_gmail
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

// thiet lap su dung dang nhap bang fb
app.get('/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));
app.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/facebook', failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);

// sử dụng  FacebookStrategy trong Passport.
passport.use(new FacebookStrategy({
        // thiết lập các cấu hình cần thiết
        clientID: config.facebook_api_key,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.callback_url_facebook
    },
    function(req, res, profile, done) {
        process.nextTick(function() {
            console.log(profile.displayName)
        });
    }
));

module.exports = app;