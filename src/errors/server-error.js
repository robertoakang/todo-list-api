class ServerError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'ServerError'
  }
}

module.exports = ServerError
