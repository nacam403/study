var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.set({
    'Access-Control-Allow-Origin': 'null'
  })
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
