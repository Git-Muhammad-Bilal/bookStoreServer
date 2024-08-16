const express = require('express');
const mongoose = require('mongoose');
const serverless = require("serverless-http");
const app = express();
const path = require('path');
require('dotenv').config()
let cors = require('cors');
let bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.static( 'profileImages'));
// app.use(express.static('profileImages'))
// app.use(cors("http://localhost:3000"));
app.use(cors("https://bbookstore.netlify.app"));

const profileRoutes = require('../routes/profileRoutes')
const userRoutes = require('../routes/userRoutes')
const booksRoutes = require('../routes/fetchBooksRoutes')
const purchasesRoutes = require('../routes/purhcasesRoutes')
const favoriteBooksRoutes = require('../routes/favoriteRoutes')


app.use(profileRoutes)
app.use(userRoutes)
app.use(booksRoutes)
app.use(purchasesRoutes)
app.use(favoriteBooksRoutes)



mongoose.connect(process.env.DATABASE_URI).then((result) => {
  console.log('connected');
 
}).catch(err => {
  console.log(err);
})


module.exports.handler = serverless(app);