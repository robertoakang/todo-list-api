const mongoose = require('mongoose')

class MongoHandler {
  constructor (uri) {
    this.uri = uri
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }

  connect () {
    mongoose.connect(this.uri, this.options)
  }

  disconnect () {
    mongoose.disconnect()
  }

  getCollection (collection) {
    return mongoose.model(collection)
  }
}

module.exports = MongoHandler
