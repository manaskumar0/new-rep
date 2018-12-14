const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server/server');
const {todo} = require('./../server/models/todo');

beforeEach((done) => {
   todo.remove({}).then(() => {
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

           todo.find().then((todo) =>{
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