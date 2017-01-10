var mongoose = require('mongoose');

var responseSchema = new mongoose.Schema({
  name : String,
  responseTrue : Boolean
});

var questionSchema = new mongoose.Schema({
  name : String,
  responses : [responseSchema]
});

var themeSchema = new mongoose.Schema({
  name : String,
  image : String,
  questions : [questionSchema]
});


mongoose.model('Theme', themeSchema, "themes");
