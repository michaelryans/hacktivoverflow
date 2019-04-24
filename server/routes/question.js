const router = require('express').Router()
const controller = require('../controllers/question')
const {isLogin} = require('../middlewares/authentication')
const {isAuthorizedQuestion} = require('../middlewares/authorization')

router.post('/', isLogin, controller.create)
router.patch('/:id', isLogin, isAuthorizedQuestion, controller.update)
router.delete('/:id', isLogin, isAuthorizedQuestion, controller.delete)
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)

router.patch('/:id/vote', isLogin, controller.updateVote)

module.exports = router;