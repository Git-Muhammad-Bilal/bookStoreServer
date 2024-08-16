const express = require('express');
const { getLogedInUser, createUser } = require('../controllers/user');
const { validateUser } = require('../Jwt/secureUser');
const router = express.Router();

router.post('/getLogedInUser' ,getLogedInUser)
router.post('/createUser', createUser)

module.exports = router;