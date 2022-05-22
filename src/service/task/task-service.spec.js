const TaskService = require('.')
const MongoHandler = require('../../db/connection')

const makeSut = () => {
  return new TaskService()
}

describe('Task Service', () => {
  let insertedTask = ''
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

  test('Should create new task', async () => {
    const sut = makeSut()
    const task = await sut.create('any_task')
    insertedTask = task
    expect(task).toBeTruthy()
  })

  test('Should update some task', async () => {
    const sut = makeSut()
    const task = await sut.updateById(insertedTask._id, 'another_any_name', new Date(), 2)
    expect(task).toBeTruthy()
  })

  test('Should remove some task', async () => {
    const sut = makeSut()
    const task = await sut.remove(insertedTask._id)
    expect(task).toBeTruthy()
  })
})
