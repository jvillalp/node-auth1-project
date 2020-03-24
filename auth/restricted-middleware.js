// module.exports = (req, res, next) => {
//     if(req.session && req.session.user){

//     }else{
//         res.status(404).json({ you:`shall not pass`})
//     }
//     next();
// }

const jwt = require("jsonwebtoken");

const {jwtSecret} = require('../config/secrets')


module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid credentials" });
      } else {
        req.decodedToken = decodedToken;

        next();
      }
    });
  } else {
    res.status(404).json({ message: "no credentials provided" });
  }
};
