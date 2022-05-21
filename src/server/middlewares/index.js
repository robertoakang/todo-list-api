const express = require('express')
const routes = require('../routes')
const cors = require('cors')

function setupMiddlewares (app) {
  app.use(express.json())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
  app.use(cors())
  app.use('/api/v1', routes)
}

module.exports = setupMiddlewares
