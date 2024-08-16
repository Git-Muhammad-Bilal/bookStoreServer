const express = require('express');
const { validateUser } = require('../Jwt/secureUser');
const { getBooks, serchBooks, getBook } = require('../controllers/fetchBooks');
const router = express.Router();

router.get('/getBooks', validateUser,getBooks)
router.get('/getBook/:bookId', validateUser,getBook)
router.get('/serchBooks',validateUser, serchBooks)
// router.delete('/cancealPurhcase',validateUser, cancealPurhcase)

module.exports = router;