﻿var express = require('express')
var router = express.Router()

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hienvq:123321@cluster0.hklcy.mongodb.net/test?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017";
var _db;

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  _db = db.db("CalendarDB");
}); 

module.exports = router;