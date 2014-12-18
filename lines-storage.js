LinesStorage = (function() {
  var fs = Npm.require('fs');
  var i = 1;
  var _private = {

  };
  _private.getPath = function(path) {
    var base = process.env.PWD;
    path = base + path;

    return path;
  };
  _private.readData = function(path) {
    var Future = Npm.require('fibers/future');
    var fut = new Future();
    path = _private.getPath(path);
    var input = fs.createReadStream(path);
    var remaining = '';
    input.on('data', function(data) {
      remaining += data;
      fut['return'](remaining);
    });
    return fut.wait();
  };
  _private.createLines = function(data) {
    var strLines = data.trim().split("\n");
    var lines = [];
    var i = 0;
    for(var line = strLines[i]; i < strLines.length; i++, line = strLines[i]) {
      lines.push(line.trim().split(","));
    }
    return lines;
  };
  _private.readLines = function(data) {
    if(data && data.length) {
      return data.split("\n");
    } else {
      return [];
    }
  };
  _private.writeLines = function(path, lines) {
    path = _private.getPath(path);
    var stream = fs.createWriteStream(path);
    stream.once('open', function(fd) {
      var i = 0;
      for(var line = lines[i]; i < lines.length; i++, line = lines[i]) {
        stream.write(line + "\n");
      }
      stream.end();
    });
  };
  _private.writeDataAppend = function(path, data) {
    path = _private.getPath(path);
    fs.open(path, 'a', 0666, function(err, fd) {
      fs.writeSync(fd, data);
    });
  };
  _private.writeData = function(path, data) {
    path = _private.getPath(path);
    var stream = fs.createWriteStream(path);
    stream.once('open', function(fd) {
      stream.write(data);
      stream.end();
    });
  }


  var LinesStorage = {

  };
  /*
  * Returned lines [
  *   line1: "value1, value2",
  *   line1: "value1, value2"
  * ]
  */
  LinesStorage.read = function(path) {
    if(!path) {
      throw new Error("Please, enter correct path. It doesn't exists or undefined.");
    }
    var data = _private.readData(path);
    return data;
  };
  /**
   * @param {string} path - Path to your file. start from '/', '/config/example.csv'
   * @param array lines - [line1, line2, ..., ... ].
   * line1: "value1, valu2, value3"
   */
  LinesStorage.writeLines = function(path, lines) {
    if(!path) {
      throw new Error("Please, enter correct path. It doesn't exists or undefined.");
    }
    _private.writeLines(path, lines);
  };
  LinesStorage.write = function(path, data) {
    if(!path) {
      throw new Error("Please, enter correct path. It doesn't exists or undefined.");
    }
    _private.writeData(path, data);
  };
  LinesStorage.isExist = function(path) {
    path = _private.getPath(path);
    return fs.existsSync(path);
  };

  return LinesStorage;
})();
