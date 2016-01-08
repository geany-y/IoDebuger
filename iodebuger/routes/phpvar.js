//基本ライブラリ読み込み
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var ioc = require('socket.io-client');  //サーバーからサーバへの通信用に必要

//PHPからのリクエスト
router.use('/', function(req, res) {
  console.log(req.body);
  socket = ioc.connect('http://localhost:3000/');  //サーバーへ接続
  socket.emit('phpvar', req.body);    //PHPデータをサーバーへ転送
  res.send('respond with a resource');    //PHPへレスポンス返却
});

module.exports = router;