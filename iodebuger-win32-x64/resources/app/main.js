var app = require('app');
var BrowserWindow = require('browser-window');
var express = require('express')();
var http = require('http').Server(express);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.json());

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    'node-integration': false,
    'always-on-top': true
  });

  mainWindow.loadUrl('http://localhost:3000/');

  // Open the DevTools.
  //mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

express.get('/', function(req, res){
  res.sendfile(__dirname + '/client.html');
});

var phpvar = require('./routes/phpvar');
express.use('/phpvar', phpvar);

io.on('connection', function(socket){
  socket.on('phpvar', function(msg){
      io.emit('phpvar',msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
