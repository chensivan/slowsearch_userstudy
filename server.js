// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();

var jsonfile = require('jsonfile')

var file = 'data.json'
var obj = {name: 'JP'}


var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  // var docs = {
  //   name: "123",
  //   email: "333",
  //   number: "ok"
  // }

  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {


  // var doc = {
  //   name: "123",
  //   email: "333",
  //   number: "ok"
  // }


  // jsonfile.writeFile(file, doc, function (err) {
  //   console.error(err)
  // })

    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;

  // var doc = {
  //   name: "123",
  //   email: "333",
  //   number: "ok"
  // }
  // console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  var doc = {
    name: "123",
    email: "333",
    number: "ok"
  }
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");
