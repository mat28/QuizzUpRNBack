var express = require('express');
var router = express.Router();
var ctrlUsers = require('../api/controllers/usersCtrl.js');
var ctrlThemes = require('../api/controllers/themesCtrl.js')

// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);

router
  .route('/users/login')
  .post(ctrlUsers.login);

router
  .route('/users/:userId')
  .get(ctrlUsers.authenticate,ctrlUsers.getUserById)

router
  .route('/themes')
  .get(ctrlUsers.authenticate,ctrlThemes.getAllTheme)
  .post(ctrlUsers.authenticate,ctrlThemes.addOneTheme);

router
  .route('/themes/:themeId')
  .get(ctrlUsers.authenticate,ctrlThemes.getOneTheme)
  .put(ctrlUsers.authenticate,ctrlThemes.updateOneTheme)
  .delete(ctrlUsers.authenticate,ctrlThemes.deleteOneTheme);

router
  .route('/themes/:themeId/randomQuestion')
  .get(ctrlUsers.authenticate,ctrlThemes.getRandomQuestionByThemeId);

router
  .route('/themes/:themeId/question/:questionId')
  .get(ctrlUsers.authenticate,ctrlThemes.getQuestionById)
  .put(ctrlUsers.authenticate,ctrlThemes.updateOneQuestion)
  .delete(ctrlUsers.authenticate,ctrlThemes.deleteOneQuestion);

module.exports = router;
