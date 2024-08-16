const Users = require('../modals/user')
const jwt = require('jsonwebtoken');





exports.getLogedInUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        let userFound = await Users.findOne({  email:email })

        if (userFound?.email !== email) {
            res.send({error:'incorrect email'})
            return;
        }
        if (userFound?.password !== password) {
            res.send({error:'incorrect password'})
            return;
        }
        if (userFound) {

            let token = jwt.sign({ email: userFound.email, _id: userFound._id }, process.env.ACCESS_SECRET_TOKEN)
            res.send({ jwtToken: token })

        } 

    } catch (error) {
        console.log(error.message, 'logedinUser');

    }
}


exports.createUser = async (req, res) => {

    const { name, lastName, email, password } = req.body

    try {
        let isExistingUser = await Users.findOne({ email: email })
        if (isExistingUser) {
            res.send('user already exists')
            return;
        }
        let userFound = await Users.create({ name, email, lastName, password })

        let token = jwt.sign({ email: userFound.email, _id: userFound._id }, process.env.ACCESS_SECRET_TOKEN)

        res.send({ jwtToken: token })

    } catch (error) {
        console.log(error.message, 'createUser');

    }

}

