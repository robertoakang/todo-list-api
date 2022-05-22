const AuthenticationService = new (require('../../service/authentication'))()

exports.verifyUserJwt = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      status: 401,
      message: 'Token not provided'
    })
  }

  try {
    const [, token] = authorization.split(' ')
    const decodedToken = AuthenticationService.verifyUserByJWT(token)
    req.user = { ...decodedToken }
    next()
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: 'Token authentication failed' })
  }
}
