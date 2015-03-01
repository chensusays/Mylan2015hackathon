var express = require('express');
var router = express.Router();
var view = require('../models/views.js');

/* GET return pills in view */
router.get('/:user', function(req, res, next) {

});

/* POST create pills in view */
router.post('/:user', function(req, res, next) {

});

/* DELETE delete pills in view */
router.delete('/:user', function(req, res, next) {

});

/* GET view views*/
router.get('/', function(req, res, next) {
view.find(null, 'name -_id',
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