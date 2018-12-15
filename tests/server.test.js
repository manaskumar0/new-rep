const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server/server');
const {todo} = require('./../server/models/todo');

const {ObjectID} =require('mongodb');

const Todo = [{
    _id:new ObjectID(),
    text: 'First Test Todo'
}, {
    _id:new ObjectID(),
    text: 'Second Test Todo'
}];

console.log(Todo);

beforeEach((done) => {
    todo.insertMany(Todo)
   todo.remove({}).then(() => {//5c14a284effa52382dde09b7
       done();
})
});

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
                expect(todo.length).toBe(2);
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
                    return done(err);

               todo.findById(id).then((todo) => {
                  expect(todo).toNotExist();
                  done();
               }).catch((e) => done(e));
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