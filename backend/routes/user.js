const express = require('express');
// const { model } = require('../models/thing');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;