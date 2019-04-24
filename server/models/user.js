const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {bcryptHash} = require('../helpers/bcrypt')
const userSchema = new Schema({
    email: {
        type:String,
        required: [true, 'email must be provided'],
        validate: [{
            validator(email) {
                return User.findOne({
                    email:email
                })
                .then(found => {
                    if(found) return false
                })
            },
            message:"email is registered"
        },{
            validator(email) {
                const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                return regex.test(email)
            },
            message:"email format is not valid"
        }]
    },
    password: {
        type:String,
        required: [true, 'password must be provided'],
    },
    name: {
        type:String,
    }
});

userSchema.pre('save',function(next) {
    this.password = bcryptHash(this.password)
    next();
})

const User = mongoose.model('User', userSchema)
module.exports = User