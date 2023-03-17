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
  if(req.body.action === "encrypt") {
  if(req.body.type === 'aes') {
    var encrypted = aesEncrypt(req.body.plaintext);
    res.render('result', { cipher: encrypted, title:'Results'  });
  }
  if(req.body.type === 'rsa') {
    var encrypted = rsaEncrypt(req.body.plaintext);
    res.render('result', {cipher: encrypted, title:'Results'});
  }
  }
  if(req.body.action === 'decrypt') {
  if(req.body.type === 'aes') {
    var decrypted = aesDecrypt(req.body.plaintext);
    res.render('result', {cipher: decrypted, title: 'Results'});
  }
  if(req.body.type === 'rsa') {
    var decrypted = rsaDecrypt(req.body.plaintext);
    res.render('result', {cipher: decrypted, title: 'Results'});
  }
  }
  res.render('error', {message: 'app broke'});
});

function aesEncrypt(input) {
  return aes.encrypt(input, process.env.aes_key, {iv: process.env.aes_iv}).toString();
}

function aesDecrypt(input) {
  return aes.decrypt(input, process.env.aes_key, {iv: process.env.aes_iv}).toString(CryptoJS.enc.Utf8);
}

function rsaEncrypt(input) {
  var  encryptor = new rsa();
  encryptor.importKey(process.env.rsa_pub);
  return encryptor.encrypt(input, 'base64');
}

function rsaDecrypt(input) {
  var encryptor = new rsa();
  encryptor.importKey(process.env.rsa_priv);
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