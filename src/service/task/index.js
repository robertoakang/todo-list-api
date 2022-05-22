const Task = require('../../db/models/Task')

class TaskService {
  async create (name) {
    return await Task.create({
      name
    })
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
