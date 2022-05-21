const { badRequest } = require('../../helpers/http/http-helper')
const { MissingParamError } = require('../../errors')

class SingupController {
  async handle (httpRequest) {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}

module.exports = SingupController
