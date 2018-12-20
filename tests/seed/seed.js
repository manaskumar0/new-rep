const {todo} = require('./../../server/models/todo');
const {user} = require('./../../server/models/user');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const Todo = [{
    _id:new ObjectID(),
    text: 'First Test Todo'
}, {
    _id:new ObjectID(),
    text: 'Second Test Todo',
    completed: true,
    completedat: 777
}];

const populate = (done) => {
    todo.insertMany(Todo);
   todo.remove({}).then(() => {
       done();
})
};
const user1 = new ObjectID();
const user2 = new ObjectID();

const users = [{
    _id: user1,
    name: 'manas kumar',
    email: 'mkk@gmail.com',
    password: 'asdfsdf',
    tokens: [{
        access: 'auth',  
        token: jwt.sign({_id: user1, access:'auth'}, 'i@mmk').toString()
    }]
},{
    _id: user2,
    name: 'manas kumar',
    email: 'mdkk@gmail.com'
}];

//below code is not working.
const populateuser = (done) =>{
    // todo.remove({}).then(() => {
    //     var userone = new user(users[0].save());
    //     var usertwo = new user(users[2].save());

    //     return Promise.all([userone, usertwo])
    //  }).then(() => done());
}

module.exports = {
    Todo,
    populate,
    populateuser,
    users
};