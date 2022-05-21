const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  port: process.env.PORT || 5050,
  secretJwt: process.env.SECRET_JWT
}
