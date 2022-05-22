const TaskController = require('./task')
const { MissingParamError } = require('../../errors')

const makeProjectServiceStub = () => {
  class ProjectServiceStub {
    async associateTask (taskId, projectId) {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new ProjectServiceStub()
}

const makeTaskServiceStub = () => {
  class TaskServiceStub {
    async create (name) {
      return await new Promise(resolve => resolve(true))
    }

    async findById (id, userId) {
      return await new Promise(resolve => resolve(true))
    }

    async updateById (id, name, finished_at, status) {
      return await new Promise(resolve => resolve(true))
    }

    async remove (id) {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new TaskServiceStub()
}

const makeSut = () => {
  const projectServiceStub = makeProjectServiceStub()
  const taskServiceStub = makeTaskServiceStub()
  const sut = new TaskController(taskServiceStub, projectServiceStub)
  return {
    sut,
    taskServiceStub
  }
}

describe('Task Controller', () => {
  test('Should returns 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        projectId: 'any_project'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.createTask(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should returns 400 if no projectId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.createTask(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('projectId'))
  })

  test('Should returns 201 if created task successfuly', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        projectId: 'any_project'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.createTask(httpRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({ message: 'Task successfully created' })
  })

  test('Should returns 200 if destroy task successfuly', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'any_id'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.destroy(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ message: 'Task successfully deleted' })
  })

  test('Should returns 400 if finished_at are not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        status: 2
      },
      params: {
        id: 'any_id'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.finishTask(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('finished_at'))
  })

  test('Should returns 400 if status are not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        finished_at: new Date()
      },
      params: {
        id: 'any_id'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.finishTask(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('status'))
  })

  test('Should returns 200 if update task successfuly', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        finished_at: new Date(),
        status: 2
      },
      params: {
        id: 'any_id'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.finishTask(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
