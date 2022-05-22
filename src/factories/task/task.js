const TaskController = require('../../controllers/task/task')
const TaskService = require('../../service/task')
const ProjectService = require('../../service/project')

const makeTaskController = () => {
  const projectService = new ProjectService()
  const taskService = new TaskService()
  return new TaskController(taskService, projectService)
}

module.exports = makeTaskController
