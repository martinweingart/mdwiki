const config = require('./config');
const utils = require('./utils')
const express = require('express');
const http = require('http')
const walk = require('walk');
const fs = require('fs');
const path = require('path');
const dirtree = require('directory-tree');

let app = express();
let server = http.Server(app);
server.listen(config.port, config.host);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
  next();
});

app.use('/files', express.static(config.files));

app.get('/info', function(req, res) {
  let tree = dirtree(config.files, { extensions:/\.md$/ });
  utils.rmPath(tree);
  res.json(tree.children);
});
