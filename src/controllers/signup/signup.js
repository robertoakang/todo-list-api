const { badRequest } = require('../../helpers/http/http-helper')
const { MissingParamError, InvalidParamError } = require('../../errors')

class SingupController {
  constructor (emailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest) {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}

module.exports = SingupController
