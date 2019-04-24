const Answer = require('../models/answer')

class AnswerController {
    static create(req,res) {
        req.body.user = req.decoded._id
        // console.log(req.decoded)
        req.body.question = req.params.id

        Answer.create(req.body)
        .then(data => {
            // console.log(data)
            // console.log('answer create---------')
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message:"error creating new answer - server",
                error:err,
            })
        })
    }


    static update(req,res) {
        // console.log(req.params.id)
        // console.log('---req params id update answer')
        Answer.findOneAndUpdate({
            _id:req.params.id
        }, req.body, {new:true})
        .populate('user')
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                message:"error updating new answer - server",
                error:err,
            })
        })

    }

    static delete(req,res) {
        // console.log('=========================================')
        // console.log(req.params.id)
        // console.log('reqparams id ----- answer')
        Answer.findOneAndDelete({
            _id:req.params.id
        })
        .then(()=> {
            console.log('masuk then')
            res.status(200).json({
                message:"delete answer successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                message:"failed delete answer",
                error:err,
            })
        })
    }

    static findAll(req,res) {
        Answer.find()
        .then(found => {
            res.stauts(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message:"error findAll answer",
                error:err,
            })
        })
    }

    static findOne(req,res) {
        Answer.findOne({
            _id:req.params.id
        })
        .then(found => {
            res.status(200).json(found);
        })
        .catch(err=> {
            res.status(500).json({
                message:"error di findOne answer",
                error:err,
            })
        })
    }
    
    static findByQuestionId(req,res) {
        Answer.find({
            question:req.params.id
        })
        .populate('user')
        .then(found => {
            res.status(200).json(found);
        })
        .catch(err => {
            res.status(500).json({
                message:"error di findOne by question Id",
                error:err,
            })
        })
    }
}

module.exports = AnswerController