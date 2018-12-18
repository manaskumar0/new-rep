//crypto token

const {SHA256} = require('crypto-js');

//json web token

const jwt = require('jsonwebtoken');

var data = {
  id: 1
};


var token = jwt.sign(data, 'i@mmk');

console.log(token);

var decoded = jwt.verify(token, 'i@mmk');

console.log(decoded);

// var msg = 'imusermk';
//
// var hash = SHA256(msg).toString();
//
// console.log(hash);
//
// console.log(msg);
//
