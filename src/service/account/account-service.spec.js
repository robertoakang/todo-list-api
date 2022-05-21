const AccountService = require('.')
const MongoHandler = require('../../db/connection')
const User = require('../../db/models/User')

const makeSut = () => {
  return new AccountService()
}

describe('Account Service', () => {
  const mongoHandler = new MongoHandler(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  beforeAll(() => {
    mongoHandler.connect()
  })

  afterAll(() => {
    mongoHandler.disconnect()
  })

  beforeEach(async () => {
    await User.deleteMany({})
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
})
