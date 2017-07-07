const config = require('./config');
const utils = require('./utils')
const express = require('express');
const http = require('http')
const fs = require('fs');
const path = require('path');
const dirtree = require('directory-tree');
const chokidar = require('chokidar');

let app = express();
let server = http.Server(app);
server.listen(config.port, config.host);

const io = require('socket.io')(server);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
  next();
});

app.use('/', express.static(path.join(__dirname, 'gui/dist')));
app.use('/files', express.static(config.files));

app.get('/directory', function(req, res) {
  let tree = dirtree(config.files, { extensions:/\.md$/, exclude:/\.git/ });
  utils.rmPath(tree);
  res.json(tree.children);
});

function getRoot() {
  return config.files[config.files.length-1] != '/' ? config.files+'/' : config.files;
}

io.on('connection', function (socket) {
  let watcher = chokidar.watch(config.files, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  watcher.on('change', (path, stats) => {
    let file_path = path.replace(getRoot(), '');
     socket.emit('file-change', file_path);
  });

  watcher.on('addDir', (path) => {
    socket.emit('dir-change');
  });

  watcher.on('unlinkDir', (path) => {
    socket.emit('dir-change');
  });

  watcher.on('add', (path) => {
    socket.emit('dir-change');
  });

  watcher.on('unlink', (path) => {
    socket.emit('dir-change');
  });
});
