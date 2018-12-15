const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

todo.remove({}).then((res) => {
   console.log(res);
});

todo.findOneAndRemove({_id: ''}).then((res) => {

});

todo.findByIdAndRemove('').then((res) => {

});