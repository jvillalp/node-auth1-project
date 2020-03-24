module.exports = (req, res, next) => {
    if(req.session && req.session.user){

    }else{
        res.status(404).json({ you:`shall not pass`})
    }
    next();
}