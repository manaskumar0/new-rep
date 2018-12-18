const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');

const {ObjectID} = require('mongodb');

var id = '5c13a28774c958582acd9851';

if(!ObjectID.isValid(id))
    console.log('Id not valid');

todo.find({
   _id: id
}).then((res) => {
    console.log('Todo', res);
});
//the above code will return in array and below in objet


todo.findOne({
    _id: id
}).then((res) => {
    console.log('Todo By One', res);
});


todo.findById(id).then((res) => {
    if(!res)
        return console.log('sorry ');
    console.log('Todo By id', res);
}).catch ((err) => {
    console.log(err);
});
