const jwt = require('jsonwebtoken');

exports.validateUser = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1]
    
    
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(404);
        req.user = user;
        next()
    })

}
