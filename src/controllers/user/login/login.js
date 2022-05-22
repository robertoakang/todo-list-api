const { badRequest, serverError, ok, unauthorized } = require('../../../helpers/http/http-helper')
const { MissingParamError } = require('../../../errors')

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
      return serverError()
    }
  }

  async handleRefreshToken (httpRequest) {
    try {
      const requiredFields = ['payload', 'refreshToken']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { payload, refreshToken } = httpRequest.body
      const isValid = this.authenticationService.verifyRefresh(payload, refreshToken)

      if (!isValid) {
        return unauthorized()
      }

      const { token } = this.authenticationService.generateTokens(payload)
      return ok({ token, payload })
    } catch (error) {
      return serverError()
    }
  }
}

module.exports = LoginController
