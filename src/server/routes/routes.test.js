
const MongoHandler = require('../../db/connection')
const request = require('supertest')
const app = require('../app')

describe('SignUp Routes', () => {
  let payloadAndToken = ''
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

  test('Should check the app', async () => {
    await request(app)
      .get('/api/v1/healthcheck')
      .expect(200)
  })

  test('Should register and return the tokens on success', async () => {
    await request(app)
      .post('/api/v1/user/signup')
      .send({
        name: 'Roberto',
        email: 'betoakang@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(201)
  })

  test('Should return the tokens on success', async () => {
    const result = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'betoakang@gmail.com',
        password: '123'
      })

    payloadAndToken = result._body
    expect(result.statusCode).toBe(200)
  })

  test('Should return the token and payload on success', async () => {
    console.log(payloadAndToken)
    await request(app)
      .post('/api/v1/user/refresh')
      .send({
        payload: {
          id: 'valid_id',
          name: 'Roberto',
          email: 'betoakang@gmail.com'
        },
        refreshToken: payloadAndToken.refreshToken
      })
      .expect(200)
  })
})
