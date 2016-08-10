var express = require('express');
var app = express();

var jsonfile = require('jsonfile')

var file = 'data.json'
var obj = {name: 'JP'}


var mongojs = require('mongojs');
var db = mongojs('slowsearch', ['slowsearch', 'tasks']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/slowsearch', function (req, res) {
  console.log('I received a GET request');

  db.slowsearch.find(function (err, docs) {
    res.json(docs);
  });
});

app.get('/gettasks', function (req, res) {
  console.log('I received a GET request re: tasks');

  db.tasks.find({}, {id:true, name:true, selected:true, selectedid: true}, function (err, docs) {
    res.json(docs);
  });
});

app.get('/gettask/:taskid', function (req, res) {
  console.log('I received a GET request re: tasks');
  var task_id = parseInt(req.params.taskid);

  db.tasks.find({selectedid:task_id},{}, function (err, docs) {
    res.json(docs);
  });
});

app.get('/gettaskid/:id', function (req, res) {
  console.log('I received a GET request re: tasks');
  var task_id = parseInt(req.params.id);

  db.tasks.find({id:task_id},{}, function (err, docs) {
    res.json(docs);
  });
});

app.post('/slowsearch', function (req, res) {
  console.log("I received slowsearch post request:  ");
  db.slowsearch.update({_id: req.body._id}, {$set: req.body}, {upsert: true}, function(err, doc) {
    console.log("Error:", err);
    console.log("Doc:", doc);
    res.json(doc);
  });
});

app.get('/createtask', function(req, res){
  console.log("create a new task added: ");
  db.tasks.find({}, {id:true}).sort({id:-1}, function (err, docs) {
    var newID = docs[0].id+1;
    db.tasks.insert({id:newID, name:"newTask-" + newID + "(no content yet)"}, function(err2,doc2){
      console.log("new created", doc2);
      res.json(doc2);
    });
  });
});

app.post('/taskremove', function (req, res) {
  var id = req.body._id;
  console.log("delete ", req.body)
  db.tasks.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    console.log("err",err);
    console.log("doc", doc);
    res.json(doc);
  });
});



app.post('/taskupdate', function (req, res) {
  console.log("task update added: ", req.body);
  var _id = req.body._id;
  var update = req.body.update;
  delete update._id;
  db.tasks.findAndModify(
    {
      query: {_id: mongojs.ObjectId(_id)},
      update: {$set: update}
    }, function (err, doc) {
      console.log("err:", err);
    //  console.log("doc:", doc);
      res.json(doc);
    }
  );

});

app.delete('/slowsearch/:id', function (req, res) {
  var id = req.params.id;

  db.slowsearch.remove({_id: id}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/slowsearch/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.slowsearch.findOne({_id: id}, function (err, doc) {
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

app.listen(4000);
console.log("Server running on port 4000");
