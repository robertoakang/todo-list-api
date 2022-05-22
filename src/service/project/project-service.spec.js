const ProjectService = require('.')
const mongoose = require('mongoose')
const MongoHandler = require('../../db/connection')

const makeSut = () => {
  return new ProjectService()
}

describe('Project Service', () => {
  const id = '123456789123'
  let insertedProject = ''
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

  test('Should save new project', async () => {
    const sut = makeSut()
    const project = await sut.create('any_project', mongoose.Types.ObjectId(id))

    expect(project).toBeTruthy()
  })

  test('Should return any projects', async () => {
    const sut = makeSut()
    const project = await sut.findAllByUser(mongoose.Types.ObjectId(id))
    insertedProject = project[0]
    expect(project).toBeTruthy()
  })

  test('Should return one projects', async () => {
    const sut = makeSut()
    const project = await sut.findById(insertedProject._id, mongoose.Types.ObjectId(id))
    expect(project).toBeTruthy()
  })

  test('Should update some project', async () => {
    const sut = makeSut()
    const project = await sut.updateById(insertedProject._id, 'another_any_name')
    expect(project).toBeTruthy()
  })

  test('Should associate a task for some project', async () => {
    const sut = makeSut()
    const project = await sut.associateTask(mongoose.Types.ObjectId(id), insertedProject._id)
    expect(project).toBeTruthy()
  })

  test('Should remove some project', async () => {
    const sut = makeSut()
    const project = await sut.updateById(insertedProject._id)
    expect(project).toBeTruthy()
  })
})
