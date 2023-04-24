const express = require('express');
const homeController = require('../controllers/home_controller')
const router = express.Router();

router.get('/', homeController.home);
//any routes, access from here 
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/posts', require('./posts'));

console.log('router loaded');
module.exports = router; 