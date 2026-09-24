const express = require('express')

const {
    loginUser,
    signupUser,
    getUser

} = require('../controllers/userControllers')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)
router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/me', getUser)

module.exports = router 
