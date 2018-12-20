// const mongoose = require('mongoose');
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/dbmongoose');


// var todo = mongoose.model('todo',{
//    text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//    },
//     completed:{
//         type: Boolean,
//         default: false
//     },
//     completedat:{
//         type: Number,
//         default: null
//     }
// });
//


// var newtodo = new todo({
//     text: 'Cook Panner Angara',
//     completed: false,
//     completed: 1995
// });
//
// newtodo.save().then((doc) => {
//     console.log('Save SucessFully', doc);
// }, (err) => {
//     console.log('Unable to save', err);
// });

//
// var nexttodo = new todo({
//     text: '    Cook Panner parantha     ',
//     completedat: 1995
// });
//
// nexttodo.save().then((doc) => {
//    console.log('save',doc);
// },(err) => {
//     console.log('Not save',err);
// });

// var user = mongoose.model('user',{
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 1
//     }
// });
//
// var uinsert = new user({
//     email: ' mk@gmail.com  '
// });
//
// uinsert.save().then((res) => {
//     console.log('saved', res);
// },(err) => {
//     console.log('error',err);
// });





//PostMan

//Heroku

const port = process.env.PORT || 4000;

const express = require('express');
const bodyparser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');

const {ObjectID} = require('mongodb');

var {authenticate} = require('./middleware/authenticate');

const _ = require('lodash');
var app =express();

app.use(bodyparser.json());

app.post('/todo', (req, res) => {
    console.log(req.body);
    var t = new todo({
        text: req.body.text
    });
    t.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
        //console.log('error', err);
});
});

app.get('/todo', (req, res) => {
    todo.find().then((todo) => {
        res.send({todo});
}, (err) => {
        res.status(400).send(err);
});
});


//Individual Resourse

app.get('/todo/:id', (req,res) => {
        var id = req.params.id;
        //res.send(req.params);

        if(!ObjectID.isValid(id))
        {
            return res.status(404).send("no match Id");
        }


        todo.findById(id).then((todo) => {
            if(!todo)
                return res.status(404).send("no data in collection");

            res.send({todo});

        }).catch((e) => {
            res.status(400).send();
});

});

//Delete Rout

app.delete('/todo/:id', (req, res) =>
{
    var id = req.params.id;

    console.log(id);
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send("Invalid ID");
    }

    todo.findByIdAndRemove(id).then((todo) => {
        if(!todo)
            return res.status(404).send("No Todo");

        res.send({todo});
    }).catch((err) => {
            res.status(400).send("catch");
});

});

//UPDATE

app.patch('/todo/:id',(req, res) => {

    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    if(!ObjectID.isValid(id))
            return res.status(404).send("Id is not valid");

    if(_.isBoolean(body.completed) && body.completed)
    {
        body.completedat = new Date().getTime();
    }
    else
    {
        body.completed = false;
        body.completedat = null;
    }

    todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
            if(!todo)
                return res.status(404).send("No todo is available");

            res.send({todo});
    }).catch((e) => {
        res.status(404).send("Catch");
});

});


//Login


app.post('/user',(req, res) => {
    console.log(req.body.text);
    var body = _.pick(req.body, ['name' ,'email', 'password']);
    var useer = new user(body);

    console.log(body);

    useer.save().then(() => {
        //res.send(u);
        return useer.generateAuthToken();

    }).then((token) => {

        res.header('x-auth', token).send(useer);

}).catch((e) => {
        res.status(400).send(e);
});
});

//auth middleware
//
// var authenticate = (req, res, next) => {
//
//     var token = req.header('x-auth');
//     user.findByToken(token).then((u) => {
//         if(!u){
//         return Promise.reject();
//     }
//     req.u = u;
//     req.token= token;
//     next();
// }).catch((e) => {
//         res.status(401).send("authentication is required");
// });
//
// };

//private route

app.get('/user/me', authenticate, (req, res) =>{
    res.send(req.user);
})

//
// app.get('/user/me', (req, res) =>{
//     var token = req.header('x-auth');
// user.findByToken(token).then((u) => {
//     if(!u){
//     return Promise.reject();
// }
// res.send(u);
// }).catch((e) => {
//     res.status(401).send("authentication is required");
// });
// })


//login 
app.post('/login',(req, res) => {
    var body = _.pick(req.body,['email', 'password']);
    console.log(body);
    user.findbycred(body.email, body.password).then((u) => {
        return u.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(u);
          });   
     }).catch((e) => {
        console.log(e);
        res.status(400).send("no user");
    });


});

app.listen(port, () => {
    console.log(`Started Port at ${port}`);
});







module.exports = {app};