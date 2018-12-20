//crypto token

const {SHA256} = require('crypto-js');

//json web token

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

// var data = {
//   id: 1
// };
//
//
// var token = jwt.sign(data, 'i@mmk');
//
// console.log(token);
//
// var decoded = jwt.verify(token, 'i@mmk');
//
// console.log(decoded);

// var msg = 'imusermk';
//
// var hash = SHA256(msg).toString();
//
// console.log(hash);
//
// console.log(msg);
//


var pass = 'mk@123';
var hash1;
bcrypt.genSalt(5, (err, salt) => {
  bcrypt.hash(pass, salt, (err, hash) => {
    console.log(hash);

  })
});

var hashpass =  '$2a$10$l1ojyEGFcffgLeLRwokwFORNGp1rexF7zGawF8k1gpphHR0pccNRq';

bcrypt.compare(pass, hashpass, (err, res) => {
console.log(res);
});