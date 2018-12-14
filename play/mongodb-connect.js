//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


//var user = {name: 'asdf', age: 25};


// //ES6
// var {name} = user;
// var {age} = user;
//
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/dbtodoapp', (err, db) => {
    if(err)
        return console.log('Unable to conncet the MongoDb server');

    console.log('Connected to MongoDb server Sucessfully');


    // db.collection('todos').insertOne({
    //     text: 'Mk',
    //     completed: false
    // }, (err, res) => {
    //     if(err)
    //         return console.log('unable to insert data', err);
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'MK',
    //     age: 20,
    //     location: 'surat'
    // }, (err, res) => {
    //     if(err)
    //         return console.log('Inserted not Sucessfully');
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });
    db.close();

});
