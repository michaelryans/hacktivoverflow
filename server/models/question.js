const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question:{
        type:String,
    },
    description: {
        type:String,
    },
    upvote: {
        type: Number,
    },
    downvote: {
        type: Number,
    },
    user: {type:Schema.Types.ObjectId, ref: 'User'},
    tags: [{type:String}]
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question;