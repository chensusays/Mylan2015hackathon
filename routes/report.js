var express = require('express');
var router = express.Router();
var request = require('request');

/* GET /report for reporting status from ndc. */
router.get('/:ndc', function(req, res, next) {
  console.log(req.params.ndc);
  request('https://api.fda.gov/drug/enforcement.json?search=patient.drug.openfda.package_ndc%3D'+req.params.ndc+'+AND+classification%3A%22Class+I%22&count=voluntary_mandated.exact', function (error, response, body) {
  if (!error && response.statusCode == 200) {
   var data = JSON.parse(body);
   if(data.results.count == 0)
    res.json({"code" : 0});
   else if(data.results.count < 2)
    res.json({"code" : 1});
   else
    res.json({"code" : 3});
  }
  else
    res.json({"status" : "invalid ndc"});
});
});

module.exports = router;