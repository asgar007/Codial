const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');

router.get('/profile', adminController.profile);

module.exports = router;