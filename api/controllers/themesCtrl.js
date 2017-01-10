var mongoose = require('mongoose');
var Theme     = mongoose.model('Theme');


module.exports.getAllTheme = function(req, res){
  console.log("get all themes");

  Theme
      .find()
      .select('-questions')
      .exec(function(err, themes){
        if(err){
          res
            .status(500)
            .json(err);
        } else {
          console.log(themes);
          res
            .status(200)
            .json(themes);
        }
      });
}

module.exports.getOneTheme = function(req, res){
  console.log("get One Theme");
  var themeId = req.params.themeId;

  Theme
      .findById(themeId)
      .exec(function(err, theme){
        if(err){
          res
            .status(500)
            .json(err);
        } else {
          res
            .status(200)
            .json(theme);
        }
      });
}

module.exports.addOneTheme = function(req, res){
  console.log("Add One Theme");

}

module.exports.getRandomQuestionByThemeId = function(req, res) {
  console.log("get Random Question")
  var themeId = req.params.themeId;

  Theme
      .findById(themeId)
      .exec(function(err, theme){
        if(err){
          res
            .status(500)
            .json(err);
        } else {

          var randomIndex = Math.floor((Math.random() * theme.questions.length) + 1);
          res
            .status(200)
            .json(theme.questions[randomIndex]);
        }
      });
}

module.exports.addOneQuestion = function (req, res) {
  console.log("Add one Question");

}

module.exports.updateOneTheme = function(req, res) {
  console.log("Update One Theme");
}

module.exports.deleteOneTheme = function(req, res){
  console.log("Delete One Theme");
  var themeId = req.params.themeId;
}

module.exports.getQuestionById = function(req, res){
  var themeId = req.params.themeId;
  var questionId = req.params.questionId;
}

module.exports.updateOneQuestion = function(req, res){
  var themeId = req.params.themeId;
  var questionId = req.params.questionId;
}

module.exports.deleteOneQuestion = function(req , res) {
  var themeId = req.params.themeId;
  var questionId = req.params.questionId;
}
