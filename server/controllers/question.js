const Question = require('../models/question')

class QuestionController {
    static create(req,res) {
        req.body.user = req.decoded._id

        Question.create(req.body)
         .then(created => {
             res.status(201).json(created)
         })
         .catch(err => {
             res.status(500).json({
                 message:"error creating new question",
                 error: err
             })
         })
    }

    static update(req,res) {
        Question.findOneAndUpdate({
            _id:req.params.id
        }, req.body, {new:true})
        .populate('user')
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                message:"error in updating question",
                error:err,
            })
        })
    }

    static delete(req,res) {
        Question.findOneAndDelete({
            _id:req.params.id
        })
        .then(()=> {
            res.status(200).json({
                message:"delete question successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                message:"failed delete question",
                error:err,
            })
        })
    }

    static findAll(req,res) {
        Question.find()
        .populate('user')
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message:"error findAll questions",
                error:err,
            })
        })
    }

    static findOne(req,res) {
        // console.log('masuk findONe')
        // console.log(req.params.id)
        // console.log("-------------------------")
        Question.findOne({
            _id:req.params.id
        })
        .populate('user')
        .then(found=> {
            console.log(found)
            console.log('masuk found nih')
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message:"error findOne question",
                error:err,
            })
        })
    }

    static updateVote(req,res) {

    }

}

module.exports = QuestionController;