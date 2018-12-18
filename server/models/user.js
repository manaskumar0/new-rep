const mongoose = require('mongoose');

const validator = require('validator');

const  jwt = require('jsonwebtoken');

const _ = require('lodash');
var userschema = new mongoose.Schema({
        name:{
            type: String,
            require: true,
            trim: true,
            minlength: 4
        },email: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            unique: true,
            validate: {
                validator: (value) => validator.isEmail,//{return validator.isEmail(value);},
            message: '{value} is not a valid email'
        }
    },
    password: {
    type: String,
        required: true,
        minlength: 6
},
tokens: [{
    access: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    }
}]

});

userschema.methods.toJSON = function()
{
    var userss = this;
    var userobject = userss.toObject();

    return _.pick(userobject, ['_id', 'email']);
};

userschema.methods.generateAuthToken = function () {
    var users = this;
    console.log("b t"+users);
    var access = 'auth';
    var token = jwt.sign({_id: users._id.toHexString(), access}, 'i@mmk').toString();

    users.tokens.push({access, token});
    console.log("a t"+users);
    return users.save().then(() => {
        return token;
    });
};

var user = mongoose.model('user', userschema);

module.exports = {user};
