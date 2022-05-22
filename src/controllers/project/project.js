const { MissingParamError } = require('../../errors')
const { okCreated, badRequest, serverError, ok } = require('../../helpers/http/http-helper')

class ProjectController {
  constructor (projectService) {
    this.projectService = projectService
  }

  async createProject (httpRequest) {
    try {
      if (!httpRequest.body.name) {
        return badRequest(new MissingParamError('name'))
      }

      await this.projectService.create(httpRequest.body.name, httpRequest.user.id)
      return okCreated({ message: 'Project successfully created' })
    } catch (error) {
      return serverError()
    }
  }

  async getProjects (httpRequest) {
    try {
      const projects = await this.projectService.findAllByUser(httpRequest.user.id)
      return ok({ projects })
    } catch (error) {
      return serverError()
    }
  }

  async destroy (httpRequest) {
    try {
      await this.projectService.remove(httpRequest.params.id)
      return ok({ message: 'Project successfully deleted' })
    } catch (error) {
      return serverError()
    }
  }

  async getProjectById (httpRequest) {
    try {
      const project = await this.projectService.findById(httpRequest.params.id, httpRequest.user.id)
      return ok({ project })
    } catch (error) {
      return serverError()
    }
  }

  async update (httpRequest) {
    try {
      await this.projectService.updateById(httpRequest.params.id, httpRequest.body.name)
      return ok({ message: 'Updated successfuly' })
    } catch (error) {
      return serverError()
    }
  }
}

module.exports = ProjectController
