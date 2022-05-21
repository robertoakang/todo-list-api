const { badRequest, serverError, ok, unauthorized } = require('../../helpers/http/http-helper')
const { MissingParamError } = require('../../errors')

class LoginController {
  constructor (accountService, authenticationService) {
    this.accountService = accountService
    this.authenticationService = authenticationService
  }

  async handle (httpRequest) {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body
      const user = await this.accountService.findUserByEmail(email, password)

      if (!user) {
        return unauthorized()
      }

      const payload = { id: user.id, name: user.name, email }
      const tokens = this.authenticationService.generateTokens(payload)
      return ok({ ...tokens, name: user.name })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}

module.exports = LoginController
