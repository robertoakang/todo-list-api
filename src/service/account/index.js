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

  async findUserByEmail (email, password) {
    const user = await User.findOne({ email })
    if (user) {
      const matchCompare = bcrypt.compareSync(password, user.password)
      if (!matchCompare) return false
      return user
    }
    return false
  }
}

module.exports = AccountService
