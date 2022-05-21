const { badRequest, serverError } = require('../../helpers/http/http-helper')
const { MissingParamError, InvalidParamError } = require('../../errors')

class SingupController {
  constructor (emailValidator, accountService) {
    this.emailValidator = emailValidator
    this.accountService = accountService
  }

  async handle (httpRequest) {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.accountService.add({ name, email, password })
      return account
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}

module.exports = SingupController
