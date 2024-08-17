const Users = require('../modals/user')
const fs = require('fs');
const path = require('path');

exports.getProfile = async (req, res, next) => {
  try {
    let user = await Users.findOne({ _id: req.user._id })
    const { name, lastName, email, profile } = user;
    
    res.send({  name, lastName, email , profile})


  } catch (error) {
    res.send(error.message)
  }

}
exports.uploadProfile = async (req, res) => {

  try {

    let user = await Users.findOneAndUpdate({ _id: req.user._id }, { $set: { 'profile': req.file?.filename } })
    res.send(req?.file?.filename)
  
  } catch (error) {
    res.send(error.message)
  }

}
exports.removeProfile = async (req, res) => {
  const user = req.user;
  const fileName = req.body.profile
  const dirPath = path.join(__dirname, '../../public/images');

  try {
    await Users.updateOne({ _id: user._id }, { $set: { 'profile': '' } })
    fs.unlink(`${dirPath}/ ${fileName}`, (err) => {
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