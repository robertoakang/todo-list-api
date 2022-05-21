class SingupController {
  async handle (httpRequest) {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          body: new Error(`Missing params: ${field}`),
          statusCode: 400
        }
      }
    }
  }
}

module.exports = SingupController
