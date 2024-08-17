const express = require('express');
const mongoose = require('mongoose');
const serverless = require("serverless-http");
const app = express();
const path = require('path');
require('dotenv').config()
let cors = require('cors');
let bodyParser = require('body-parser');

const dirPath = path.join(__dirname, '../public/images');

app.use(bodyParser.json())
app.use('/images' , express.static(dirPath));
app.use(cors("http://localhost:3000"));

// app.use(cors("https://bbookstore.netlify.app"));

const profileRoutes = require('../routes/profileRoutes')
const userRoutes = require('../routes/userRoutes')
const booksRoutes = require('../routes/fetchBooksRoutes')
const purchasesRoutes = require('../routes/purhcasesRoutes')
const favoriteBooksRoutes = require('../routes/favoriteRoutes')


app.use('/api/',profileRoutes)
app.use('/api/',userRoutes)
app.use('/api/',booksRoutes)
app.use('/api/',purchasesRoutes)
app.use('/api/',favoriteBooksRoutes)



mongoose.connect(process.env.DATABASE_URI).then((result) => {
  console.log('connected');
//  app.listen(3001,()=>{
//   console.log('listining on port 3001');
  
//  })
}).catch(err => {
  console.log(err);
})


module.exports.handler = serverless(app);