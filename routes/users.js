var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {title: "Blog||Dashboard"});
});


module.exports = router;
