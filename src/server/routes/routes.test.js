
const MongoHandler = require('../../db/connection')
const request = require('supertest')
const app = require('../app')
const User = require('../../db/models/User')

describe('SignUp Routes', () => {
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

  test('Should check the app', async () => {
    await request(app)
      .get('/api/v1/healthcheck')
      .expect(200)
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
