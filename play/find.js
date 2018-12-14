//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/dbtodoapp', (err, db) => {
    if(err)
    return console.log('Unable to conncet the MongoDb server');

console.log('Connected to MongoDb server Sucessfully');

//     db.collection('todos').find({completed: true}).toArray().then((docs) => {
//         console.log('Todos Data');
//         console.log(JSON.stringify(docs, undefined, 2));
//
//     }, (err) => {
//         console.log('Unable to Fetch the record(s)', err);
// });
//
// db.collection('todos').find({
//     _id: new ObjectID('5c134df8a4f0bf156082969a')
// }).toArray().then((docs) => {
//     console.log('Todos Data');
// console.log(JSON.stringify(docs, undefined, 2));
//
// }, (err) => {
//     console.log('Unable to Fetch the record(s)', err);
// });


// db.collection('todos').find().count().then((count) => {
//     console.log(`Todos Total: ${count}`);
// }, (err) => {
//     console.log('Unable to Fetch the record(s)', err);
// });
//
// db.collection('Users').find({name: 'MK'}).toArray().then((docs) => {
//     console.log(JSON.stringify(docs, undefined, 2));
// }, (err) => {
//     console.log('Not Find', err)
// });

db.close();


});
