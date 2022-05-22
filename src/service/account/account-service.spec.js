const AccountService = require('.')
const MongoHandler = require('../../db/connection')

const makeSut = () => {
  return new AccountService()
}

describe('Account Service', () => {
  const mongoHandler = new MongoHandler(process.env.MONGO_URL)

  beforeAll(() => {
    mongoHandler.connect()
  })

  afterAll(() => {
    mongoHandler.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })

  test('Should return an user on success', async () => {
    const sut = makeSut()
    const request = {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const user = await sut.findUserByEmail(request.email, request.password)

    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
  })

  test('Should return false on error', async () => {
    const sut = makeSut()
    const request = {
      email: 'any_email@mail.com',
      password: 'any_password_incorrect'
    }
    const user = await sut.findUserByEmail(request.email, request.password)

    expect(user.id).toBeFalsy()
  })
})
