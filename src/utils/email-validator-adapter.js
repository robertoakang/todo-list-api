const validator = require('validator')

class EmailValidatorAdapter {
  isValid (email) {
    return validator.isEmail(email)
  }
}

module.exports = EmailValidatorAdapter
