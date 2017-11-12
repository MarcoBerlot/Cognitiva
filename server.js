var express = require ('express');
var app = express();
var morgan = require ('morgan')
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var compression = require('compression');
var request = require('request');
var apicache = require('apicache').options({debug:false}).middleware


//NEXT TWO LINES FOR READ BODY FROM POST
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(compression());

app.use('/',express.static('.', { maxAge: 86400000 }));
app.use(morgan('common'))

app.get('/getPost', function (req, res) {
  //Romoli
})
app.get('/update', function (req, res) {
  //Marco
})


var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
