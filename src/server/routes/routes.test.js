
const MongoHandler = require('../../db/connection')
const request = require('supertest')
const app = require('../app')

describe('SignUp Routes', () => {
  let payloadAndToken = ''
  let project = ''
  const mongoHandler = new MongoHandler(process.env.MONGO_URL)

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
      .post('/api/v1/users/signup')
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
      .post('/api/v1/users/login')
      .send({
        email: 'betoakang@gmail.com',
        password: '123'
      })

    payloadAndToken = result._body
    expect(result.statusCode).toBe(200)
  })

  test('Should return the token and payload on success', async () => {
    await request(app)
      .post('/api/v1/users/refresh')
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

  test('Should return the create the project on success', async () => {
    await request(app)
      .post('/api/v1/projects')
      .set('Authorization', 'Bearer ' + payloadAndToken.token)
      .send({
        name: 'any_project'
      })
      .expect(201)
  })

  test('Should return the 401 with token is not provided', async () => {
    await request(app)
      .post('/api/v1/projects')
      .send({
        name: 'any_project'
      })
      .expect(401)
  })

  test('Should return the projects on success', async () => {
    const result = await request(app)
      .get('/api/v1/projects')
      .set('Authorization', 'Bearer ' + payloadAndToken.token)

    project = result._body.projects[0]
    expect(result.statusCode).toBe(200)
  })

  test('Should return the project info on success', async () => {
    await request(app)
      .get(`/api/v1/projects/${project._id}`)
      .set('Authorization', 'Bearer ' + payloadAndToken.token)
      .expect(200)
  })

  test('Should return 200 on success updated project', async () => {
    await request(app)
      .put(`/api/v1/projects/${project._id}`)
      .set('Authorization', 'Bearer ' + payloadAndToken.token)
      .expect(200)
  })

  test('Should return 201 on success created task', async () => {
    await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', 'Bearer ' + payloadAndToken.token)
      .send({
        name: 'any_task_name',
        projectId: project._id
      })
      .expect(201)
  })

  test('Should return the projects with tasks on success', async () => {
    const result = await request(app)
      .get('/api/v1/projects')
      .set('Authorization', 'Bearer ' + payloadAndToken.token)

    project = result._body.projects[0]
    expect(result.statusCode).toBe(200)
  })

  test('Should return 200 on success updated task', async () => {
    await request(app)
      .put(`/api/v1/tasks/${project.tasks[0]._id}`)
      .set('Authorization', 'Bearer ' + payloadAndToken.token)
      .send({
        finished_at: new Date(),
        status: 2
      })
      .expect(200)
  })

  test('Should return 200 on success deleted task', async () => {
    await request(app)
      .delete(`/api/v1/tasks/${project.tasks[0]._id}`)
      .set('Authorization', 'Bearer ' + payloadAndToken.token)
      .expect(200)
  })

  test('Should return 200 on success deleted project', async () => {
    await request(app)
      .delete(`/api/v1/projects/${project._id}`)
      .set('Authorization', 'Bearer ' + payloadAndToken.token)
      .expect(200)
  })
})
