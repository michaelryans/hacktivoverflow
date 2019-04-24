const User = require('../models/user')
const {jwtSign} = require('../helpers/jwt')
const {bcryptCompare} = require('../helpers/bcrypt')
const transporter = require('../helpers/nodemailer')
const kue = require('kue')
const queue = kue.createQueue();

const email_obj = {
    from: 'michaelrs.mailer@gmail.com',
    subject: "welcome",
    html: '<p>halooo ini tes yang sesungguhnya dengan kue</p>'
  }

queue.process('email', function(job, done){
    email_obj.to = job.data.to
    transporter.sendMail(email_obj, function(error, info) {
        if(error) {
            return console.log(error)
        } else {
            done ()
        }
    })
  });
  

class UserController {
    static register(req,res) {
        // console.log('masuk sini hlhoo')
        // console.log(req.body)
        User.create(req.body)
        .then(created => {
            res.status(201).json(created)

            var job = queue.create('email-register', {to: created.email})
            .save( function(err){
               if( !err ) console.log( job.id );
            });
        })
        .catch(err => {
            res.status(500).json({
                message:"error on register user",
                error:err,
            })
        })
    }

    static login(req,res) {
        // console.log("------masuk login")
        User.findOne({
            email:req.body.email
        })
        .then(found => {
            // console.log(req.body.password)
            // console.log(bcryptCompare)
            // console.log("masuk then -----------")
            if(found) {
                const compared = bcryptCompare(req.body.password, found.password)
                // console.log(compared)
                // console.log('compared')
                if(compared) {
                    // console.log("masuk compared")
                    let data_user = {
                        _id: found._id,
                        email: found.email,
                        name: found.name,
                    }

                    const token = jwtSign(data_user)
                    console.log(token)
                    console.log("---------------------token")

                    res.status(200).json({
                        token:token,
                        _id:found._id
                    })
                } else {
                    res.status(401).json({
                        message:'wrong email/password'
                    })
                }
            } else {
                res.status(401).json({
                    message:'wrong email/password'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message:"error in login",
            })
        })
    }

}

module.exports = UserController