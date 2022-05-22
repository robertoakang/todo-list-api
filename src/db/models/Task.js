const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  finished_at: { Type: Date },
  status: { type: Number, default: 1 }
})
module.exports = model('Task', taskSchema)
