var express = require('express');
var Data = require('../models/data');
var router = express.Router();
var Users = require("../models/user");


router.get('/', function(req, res){
  console.log('=========================');
  console.log(req.query);
  console.log('=========================');
  Data.find({garden_id: req.query.garden_id}, function(err, data) {
    if (err) { return res.send({message: 'An error occurred when finding any of this data'}) };
    res.send(data);
  });
});

router.post('/', function(req, res) {
  var data = new Data(req.body);
  data.save(function(err) {
    console.log('saved?');
    if (err) return res.send({message: 'An error occurred when creating a your data'});
    res.send(data);
  });
});

router.get('/:id', function(req, res) {
  Data.find(req.params.id, function(err, data) {
    if (err) return res.send({message: 'An error occurred when finding that data'})
    res.send(data)
  })
})

router.put('/:id', function(req, res) {
  Data.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
    if (err) return res.send ({message: "Couldn't edit that particular data"})

    res.send(data);
  })
});

router.delete('/:id', function(req,res) {
  Data.findByIdAndRemove(req.param.id, function(err, data) {
    if (err) return res.send ({message: "Couldn't delete that particular data"})

    res.send('deleted!')
  })
})

module.exports = router;