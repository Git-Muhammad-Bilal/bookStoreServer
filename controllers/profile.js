const Users = require('../modals/user')
const fs = require('fs');
const path = require('path');

exports.getProfile = async (req, res, next) => {
  try {
    
    let user = await Users.findOne({ _id: req.user._id })

    res.send(user.profile)
    
  } catch (error) {
    res.send(error.message)
  }

}
exports.uploadProfile = async (req, res) => {

  try {
    console.log(req.user, 'user');
    
    let users = await Users.updateOne({ _id: req.user._id }, { $set: { 'profile': req.file?.filename } })
    console.log(users, 'userssssssss');
    res.send(req?.file)
  } catch (error) {
    res.send(error.message)
  }
  
}
exports.removeProfile = async (req, res) => {
  const user = req.user;
  const fileName = req.body.profile
  const dirPath = path.join(__dirname, '../profileImages');

  try {
    await Users.updateOne({ _id: user._id }, { $set: { 'profile': '' } })
    fs.unlink(dirPath + '/' + fileName, (err) => {
      if (err) {
        throw err;
      }

      console.log("Delete File successfully.");
      res.send("Delete File successfully.")
    });
  } catch (error) {
    res.send(error.message)
  }
}