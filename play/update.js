//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/dbtodoapp', (err, db) => {
    if(err)
    return console.log('Unable to conncet the MongoDb server');

console.log('Connected to MongoDb server Sucessfully');

    // db.collection('todos').findOneAndUpdate({
    //     _id: new ObjectID('5c136a6bb8b78c180c477ed0')
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // })

db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5c136a5a953f90237ca3df2f')
},{
        $set: {name: 'Peanuts'},
        $inc: {age: 1}
},{
        returnOriginal: false
}).then((res) => {
    console.log(res)
});

db.close();

});
