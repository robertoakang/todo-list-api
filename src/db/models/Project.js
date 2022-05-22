const { Schema, model } = require('mongoose')
const Task = require('./Task')
const User = require('./User')

const projectSchema = new Schema({
  name: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: Task }],
  users: [{ type: Schema.Types.ObjectId, ref: User }]
})

module.exports = model('Project', projectSchema)
