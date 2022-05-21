const { ServerError } = require('../../errors')

exports.badRequest = (error) => ({
  statusCode: 400,
  body: error
})

exports.serverError = (error) => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
