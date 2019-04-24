const chai = require('chai');
const expect = chai.expect

//import app
var app = require('../app.js')

//chai-http
const chaiHttp = require('chai-http');
chai.use(chaiHttp)


const User = require('../models/user')

before(function() {
    User.deleteMany({} ,() => {
        console.log('successfully deleted user database - before hooks')
    })
})

describe('User model', function() {
    describe('User registration', function() {
        it('should return with registered user', function(done) {
            let registration_obj = {
                email: "michael@yahoo.com",
                password: "hahaha",
                name: "michael ryan"
            }
            
            chai.request(app)
            .post('/users')
            .send(registration_obj)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('email')
                expect(res.body.password).to.not.equal(registration_obj.password)
                done()
            })
        })

        it('should return with error - user already registered', function(done) {
            let email_registered = {
                email: "michael@yahoo.com",
                password: "hahaha",
                name: "michael ryan"
            }

            chai.request(app)
            .post('/users')
            .send(email_registered)
            .end((err,res) => {
                // console.log(res.body)
                // console.log('0------------registered email')
                expect(err).to.be.null
                expect(res).to.have.status(500)
                expect(res.body.error.errors.email.message).to.equal('email is registered')
                done()
            })
        })


        it('should return with invalid email format', function(done) {
            let invalid_email_obj = {
                email: "michaelyahoo.com",
                password: "hahaha",
                name: "michael ryan"
            }

            chai.request(app)
            .post('/users')
            .send(invalid_email_obj)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(500)
                expect(res.body.error.errors.email.message).to.equal('email format is not valid')
                done()
            })
        })
    })


    describe('User login', function() {
        it('should return with token', function(done) {
            let obj_login = {
                email: 'michael@yahoo.com',
                password: 'hahaha',
            }

            chai.request(app)
            .post('/users/login')
            .send(obj_login)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.token).to.be.a('string')
                //console.log(res.body.token) 
                done()
            })
        })

        it('should return with wrong credentials', function(done) {
            let wrong_credential_obj = {
                email: 'michael@yahoo.com',
                password: 'haiii',
            }

            chai.request(app)
            .post('/users/login')
            .send(wrong_credential_obj)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(401)
                expect(res.body.message).to.equal('wrong email/password')
                done()
            })
        })
    })
})
