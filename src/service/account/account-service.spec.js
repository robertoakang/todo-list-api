const AccountService = require('.')
const MongoHandler = require('../../db/connection')

const makeSut = () => {
  return new AccountService()
}

describe('Account Service', () => {
  const mongoHandler = new MongoHandler(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  beforeAll(async () => {
    await mongoHandler.connect(process.env.MONGO_UR)
  })

  afterAll(async () => {
    mongoHandler.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = mongoHandler.getCollection('User')
    await accountCollection.deleteMany({})
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
