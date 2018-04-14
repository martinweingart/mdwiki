const config = require('./config.json');
const utils = require('./utils')
const express = require('express');
const http = require('http')
const fs = require('fs');
const path = require('path');
const dirtree = require('directory-tree');
const chokidar = require('chokidar');
const find_files = require('find-in-files');
const find = require('find');
const _ = require('lodash');
const body_parser = require('body-parser')

let app = express();
let server = http.Server(app);
server.listen(config.port, config.host);

const io = require('socket.io')(server);

app.use(body_parser.json());
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
  utils.rmPath(tree, getRoot());
  res.json(tree.children);
});

function findFiles(w) {
  return new Promise(function(resolve, reject) {
    let patt = new RegExp(w, "i");
    find.file(patt, config.files, function(files) {
      resolve(files.filter(f => f.indexOf('.git')  == -1));
    })
  });
}

app.post('/search', function(req, res) {
  let words = req.body.search.split(' ');
  let proms_find = [];
  let proms_find_infiles = [];
  words.forEach(w => {
    proms_find.push(findFiles(w));
    proms_find_infiles.push(find_files.find({'term': w, 'flags': 'ig'}, config.files, '.md$'))
  });
  Promise.all(proms_find_infiles)
         .then(rs => {
           files = _.intersection(...rs.map(e => Object.keys(e)));
           Promise.all(proms_find)
                  .then(r => {
                    results = _.intersection(...r);
                    files = _.union(files, results);
                    res.json(files.map(n => n.replace(getRoot(), '')));
                  });
         })
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
