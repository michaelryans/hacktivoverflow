const router = require('express').Router()
const answerRouter = require('./answer')
const questionRouter = require('./question')
const userRouter = require('./user')

router.use('/answers', answerRouter)
router.use('/questions', questionRouter)
router.use('/users', userRouter)

module.exports = router