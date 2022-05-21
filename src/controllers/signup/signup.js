class SingupController {
  async handle (httpRequest) {
    return {
      body: new Error('Missing params: name'),
      statusCode: 400
    }
  }
}

module.exports = SingupController
