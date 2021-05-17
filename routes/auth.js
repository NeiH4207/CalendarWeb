var express = require('express')
var passport = require('passport')
var cookieParser = require('cookie-parser')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy
var config = require('../configuration/config')

var router = express.Router()
router.use(cookieParser());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hienvq:123321@cluster0.hklcy.mongodb.net/test?retryWrites=true&w=majority";

router.post('/', function(req, res) {
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
                res.render('home', {username: username});
            } else {
                // res.render('login', { thongBao: 'Error login, please try again', color: 'red' })
            }
          });
        });
    } 
});


router.get('/home',checkAuthenticated, function (req, res) {

    res.render('home', req.user);
});

router.post('/login',(req, res)=>{
    let token= req.body.token;
    async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '43339122431-re8ubcvgrj5mim4ufqinsf5rlo82kbok.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // console.log('payload ', payload )
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify()
  .then(()=>{
      res.cookie('session-token', token);
      res.send('success');
  }).catch(console.error);
})

router.get('/friend',(res,req)=>{
    res.redirect('friend.ejs')
})

function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user= {};
    async function verify(){
        const ticket= await client.verifyIdToken({
            idToken: token,
            audience: '43339122431-re8ubcvgrj5mim4ufqinsf5rlo82kbok.apps.googleusercontent.com'

        });
        const payload= ticket.getPayload();
        user.username=payload.email.split('@')[0];
        user.fullname= payload.name;
        user.email=payload.email;
        user.picture=payload.picture;
        // console.log(user);
    }

    verify()
    .then(()=>{
        _db.collection('account').insertOne(user,function(err, collection){
            if (err) throw err;
            console.log("Record inserted Successfully");
                  
        });
        req.user = user;
        next();
    })
    .catch(err=>{
        res.redirect('/login');
    })
}

module.exports = router;