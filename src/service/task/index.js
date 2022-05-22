const Task = require('../../db/models/Task')

class TaskService {
  async create (name) {
    return await Task.create({
      name
    })
  }

  async findById (id, userId) {
    const task = await Task.findOne({ _id: id }).populate([
      { path: 'users', select: 'name', match: { _id: userId } },
      {
        path: 'tasks',
        select: [
          'name', 'finished_at', 'status'
        ]
      }
    ]).select('-__v')

    return task
  }

  async updateById (id, name, finished_at, status) {
    return await Task.updateOne({
      _id: id
    }, { name, finished_at: new Date(finished_at), status })
  }

  async remove (id) {
    return await Task.deleteOne({
      _id: id
    })
  }
}

module.exports = TaskService
