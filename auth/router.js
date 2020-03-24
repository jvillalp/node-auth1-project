const bcrypt = require('bcryptjs')
const router = require('express').Router()
const Users = require('../users/users-model')

router.post('/register', (req, res) => {
    const UserInfo = req.body;
    const ROUNDS = process.env.HASHING_ROUNDS || 8
    const hash = bcrypt.hashSync(UserInfo.password, ROUNDS)

    UserInfo.password = hash;

    Users.add(UserInfo)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({errorMessage: `${err}`})
    })
});

router.post('/login', (req, res) => {
    const {username, password} = req.body
    Users.findBy({username})
    .then(([user]) => {
        console.log('user', user)
        if(user && bcrypt.compareSync(password, user.password)){
            (req.session.user = {
                id: user.id,
                username: user.username
            }),
            res.status(200).json({ hello: user.username})
        } else {
            res.status(400).json({ errorMessage: `${err}`})
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: `${err}`})
    })
})

module.exports = router