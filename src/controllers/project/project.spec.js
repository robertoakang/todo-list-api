const ProjectController = require('./project')
const { MissingParamError } = require('../../errors')

const makeProjectServiceStub = () => {
  class ProjectServiceStub {
    async create (name, userId) {
      return await new Promise(resolve => resolve(true))
    }

    async findAllByUser (userId) {
      return await new Promise(resolve => resolve(true))
    }

    async remove (id) {
      return await new Promise(resolve => resolve(true))
    }

    async findById (id) {
      return await new Promise(resolve => resolve(true))
    }

    async updateById (id) {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new ProjectServiceStub()
}

const makeSut = () => {
  const projectServiceStub = makeProjectServiceStub()
  const sut = new ProjectController(projectServiceStub)
  return {
    sut,
    projectServiceStub
  }
}

describe('Project Controller', () => {
  test('Should returns 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {},
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.createProject(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should returns 201 if created project successfuly', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_project'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.createProject(httpRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({ message: 'Project created sucessfully' })
  })

  test('Should returns 200 if get project successfuly', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.getProjects(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should returns 200 if destroy project successfuly', async () => {
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
    expect(httpResponse.body).toEqual({ message: 'Deleted project with success' })
  })

  test('Should returns 200 if get project by id successfuly', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'any_id'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.getProjectById(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should returns 200 if update project successfuly', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      },
      params: {
        id: 'any_id'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.update(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
