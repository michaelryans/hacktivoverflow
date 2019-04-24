const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    question:{type:Schema.Types.ObjectId, ref:'Question'},
    user: {type:Schema.Types.ObjectId, ref: 'User'},
    answer:{
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
    // upvoter: [{type:Schema.Types.ObjectId, ref: 'User'}],
    // downvoter: [{type:Schema.Types.ObjectId, ref: 'User'}],
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer;