const jwt = require('jsonwebtoken');

module.exports = {
    jwtVerify(input) {
        try {
            const decoded = jwt.verify(input, process.env.JWT_SECRET)
            return decoded;
        }
        catch {
            res.status(401).json({
                message:'false token'
            })
        }
    },
    jwtSign(input) {
        const token = jwt.sign(input, process.env.JWT_SECRET)
        return token;
    }
}