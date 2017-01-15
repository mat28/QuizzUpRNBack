var mongoose = require('mongoose');
var User     = mongoose.model('User');
var bcrypt   = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');


module.exports.getUserById = function(req,res){
  var userId = req.params.userId;

  User
    .findById(userId)
    .exec(function(err,user){
      if(err){
        res
          .status(500)
          .json(err);
      } else {
        console.log("user", user);
        res
          .status(200)
          .json({success : true, data: {user : user}});
      }
    });
}

module.exports.register = function(req, res) {
  console.log('registering user');

  var email = req.body.email;
  var lastName = req.body.lastName || 'null';
  var firstName = req.body.firstName || 'null';
  var password = req.body.password;

  User.create({
    email: email,
    lastName: lastName,
    firstName : firstName,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('user created', user);
      res.status(201).json(user);
    }
  });
};

module.exports.login = function(req, res) {
  console.log('logging in user');
  var email = req.body.email.toLowerCase();
  var password = req.body.password;

  User.findOne({
    email: email
  }).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log(user);
      if (bcrypt.compareSync(password, user.password)) {
        console.log('User found', user);
        var token = jwt.sign({ email: user.email }, 's3cretmma2', { expiresIn: 360000 });
        res.status(200).json({success: true, data : {jwtAccessToken: token, user: user}});
      } else {
        res.status(401).json('Unauthorized');
      }
    }
  });
};

module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    console.log(headerExists);
    var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
    jwt.verify(token, 's3cretmma2', function(error, decoded) {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.email;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};
