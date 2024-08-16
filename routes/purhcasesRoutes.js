const express = require('express');
const { validateUser } = require('../Jwt/secureUser');
const { createPurchases, getPurhchases, cancealPurhcase, removePurhcaseHistory } = require('../controllers/purchases');
const router = express.Router();

router.post('/createPurchase', validateUser ,createPurchases)
router.get('/getPurhchases',validateUser, getPurhchases)
router.get('/removePurhcaseHistory/:purhcaseId',validateUser, removePurhcaseHistory)

module.exports = router;