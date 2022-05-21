const express = require('express')
const routes = require('./routes')
const setupMiddlewares = require('./middlewares')

const app = express()
setupMiddlewares(app)
app.use('/api/v1', routes)

module.exports = app
