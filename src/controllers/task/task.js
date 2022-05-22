const { MissingParamError } = require('../../errors')
const { okCreated, badRequest, serverError, ok } = require('../../helpers/http/http-helper')

class TaskController {
  constructor (taskService, projectService) {
    this.taskService = taskService
    this.projectService = projectService
  }

  async createTask (httpRequest) {
    try {
      const requiredFields = ['name', 'projectId']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const task = await this.taskService.create(httpRequest.body.name)
      await this.projectService.associateTask(task._id, httpRequest.body.projectId)
      return okCreated({ message: 'Task successfully created' })
    } catch (error) {
      return serverError()
    }
  }

  async destroy (httpRequest) {
    try {
      await this.taskService.remove(httpRequest.params.id)
      return ok({ message: 'Task successfully deleted' })
    } catch (error) {
      return serverError()
    }
  }

  async finishTask (httpRequest) {
    try {
      const requiredFields = ['finished_at', 'status']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, finished_at, status } = httpRequest.body
      await this.taskService.updateById(httpRequest.params.id, name, finished_at, status)
      return ok({ message: 'Finished successfuly' })
    } catch (error) {
      return serverError()
    }
  }
}

module.exports = TaskController
