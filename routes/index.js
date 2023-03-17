var express = require('express');
var router = express.Router();
const rsa = require('node-rsa');
const aes = require('crypto-js/aes');
const env = require('dotenv');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CryptoSimple' });
});

module.exports = router;
