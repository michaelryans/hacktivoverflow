const router = require('express').Router();
const controller = require('../controllers/answer')
const {isLogin} = require('../middlewares/authentication')
const {isAuthorizedAnswer} = require('../middlewares/authorization')

// router.post('/', isLogin, controller.create)
router.post('/:id', isLogin, controller.create)
router.patch('/:id', isLogin, isAuthorizedAnswer, controller.update)
router.delete('/:id', isLogin, isAuthorizedAnswer, controller.delete)

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.get('/question/:id', controller.findByQuestionId)


module.exports = router;