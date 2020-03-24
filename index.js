const server = require('./api/server.js')

const PORT = process.env.PORT || 5200;

server.listen(PORT, () => console.log(`\n** This is the server ${PORT} **\n`))