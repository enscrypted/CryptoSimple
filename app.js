var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const CryptoJS = require('crypto-js');
const rsa = require('node-rsa');
const aes = require('crypto-js/aes');
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post("/result", function(req, res, next) {
  var key = req.body.externalKey == undefined ? null : req.body.userKey;
  if(req.body.action === "encrypt") {
    var encrypted;
    if(req.body.type === 'aes') {
      encrypted = aesEncrypt(req.body.plaintext, key);
    }
    if(req.body.type === 'rsa') {
      encrypted = rsaEncrypt(req.body.plaintext, key);
    }
    res.render('result', { cipher: encrypted, title:'Results'});
  }
  if(req.body.action === 'decrypt') {
    var decrypted;
    if(req.body.type === 'aes') {
      decrypted = aesDecrypt(req.body.plaintext, key);
    }
    if(req.body.type === 'rsa') {
      decrypted = rsaDecrypt(req.body.plaintext, key);
    }
    res.render('result', {cipher: decrypted, title: 'Results'});
  }
  res.render('error', {message: 'app broke'});
});

function aesEncrypt(input, key) {
  var iv =  CryptoJS.lib.WordArray.random(128 / 8);
  return iv.toString(CryptoJS.enc.Hex) +  aes.encrypt(input, key !== null ? key : process.env.aes_key, {iv: iv }).toString();
}

function aesDecrypt(input, key) {
  var iv = input.substring(0,32);
  var input = input.substring(32);
  return aes.decrypt(input, key !== null ? key : process.env.aes_key, {iv: iv}).toString(CryptoJS.enc.Utf8);
}

function rsaEncrypt(input, key) {
  var  encryptor = new rsa();
  encryptor.importKey(key !== null ? key : process.env.rsa_pub);
  return encryptor.encrypt(input, 'base64');
}

function rsaDecrypt(input, key) {
  var encryptor = new rsa();
  encryptor.importKey(key !== null ? key : process.env.rsa_priv);
  return encryptor.decrypt(input);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
