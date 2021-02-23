// 1. require
const mongoose = require('mongoose')

// 2. connect
mongoose.connect('mongodb://localhost/myDatabase')

// 3. create schema
const Event = new mongoose.Schema({
	id		: Number,
	name	: String,
	date	: Date
})

// // 4. create model
const events = mongoose.model('events', Event)

events.create([
	{id: 1, name: "Hoc CN Web", date: "02/24/2021"},
	{id: 2, name: "Hoc CN Web", date: "02/25/2021"},
])


