const express = require('express');
const router = express.Router();
const { validateUser } = require('../Jwt/secureUser');
const { uploadProfile, removeProfile, getProfile } = require('../controllers/profile');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const dirPath = path.join(__dirname, '../public/images');
      console.log(dirPath, 'workingggggggggggggggg');
      console.log(req.body, 'bodydd');
      console.log(file, 'fileeeeeee');

      if (!fs.existsSync(dirPath)) {
         fs.mkdirSync(dirPath, { recursive: true });
      }
      cb(null, dirPath)
   },
   filename: function (req, file, cb) {
      cb(null, req.user._id + `${file.originalname}`)
   }
})

const upload = multer({ storage: storage })


router.post('/uploadProfile', validateUser, upload.single('profile'), uploadProfile)
router.post('/removeProfile', validateUser, removeProfile)
router.get('/getProfile', validateUser, getProfile)

module.exports = router;