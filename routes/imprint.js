var express = require('express');
var router = express.Router();
var request = require('request');

/* GET /imprint returns data for determining correct pill. */
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  var url= '';
  if(!req.body.color)
    url='http://rximage.nlm.nih.gov/api/rximage/1/rxnav?imprint=' + req.params.id;
  else
    url='http://rximage.nlm.nih.gov/api/rximage/1/rxnav?imprint=' + req.params.id + '&color=' + req.body.color;
  request(url , function (error, response, body) {
  if (!error && response.statusCode == 200) {
   var image = JSON.parse(body);
   var JsonResponse = {};
   JsonResponse.count = image.replyStatus.imageCount;
   JsonResponse.data = [];
   for(var i=0; i<image.replyStatus.imageCount; i++)
   {
   	JsonResponse.data[i] = {};
   	JsonResponse.data[i].ndc=image.nlmRxImages[i].ndc11;
   	JsonResponse.data[i].imageurl=image.nlmRxImages[i].imageUrl;
   	JsonResponse.data[i].name=image.nlmRxImages[i].name;
   	JsonResponse.data[i].labeler=image.nlmRxImages[i].labeler;
   }
   res.json(JsonResponse);
  }
});
});

module.exports = router;