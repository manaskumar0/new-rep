const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server/server');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

const {ObjectID} =require('mongodb');

const{Todo, populate, users, populateuser} = require('./seed/seed');

// //below code is now moving to seed
// const Todo = [{
//     _id:new ObjectID(),
//     text: 'First Test Todo'
// }, {
//     _id:new ObjectID(),
//     text: 'Second Test Todo',
//     completed: true,
//     completedat: 777
// }];

//console.log(Todo);

// //below function definition
// beforeEach((done) => {
//      todo.insertMany(Todo);  
//    todo.remove({}).then(() => {//5c14a284effa52382dde09b7
//        done();
// })
// });

beforeEach(populate);
//beforeEach(populateuser);
//todo
describe('Post TODOS', () => {
   it('should create a new todo', (done) => {
       var text = 'Testing';

       request(app)
       .post('/todo')
        .send({text})
        .expect(200)
        .expect((res) => {
           expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
           if(err)
               return done(err);

           todo.find({text}).then((todo) =>{
               expect(todo.length).toBe(1);
               expect(todo[0].text).toBe(text);
               done();
           }).catch ((e) => {
                done(e);
    });
    })
});

   it('should not create todo ',(done) =>{
        request(app)
       .post('/todo')
       .send({})
       .expect(400)
       .end((err, res) => {
            if(err)
                return done(err);
            todo.find().then((todo) =>{
                expect(todo.length).toBe(0);
                done();
            }).catch ((err) => {
                done(err);
});
   })
   })
});


describe('Get Length', () => {
   it('should get Get Length', (done) => {
    request(app)
        .get('/todo')
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.length).toBe(2);
    })
    .end(done);
});
});

