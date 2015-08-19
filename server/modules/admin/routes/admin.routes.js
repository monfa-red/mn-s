var express = require('express');
var router = express.Router();

var users = require('../controllers/admin.controller');


router.route('/api/admin')
  .get(users.list)
  .post(users.create)


module.exports = router;
