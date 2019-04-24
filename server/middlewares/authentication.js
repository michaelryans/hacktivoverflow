const {jwtVerify} = require('../helpers/jwt')
const User = require('../models/user')
module.exports = {
    isLogin(req,res,next) {
        // console.log(req.headers.token)
        // console.log('-------------------------- token')
        // console.log('masuk isLogin  - authen')
        
        try {
            decoded = jwtVerify(req.headers.token, process.env.JWT_SECRET)
            // console.log(decoded)
            // console.log('------deccoded middlewares authentication')

            User.find({
                email:decoded.email
            })
            .then(found => {
                if(found) {
                    req.decoded = decoded
                    next()
                } else {
                    res.status(401).json('not authenticated')
                }
            })

            // req.decoded = decoded
            // next()
        }
        catch {
            res.status(401).json({
                message:"token not valid"
            })
            // console.log('lewat catch jwt verify - authen')
        }
    }
}