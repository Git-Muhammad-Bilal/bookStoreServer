const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

let cors = require('cors');

const server = require('http').createServer(app)

let bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(express.static('profileImages'))
app.use(cors("http://localhost:3000"));



const profileRoutes = require('./routes/profileRoutes')
const userRoutes = require('./routes/userRoutes')
const booksRoutes = require('./routes/fetchBooksRoutes')
const purchasesRoutes = require('./routes/purhcasesRoutes')
const favoriteBooksRoutes = require('./routes/favoriteRoutes')


app.use(profileRoutes)
app.use(userRoutes)
app.use(booksRoutes)
app.use(purchasesRoutes)
app.use(favoriteBooksRoutes)


let port =3001 || 8080

mongoose.connect(process.env.DATABASE_URI).then((result) => {
  console.log('connected');
  server.listen(port, (err) => {
    console.log('listning on port 3001');
  })


}).catch(err => {
  console.log(err);
})

