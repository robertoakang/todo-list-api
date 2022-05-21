const { ServerError, Unauthorized } = require('../../errors')

exports.ok = (body) => ({
  statusCode: 200,
  body
})

exports.okCreated = (body) => ({
  statusCode: 201,
  body
})

exports.badRequest = (error) => ({
  statusCode: 400,
  body: error
})

exports.serverError = () => ({
  statusCode: 500,
  body: new ServerError()
})

exports.unauthorized = () => ({
  statusCode: 401,
  body: new Unauthorized()
})
