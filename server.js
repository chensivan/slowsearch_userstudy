var express = require('express');
var app = express();

var jsonfile = require('jsonfile')

var file = 'data.json'
var obj = {name: 'JP'}


var mongojs = require('mongojs');
var db = mongojs('slowsearch', ['slowsearch']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/slowsearch', function (req, res) {
  console.log('I received a GET request');

  db.slowsearch.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/slowsearch', function (req, res) {
  console.log(req.body);
  db.slowsearch.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/slowsearch/:id', function (req, res) {
  var id = req.params.id;

  db.slowsearch.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/slowsearch/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.slowsearch.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/slowsearch/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body);

  db.slowsearch.findAndModify(
    {
      query: {_id: id},
      update: {$set: {"task1sub": req.body}},
      upsert:true
    }, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8000);
console.log("Server running on port 8000");
