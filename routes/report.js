var express = require('express');
var router = express.Router();
var request = require('request');

/* GET /report for reporting status from ndc. */
router.get('/:ndc', function(req, res, next) {
  console.log(req.params.ndc);
  request('https://api.fda.gov/drug/enforcement.json?search=patient.drug.openfda.package_ndc%3D'+req.params.ndc+'+AND+classification%3A%22Class+I%22', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    request('https://api.fda.gov/drug/event.json?api_key=vAypsAjzePygHNHY803sjxh8aabKjjjOgTxavWoM&search=patient.drug.openfda.package_ndc:'+req.params.ndc, function (err, resp, bod) {
      if (!error && response.statusCode == 200)
      {
        var enforcement = JSON.parse(body);
        var competetitors = JSON.parse(bod);
        if(enforcement.meta.results.total == 0)
          res.json({"code" : 0, 
            "genericname" : competetitors.results[0].patient.drug[0].openfda.generic_name ,
            "last event" : [],
            "competetitors" : competetitors.results[0].patient.drug[0].openfda.package_ndc});
        else if(enforcement.meta.results.total < 2)
          res.json({"code" : 1, 
            "genericname" : competetitors.results[0].patient.drug[0].openfda.generic_name ,
            "last event" : enforcement.results[0].reason_for_recall,
            "competetitors" : competetitors.results[0].patient.drug[0].openfda.package_ndc});
        else
          res.json({"code" : 2, 
            "genericname" : competetitors.results[0].patient.drug[0].openfda.generic_name ,
            "last event" : enforcement.results[0].reason_for_recall,
            "competetitors"  : competetitors.results[0].patient.drug[0].openfda.package_ndc});
      }
      else
        res.json({"status" : "invalid ndc"});
  });
  }
  else
    res.json({"status" : "invalid ndc"});
});
});

module.exports = router;