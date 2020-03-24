//npm i
const express = require('express')
const helmet = require('helmet')
// const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')


//take them
const usersRouter = require('../users/users.router')
const authRouter = require('../auth/router')
const restricted = require('../auth/restricted-middleware')
const server = express()

const sessionConfig = {
    name:'monster',
    secret:'Let it be a secret',
    cookies: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
}

//use them
server.use(helmet())
server.use(express.json())
// server.use(morgan('div'))
server.use(cors())
server.use(session(sessionConfig))

server.use('/api/users',restricted, checkRole('user'), usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.status(200).json({message: 'this is the working server!!'})
})

module.exports = server;

function checkRole(role){
    return(req, res, next)=>{
        if(
            req.decodedToken &&
            req.decodedToken.role &&
            req.decodedToken.role.toLowerCase() ===role
            ){
                next()
        }else {
            res.status(403).json({ you: 'shall not pass!'})
        }
    }
}