const express = require('express');
const router = express.Router();

const adminAuth = require('./adminAuth');
const auth = require('./auth');

router.use('/admin', adminAuth); 
router.use('/auth', auth);       

module.exports = router;
