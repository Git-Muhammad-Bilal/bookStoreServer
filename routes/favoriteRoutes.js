const express = require('express');
const { validateUser } = require('../Jwt/secureUser');
const { savefavoriteBook, getFavoriteBooks, removeFavoriteBook, getFavorites } = require('../controllers/favorite');
const { getBook } = require('../controllers/fetchBooks');
const router = express.Router();

router.post('/savefavorite', validateUser ,savefavoriteBook)
router.get('/getFavorites',validateUser, getFavorites)
router.get('/getFavoriteBooks',validateUser, getBook)
    
module.exports = router;