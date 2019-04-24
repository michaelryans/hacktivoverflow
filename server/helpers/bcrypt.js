const bcrypt = require('bcryptjs');

module.exports = {
    bcryptHash(input) {
        const hashed = bcrypt.hashSync(input, 10)
        return hashed;
    },
    bcryptCompare(plain,hashed) {
        try {
            const isLogin = bcrypt.compareSync(plain, hashed)
            return isLogin;
        } 
        catch {
            throw new Error('wrong password')
        }
    }
}