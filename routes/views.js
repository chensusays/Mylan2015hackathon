var express = require('express');
var router = express.Router();
var view = require('../models/views.js');

/* GET return pills in view */
router.get('/:name', function(req, res, next) {
  if(!req.params.name)
    return res.json({"status":"pill name not defined"});
  view.findOne({ 'name': req.params.name }, 'pills -_id', function (err, person) {
  if (err) return handleError(err);
  if(!person)
    return res.json({"status" : "View does not exist"});
  res.json(person.toObject().pills);
});
});

/* POST create pills in view */
router.post('/:name', function(req, res, next) {
  if(!req.body.pill||!req.params.name)
    return res.json({"status":"pill name not defined"});
  console.log(req.body.pill + " " + req.params.name);
  view.findOne({"name": req.params.name},function(err, model) {
        if (err) return next(err);
        model.pills.push(req.body.pill);
        model.save();
        res.json({"status" : "success"});
  return 0;
  });
});

/* DELETE delete pills in view */
router.delete('/:name', function(req, res, next) {
  if(!req.body.pill||!req.params.name)
    return res.json({"status":"pill name not defined"});
  console.log(req.body.pill + " " + req.params.name);
  view.findOne({"name": req.params.name},function(err, model) {
        if (err) return next(err);
        model.pills.pull(req.body.pill);
        model.save();
        res.json({"status" : "success"});
  return 0;
  });
});

/* GET view views*/
router.get('/', function(req, res, next) {
view.find(null, 'name pills -_id',
  {
    skip:0 // Starting Row
  },
    function (err, scores) {
      if (err) return next(err);
        res.json(scores);
  });
});

/* POST create new view*/
router.post('/', function(req, res, next) {
  if(!req.body.name)
    return res.json({"status":"view name not defined"});
  view.create({"name" : req.body.name,
                "pills" : []}, function (err, post) {
    if (err) return next(err);
      res.json( {"status": "success" });
  });
});

/* DELETE delete view*/
router.delete('/',function(req, res, next) {
  if(!req.body.name)
    return res.json({"status":"view name not defined"});
  view.find({ name : req.body.name }).remove( function (err, post) {
    if (err) return next(err);
      res.json( {"status": "success" }); });
});

module.exports = router;