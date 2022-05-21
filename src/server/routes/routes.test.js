
const MongoHandler = require('../../db/connection')
const request = require('supertest')
const app = require('../app')

describe('SignUp Routes', () => {
  const mongoHandler = new MongoHandler(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  beforeAll(() => {
    mongoHandler.connect(process.env.MONGO_URL)
  })

  afterAll(() => {
    mongoHandler.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = mongoHandler.getCollection('User')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/v1/signup')
      .send({
        name: 'Roberto',
        email: 'betoakang@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(201)
  })
})
