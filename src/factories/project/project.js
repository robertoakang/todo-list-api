const ProjectController = require('../../controllers/project/project')
const ProjectService = require('../../service/project')

const makeProjectController = () => {
  const projectService = new ProjectService()
  return new ProjectController(projectService)
}

module.exports = makeProjectController
