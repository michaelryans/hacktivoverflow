const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports = {
    isAuthorizedQuestion(req,res,next) {
        // console.log('req params id question ---------')
        // console.log(req.params.id)

        Question.findOne({
            _id:req.params.id
        })
        .then(found => {
            // console.log('id user di question ------')
            // console.log(found.user)
            // console.log('user tercantum di decoded----------')
            // console.log(req.decoded._id)

            if(found.user == req.decoded._id) {
                next()
            } else {
                res.status(403).json({
                    message:'not authorized',
                    error: err,
                })
            }
        })
        .catch(err => {
            res.status(403).json({
                message:'not authorized',
                error: err,
            })
        })
        

        // next()
    },
    isAuthorizedAnswer(req,res,next) {
        Answer.findOne({
            _id:req.params.id
        })
        .then(found => {
            // console.log('id user di answer ------')
            // console.log(found.user)
            // console.log('user tercantum di decoded----------')
            // console.log(req.decoded._id)

            if(found.user == req.decoded._id) {
                next()
            } else {
                res.status(403).json({
                    message:'not authorized',
                    error: err,
                })
            }
        })
        .catch(err => {
            res.status(403).json({
                message:'not authorized',
                error: err,
            })
        })

        // next()
    }
}