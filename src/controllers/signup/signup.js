const { badRequest, serverError } = require('../../helpers/http/http-helper')
const { MissingParamError, InvalidParamError } = require('../../errors')

class SingupController {
  constructor (emailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest) {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}

module.exports = SingupController
