const express = require('express')
const makeSignUpController = require('../../factories/signup/signup')
const makeLoginController = require('../../factories/login/login')
const adaptRoute = require('../adapters/express-routes-adapter')

const router = new express.Router()

router.get('/healthcheck', (req, res) => {
  res.json({
    message: 'API v1.0.0'
  })
})

router.post('/signup', adaptRoute(makeSignUpController()))
router.post('/login', adaptRoute(makeLoginController()))

module.exports = router
