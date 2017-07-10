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

function rmPath(object, rm) {
  object.path = object.path.replace(rm, '');
  if (object.children && object.children.length) {
    object.children.forEach(o => {
      rmPath(o, rm);
    });
  }
}
module.exports.rmPath = rmPath;
