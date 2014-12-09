CsvStorage = (function() {
  var fs = Npm.require('fs');
  function _private() {

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
    for(var line = lines[i]; i < lines.length; i++, line = lines[i]) {
      lines.push(line.trim().split(","));
    }
    return lines; 
  };
  _private.readLines = function(data) {
    if(data && data.length) {
      return _private.createLines(data);
    } else {
      return [];
    }
  };
  _private.writeLines = function(path, lines) {
    path = _private.getPath(path);
    var stream = fs.createWriteStream(path);
    stream.once('open', function(fd) {
      stream.write("My first row\n");
      stream.write("My second row\n");
      stream.end();
    });
  };

  function CsvStorage() {

  };
  /*
  * Returned lines [
  *   line1: [value1, value2, value3, ..., ... ]
  * ]
  */
  CsvStorage.prototype.read = function(path) {
    if(!path) {
      throw new Error("Please, enter correct path. It doesn't exists or undefined.");
    }
    var data = _private.readData(path);
    return _private.readLines(data);
  };
  /**
   * @param {string} path - Path to your file.
   * @param array lines - [line1, line2, ..., ... ].
   * line1: [value1, value2, value3, ..., ... ]
   */
  CsvStorage.prototype.write = function(path, lines) {
    if(!path) {
      throw new Error("Please, enter correct path. It doesn't exists or undefined.");
    }
    // write to file
  };

  return CSV;
})();