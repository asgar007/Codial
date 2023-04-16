const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');


// check authentication first to access profile page
router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/signIn', userController.signIn);
router.get('/signUp', userController.signUp);
router.post('/create', userController.create);

//use passport as middleware taking 3 arguments
router.post('/create-session',passport.authenticate('local',{failureRedirect: '/user/signIn'}), userController.createSession);

router.get('/signOut', userController.destroySession);

module.exports = router;