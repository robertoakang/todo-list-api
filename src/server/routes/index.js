const express = require('express')
const makeSignUpController = require('../../factories/signup/signup')
const makeLoginController = require('../../factories/login/login')
const adaptRoute = require('../adapters/express-routes-adapter')

const router = new express.Router()

router.get('/healthcheck', (req, res) => {
  res.json({
    message: 'API version 1.0.0'
  })
})

router.post('/user/signup', adaptRoute(makeSignUpController(), 'handle'))
router.post('/user/login', adaptRoute(makeLoginController(), 'handle'))
router.post('/user/refresh', adaptRoute(makeLoginController(), 'handleRefreshToken'))

module.exports = router
