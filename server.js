var express = require('express');

var app = express();

app.use(express.static('./public'));

app.listen(3009);
console.log('app running on localhost:3009');