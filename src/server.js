
const app = require('./server/app')
const { port } = require('./config')

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
