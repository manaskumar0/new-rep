//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/dbtodoapp', (err, db) => {
    if(err)
    return console.log('Unable to conncet the MongoDb server');

console.log('Connected to MongoDb server Sucessfully');

    // //delete many
    // db.collection('todos').deleteMany({
    //     text: 'Shopping Nuts'
    // }).then((result) => {
    //     console.log(result);
    // });

    // //delete one
    //
    // db.collection('todos').deleteOne({
    //    text: 'Shopping Nuts'
    // }).then((res) => {
    //     console.log(res);
    // });

    // //find and delete
    //
    // db.collection('todos').findOneAndDelete({
    //    text: 'Shopping Nuts'
    // }).then((res) => {
    //     console.log(res);
    // });

db.close();


});
