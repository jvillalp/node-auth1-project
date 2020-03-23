const server = require('./api/server.js')

const PORT = process.env.PORT || 5200

server.listen(PORT, () => console.log(`\n** ${PORT} **\n`))