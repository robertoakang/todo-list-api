const express = require('express')
const routes = require('../routes')

function setupMiddlewares (app) {
  app.use(express.json())
  app.use((req, res, next) => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-methods', '*')
    res.set('access-control-allow-headers', '*')
    res.type('json')
    next()
  })
  app.use('/api/v1', routes)
}

module.exports = setupMiddlewares
