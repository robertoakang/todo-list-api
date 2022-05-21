const LoginController = require('../../controllers/login/login')
const AccountService = require('../../service/account')
const AuthenticationService = require('../../service/authentication')

const makeLoginController = () => {
  const accountService = new AccountService()
  const authenticationService = new AuthenticationService()
  return new LoginController(accountService, authenticationService)
}

module.exports = makeLoginController
