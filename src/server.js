
const app = require('./server/app')
const { port, mongoURI } = require('./config')
const mongoose = require('mongoose')

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
