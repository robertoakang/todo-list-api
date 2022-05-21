const SignupController = require('../../controllers/user/signup/signup')
const EmailValidatorAdapter = require('../../utils/email-validator-adapter')
const AccountService = require('../../service/account')
const AuthenticationService = require('../../service/authentication')

const makeSignUpController = () => {
  const emailValidator = new EmailValidatorAdapter()
  const accountService = new AccountService()
  const authenticationService = new AuthenticationService()
  return new SignupController(emailValidator, accountService, authenticationService)
}

module.exports = makeSignUpController
