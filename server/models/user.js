const mongoose = require('mongoose');

const validator = require('validator');

const  jwt = require('jsonwebtoken');

const _ = require('lodash');

const bcrypt = require('bcryptjs');
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
                validator: validator.isEmail,//{return validator.isEmail(value);},
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

//middleware of mongoose for the before save the file 
userschema.pre('save', function(next){
    var users = this;
    //the below code will check that is there a change in the password or not
    if(users.isModified('password'))
    {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(users.password, salt, (err, hash) => {
                users.password = hash;
                next();
            });
        });
    }
    else
        next();
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

userschema.statics.findByToken = function (token) {
    var users = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'i@mmk');
    }
    catch (e) {
        // return new Promise((resolve, reject) => {
        //    reject();
        // });

        return Promise.reject();
    }

    return users.findOne({
       _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

userschema.statics.findbycred = function(email, password)
{
    var users = this;
    //console.log(email);
    
        return users.findOne({email}).then((u) => {
        if(!u)
        {
            
            console.log("No data");
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {            
            bcrypt.compare(password,u.password, (err, res) => {
                console.log("In");    
                if(res)
                {
                    console.log(u);
                    resolve(u);
                }
                else{
                    reject(err);
                }
            });
        });
        //bcrypt.compare(password)
    });
}

var user = mongoose.model('user', userschema);

module.exports = {user};
