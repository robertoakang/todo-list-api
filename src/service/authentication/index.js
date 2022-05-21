const jwt = require('jsonwebtoken')
const { secretJwt } = require('../../config')

class AuthenticationService {
  generateTokens (payload) {
    return {
      token: jwt.sign(payload, secretJwt, {
        expiresIn: '2h'
      }),
      refreshToken: jwt.sign(payload, 'refreshSecret', {
        expiresIn: '4h'
      })
    }
  }
}

module.exports = AuthenticationService
