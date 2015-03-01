var express = require('express');
var router = express.Router();
var request = require('request');

/* GET /report for reporting status from ndc. */
router.get('/:ndc', function(req, res, next) {
  console.log(req.params.ndc);
  request('https://api.fda.gov/drug/enforcement.json?search=patient.drug.openfda.package_ndc%3D'+req.params.ndc+'+AND+classification%3A%22Class+I%22&limit=50', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    request('https://api.fda.gov/drug/event.json?api_key=vAypsAjzePygHNHY803sjxh8aabKjjjOgTxavWoM&search=patient.drug.openfda.package_ndc:'+req.params.ndc, function (err, resp, bod) {
      if (!error && response.statusCode == 200)
      {
        var enforcement = JSON.parse(body);
        var competetitors = JSON.parse(bod);
        var lastevents = [];
        var datasorted = enforcement.results;
        datasorted.sort(function(a,b) { 
            var adate = a.report_date.charAt(4) + a.report_date.charAt(5)+ " "+ a.report_date.charAt(6) + a.report_date.charAt(7) + " " + a.report_date.charAt(0) + a.report_date.charAt(1) + a.report_date.charAt(2) + a.report_date.charAt(3);
            var bdate = b.report_date.charAt(4) + b.report_date.charAt(5)+ " "+ b.report_date.charAt(6) + b.report_date.charAt(7) + " " + b.report_date.charAt(0) + b.report_date.charAt(1) + b.report_date.charAt(2) + b.report_date.charAt(3);
            if(Date.parse(adate) > Date.parse(bdate))
                return -1;
            else
                return 1;
        });
        for(var i=0;i<datasorted.length;i++)
        {
            lastevents[i]=datasorted[i].reason_for_recall;
        }
        if(enforcement.meta.results.total == 0)
          res.json({"code" : 0, 
            "genericname" : competetitors.results[0].patient.drug[0].openfda.generic_name ,
            "lastevents" : lastevents,
            "competetitors" : competetitors.results[0].patient.drug[0].openfda.package_ndc});
        else if(enforcement.meta.results.total < 2)
          res.json({"code" : 1, 
            "genericname" : competetitors.results[0].patient.drug[0].openfda.generic_name ,
            "lastevents" : lastevents,
            "competetitors" : competetitors.results[0].patient.drug[0].openfda.package_ndc});
        else
          res.json({"code" : 2, 
            "genericname" : competetitors.results[0].patient.drug[0].openfda.generic_name ,
            "lastevents" : lastevents,
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