const express = require('express');
const { google, signin, signup } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google)

module.exports = router;