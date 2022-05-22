const Project = require('../../db/models/Project')

class ProjectService {
  async create (name, userId) {
    const project = new Project()
    project.name = name
    project.users.push(
      userId
    )

    return await project.save()
  }

  async findAllByUser (userId) {
    const projects = await Project.find({
      users: { $in: [userId] }
    }).populate([
      { path: 'users', select: 'name' },
      {
        path: 'tasks',
        select: [
          'name', 'finished_at', 'status'
        ]
      }
    ])
      .select('-__v')

    return projects
  }

  async findById (id, userId) {
    const project = await Project.findOne({ _id: id }).populate([
      { path: 'users', select: 'name', match: { _id: userId } },
      {
        path: 'tasks',
        select: [
          'description', 'finished_at', 'status'
        ]
      }
    ]).select('-__v')

    return project
  }

  async updateById (id, name) {
    return await Project.updateOne({
      _id: id
    }, { name })
  }

  async remove (id) {
    return await Project.deleteOne({
      _id: id
    })
  }

  async associateTask (taskId, projectId) {
    return await Project.findByIdAndUpdate({ _id: projectId }, {
      $push: { tasks: taskId }
    }, { new: true, upsert: true })
  }
}

module.exports = ProjectService
