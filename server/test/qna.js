const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect

//import app here
var app = require('../app.js')
chai.use(chaiHttp)

// //models
const Question = require('../models/question')
const Answer = require('../models/answer')


//hooks
before(function() {
    Question.deleteMany({}, ()=> {
        console.log('successfully deleted question from db')
        Answer.deleteMany({},()=> {
            console.log('successfully deleted answer from db')
        })
    })
})




let question_id;
let answer_id;
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2JiMWQ5YjQ2YTFkMDA0N2Y1NzY1YzMiLCJlbWFpbCI6Im1pY2hhZWxAeWFob28uY29tIiwibmFtZSI6Im1pY2hhZWwgcnlhbiIsImlhdCI6MTU1NTc2NjY4M30.NBk0O4my7wMOBM2_uLK4tv85yaZICmrFLGC1K5OaZ7M"
describe('Question and Answer', function() {
    describe('create', function() {
        
        it('should return with created question', function(done) {
            let base_question = {
                question: "hacktiv-overflow?",
                description: "portofolio week 3",
                upvote: 3,
                downvote: 1,
            }

            chai.request(app)
            .post('/questions')
            .set('token',token)
            .send(base_question)
            .end((err,res) => {
                // console.log('question -----')
                // console.log(res.body)
                expect(err).to.be.null
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('question')
                // console.log(res.body._id)
                question_id = res.body._id
                done()
            })
        })


        it('should return with created answer', function(done) {
            let base_answer = {
                answer: 'lalala',
                description: 'semangat yaaa',
                upvote: 0,
                downvote: 0,
                question: question_id,
            }

            // console.log(question_id)
            // console.log('----question id - test')

            chai.request(app)
            .post('/answers')
            .set('token',token)
            .send(base_answer)
            .end((err,res) => {
                // console.log('answer created -----')
                // console.log(res.body)
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                answer_id = res.body._id
                done()
            })
        }) 
    })
    
    describe('read qna', function() {
        it('should return with all questions', function(done) {

            chai.request(app)
            .get('/questions')
            .end((err,res) => {
                expect(err).to.be.null
                expect(res.body).to.be.an('array')
                done()
            })
        })

        it('should return with one question by question id', function(done) {
            chai.request(app)
            .get('/questions/' + question_id)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('question')
                done()
            })
        })

        it('should return with answers of specific question id', function(done) {
            chai.request(app)
            .get('/answers/question/' + question_id)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res.body).to.be.an('array')
                done()
            })
        })

        it('should return with specific question based on question id', function (done) {
            chai.request(app)
            .get('/questions/' + question_id)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('question')
                done()
            })
        })

        it('should return one answer by answer_id', function(done) {

            chai.request(app)
            .get('/answers/' + answer_id)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('answer')
                done()
            })
        })

        // it('should return with answers from specific users', function(done) {
        //     chai.request(app)
        //     .get('/answers')
        //     .end((err,res) => {
        //         expect(err).to.be.null
        //         expect(res.body).to.be.an('array')
        //         done()
        //     })
        // })

        

        
    })


    describe('update qna', function() {
        it('should return with updated question', function(done) {
            let update_question = {
                question: "updated nyahahahah?"
            }

            chai.request(app)
            .patch('/questions/' + question_id)
            .set('token',token)
            .send(update_question)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.question).to.equal(update_question.question)
                done()
            })
        })

        it('should return with updated answer', function(done) {
            let update_answer = {
                answer: "answer updated, semangatttt"
            }

            chai.request(app)
            .patch('/answers/' + answer_id )
            .set('token',token)
            .send(update_answer)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.answer).to.equal(update_answer.answer)
                done()
            })
        })
    })

    describe('delete question and answer', function() {
        it('should return status 200 message delete question', function(done) {
            chai.request(app)
            .delete('/questions/' + question_id)
            .set('token',token)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res.body.message).to.equal('delete question successfully')
                expect(res.body).to.be.an('object')
                done()
            })
        })

        it('should return status 200, message delete answer', function(done) {
            chai.request(app)
            .delete('/answers/' + answer_id)
            .set('token',token)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res.body.message).to.equal('delete answer successfully')
                expect(res.body).to.be.an('object')
                done()
            })
        })
    })
})