describe('Get Todo ID', () => {
   it('Should return single doc', (done) => {
        request(app)
            .get(`/todo/${Todo[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) =>
        {
                expect(res.body.todo.text).toBe(Todo[0].text)
        })
    .end(done);
});

   it('Should return 404  if todo not found', (done) => {
            var hexid = new ObjectID().toHexString();

            request(app)
                .get(`/todo/${hexid}`)
                .expect(404)
                .end(done);
   });

   it('should return 404 for non Object Id', (done) => {
            request(app)
                .get('/todo/123abc')
                    .expect(404)
                    .end(done);
   });
});

describe('For Delete', () => {
   it('Should remove a todp', (done) => {
       var id = Todo[1]._id.toHexString();
       request(app)
            .delete(`/todo/${id}`)
           .expect(200)
           .expect((res) => {
                expect(res.body.todo._id).toBe(id);
       })
           .end((err, res) => {
               if(err)
                    return done('err',err);

               todo.findById(id).then((todo) => {
                  expect(todo).toNotExist();
                  done();
               }).catch((e) => done('catch', e));
            })
});

   it('should return 404 if todo not found', (done) => {
       var hexid = new ObjectID().toHexString();

request(app)
    .get(`/todo/${hexid}`)
    .expect(404)
    .end(done);
   });

   it('Should return 404 if Id is invalid', (done) => {
       request(app)
       .get('/todo/123abc')
           .expect(404)
           .end(done);
   });

});

describe('Update Testing', () => {

    it('Should update the todo',(done) => {

        var id = Todo[0]._id.toHexString();
        var text = 'This is new text';
        request(app)
            .patch(`/todo/${id}`)
            .send({
                completed: true,
                text
            })
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(text);
                    expect(res.body.todo.completed).toBe(true);
                    expect(res.body.todo.completedat).toBeA('number');
            })
                .end(done);
});

    it('should clear completed at when todo is not completed',(done) =>{
            var id = Todo[0]._id.toHexString();
            var text = 'This is new text!!';
            request(app)
                .patch(`/todo/${id}`)
                .send({
                    completed: false,
                    text
                })
                .expect(200)
                .expect((res) => {
                expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedat).toNotExist();
            })
            .end(done);
    });

});


//user describe
var t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzFiMjBmMTVhMGNjYTFkMjAyODJmYzgiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ1MjgxNzc3fQ.sVkJxhBSE2c9v8yAyYiJG8rxJdxXJh7xZ9nypCISb7w'
var i = '5c1b20f15a0cca1d20282fc8';
describe('Test Starting of User',() => {
    it('it should return authenticate user',(done) => {
            request(app)
            .get('/user/me')
            .set('x-auth',t)
            .expect(200)
            .expect((res) => {
                expect(res.body.id).toBe(i.toHexString);
                expect(res.body.email).toBe('manas@gmail.com');
            })
            .end(done);
    });

    it('it should return 401 unauthorize user',(done) => {
        request(app)
        .get('/user/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});

describe('Test cases for the Post user', () => {
    // it('should create a user',(done) => {
    //     var name = 'sadfkdfk';
    //     var email = 'bssdfdf@sasfddfk.com';
    //     var password = 'asdfasdfasdf';
    //     request(app)
    //     .post('/user')
    //     .send({
    //         name,
    //         email,
    //         password
    //     })
    //     .expect(200)
    //     .expect((res) => {
    //         // expect(res.headers['x-auth']).toExist();
    //         // expect(res.body.id).toExist();
    //         expect(res.body.email).toBe(email);
    //     })
    //     .end((err) => {
    //         if(err)
    //         {
    //             console.log("error")
    //             return done(err);
    //         }
    //         user.findOne({email}).then((u) => {
    //             expect(u).toExist();
    //             expect(u.password).toNotBe(password);
    //             done();
    //         });
    //     });
    // });

    it('should return if validation error is there',(done) => {
        request(app)
        .post('/user')
        .send({name:'asdfs', email:'sd', password:'asadfsd'})
        .expect(400)
        .end(done);
    });

    it('should not create if user is already exist',(done) => {
        request(app)
        .post('/user')
        .send({email: 'manas@gmail.com', password: 'asdfsadf'})
        .expect(400)
        .end(done);
    });
})

//login test

describe('Check for Login',() =>{
    it('should return valid user after check login', (done) => {
        request(app)
        .post('/login')
        .send({email: 'manas@gmail.com', password: 'mk@123'})
        .expect(200)
        .expect((res) =>{
            console.log("body", res);
            expect(res.headers['x-auth']).toExist();
            expect(res.body.email).toBe('manas@gmail.com');
        })
        .end((err, res) =>{
            if(err)
                return done(e);
            user.findById('5c1b20f15a0cca1d20282fc8').then((u) => {
                console.log("-----------------------------------------------------------------------------");
                console.log(u);
                    expect(u.tokens[0]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
            }).catch((e) => {
                done(e);
            });
            done();
        });
    });

    it('should reject invalid user', () => {

    });
});

//ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCzILj5OESmMBzDqmTl8w0WDNOUETj/SHWVfZfcQvY3ohUqsG+B90yBefMXCs4yAm2eR61wjd6XmqZjtrFryZgZVw7WplD+FpZPJwbjluFMdZzgueG6j6Nnx9D+vNJIjOKAxXHRIQCydQs+qER9FV1pF3FLDBLujfEFbkJV6LgQDPayEWCLXgI0WhOvmX1UZNL6nSNUsGMgotyrl0DVo2EtDtJYhOSbtaw4Te8iANdGD0jFCHrGeRodK+e4rYHX6clEKd1IjV1/NFDqsUDSDYDtQ9JNj7jPc1gsqu1F6qQQmCeDnl72cv3XOJ8E8nNQmq8pFR4cD107Zu17nLAU/01OzJrEtbheJP1pbujhY7aX6aSooBJstPx2pFbO37M+pig4EoxsmZEXc01TmyPRnvu7YPYIK1e594i5B6bAQAaPrlb5n8Lg4aNga3+X3KS1fjF7IoxsztUQXU/EywTQWn2SsPYyUtv9fvmfwFuknTNgxZfx6bS9hfxPsjbIruf0Smcy1Fx8rI+cCtScdtuOIHLgWJWuFj7/VjNmm15YKy0ldl6p1KdlX+Abczs9UOcRq+cFrMr1QtdwC7LWBXJGl8+GLbqQg4KD2IOch9XdQIG5MEBUoFDn6fJht39SPSrpCCamq5GSLQeOFk3tZl2CSfaCpUpnJX4cNNiuhhAZ86HEqQ== manas7337@gmail.com
