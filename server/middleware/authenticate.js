var {user} = require('./../models/user');


var authenticate = (req, res, next) => {

    var token = req.header('x-auth');
    user.findByToken(token).then((u) => {
        if(!u){
        return Promise.reject();
    }
    req.user = u;
    req.token= token;
    next();
}).catch((e) => {
        res.status(401).send("authentication is required");
});

};

module.exports = {authenticate};