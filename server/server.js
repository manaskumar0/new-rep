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

const express = require('express');
const bodyparser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');

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

app.listen(3000, () => {
    console.log('Started on 3000');
});

module.exports = {app};