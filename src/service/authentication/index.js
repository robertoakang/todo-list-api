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

  verifyRefresh (payload, refreshToken) {
    const decoded = jwt.verify(refreshToken, 'refreshSecret')
    return decoded.email === payload.email
  }

  verifyUserByJWT (token) {
    return jwt.verify(token, secretJwt)
  }
}

module.exports = AuthenticationService
