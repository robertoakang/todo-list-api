const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  port: process.env.PORT || 5050,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost/todo-list',
  saltRoundsHash: parseInt(process.env.SALT_ROUNDS_HASH, 10) || 12,
  secretJwt: process.env.SECRET_JWT
}
