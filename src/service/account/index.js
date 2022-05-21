const User = require('../../db/models/User')
const { saltRoundsHash } = require('../../config')
const bcrypt = require('bcrypt')

class AccountService {
  async add ({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password, saltRoundsHash)
    return await User.create({
      name,
      email,
      password: hashedPassword
    })
  }
}

module.exports = AccountService
