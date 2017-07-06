const fs = require('fs');
const path = require('path');

module.exports.writeJson = function(file, json) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(file, JSON.stringify(json), function(err) {
        if(err) reject(err);
        else resolve();
    });
  });
}

function rmPath(object) {
  delete(object.path);
  if (object.children && object.children.length) {
    object.children.forEach(o => {
      rmPath(o);
    });
  }
}
module.exports.rmPath = rmPath;
