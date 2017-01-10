var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    index : {
      unique : true
    },
    required : true
  },
  lastName: {
    type: String
  },
  firstName: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('User', userSchema, "users");
