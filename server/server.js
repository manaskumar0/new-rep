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

const port = process.env.PORT || 3000

const express = require('express');
const bodyparser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');

const {ObjectID} = require('mongodb');

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

app.listen(port, () => {
    console.log(`Started Port at ${port}`);
});

module.exports = {app};