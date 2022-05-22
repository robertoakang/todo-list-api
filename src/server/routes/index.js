const express = require('express')
const makeSignUpController = require('../../factories/user/signup/signup')
const makeLoginController = require('../../factories/user/login/login')
const makeProjectController = require('../../factories/project/project')
const makeTaskController = require('../../factories/task/task')
const adaptRoute = require('../adapters/express-routes-adapter')
const { verifyUserJwt } = require('../middlewares/auth-middleware')

const router = new express.Router()

router.get('/healthcheck', (req, res) => {
  res.json({
    message: 'API version 1.0.0'
  })
})

router.post('/users/signup', adaptRoute(makeSignUpController(), 'handle'))
router.post('/users/login', adaptRoute(makeLoginController(), 'handle'))
router.post('/users/refresh', adaptRoute(makeLoginController(), 'handleRefreshToken'))
router.post('/projects', verifyUserJwt, adaptRoute(makeProjectController(), 'createProject'))
router.get('/projects', verifyUserJwt, adaptRoute(makeProjectController(), 'getProjects'))
router.get('/projects/:id', verifyUserJwt, adaptRoute(makeProjectController(), 'getProjectById'))
router.put('/projects/:id', verifyUserJwt, adaptRoute(makeProjectController(), 'update'))
router.delete('/projects/:id', verifyUserJwt, adaptRoute(makeProjectController(), 'destroy'))
router.post('/tasks', verifyUserJwt, adaptRoute(makeTaskController(), 'createTask'))
router.delete('/tasks/:id', verifyUserJwt, adaptRoute(makeTaskController(), 'destroy'))
router.put('/tasks/:id', verifyUserJwt, adaptRoute(makeTaskController(), 'finishTask'))

module.exports = router
