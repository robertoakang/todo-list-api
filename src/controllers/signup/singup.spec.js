const SingupController = require('./signup')

// const makeFakeRequest = () => ({
//   body: {
//     name: 'any_name',
//     email: 'any_email@mail.com',
//     password: 'any_password',
//     passwordConfirmation: 'any_password'
//   }
// })

describe('Signup Controller', () => {
  test('Should returns 400 if no name is provided', async () => {
    const sut = new SingupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing params: name'))
  })
})
