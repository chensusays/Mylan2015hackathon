var express = require('express');
var router = express.Router();
var view = require('../models/views.js');

/* GET return pills in view */
router.get('/:name', function(req, res, next) {
  if(!req.params.name)
    return res.json({"status":"pill name not defined"});
  //res.json(view.find({ name:req.params.name }).drugs);
  view.findOne({ 'name': req.params.name }, 'drugs -_id', function (err, person) {
  if (err) return handleError(err);
  res.json(person.toObject().drugs);
});
});

/* POST create pills in view */
router.post('/:name', function(req, res, next) {
  if(!req.body.pill||!req.params.name)
    return res.json({"status":"pill name not defined"});
  
});

/* DELETE delete pills in view */
router.delete('/:name', function(req, res, next) {
  if(!req.body.pill||!req.params.name)
    return res.json({"status":"pill name not defined"});
});

/* GET view views*/
router.get('/', function(req, res, next) {
view.find(null, 'name drugs -_id',
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
                "drugs" : []}, function (err, post) {
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