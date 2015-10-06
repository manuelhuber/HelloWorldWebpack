module.exports = function (content, map) {
    this.cacheable();
    var resource = this.resource;
    var loaderUtils = require("loader-utils");
    var path = require("path");
    var array = resource.split("\\");

    var fileName = array[array.length - 1];
    var query = loaderUtils.parseQuery(this.query);

    var directory = path.join(__dirname, "savegame", query.save);

    var fs = require('fs');
    var mkdirp = require('mkdirp');

    mkdirp(directory, function (err) {
        //log error except "directory already exists"
        //if(err & !(err.code=='EEXIST')){
        if (err) {
            console.log(err.code);
        }
    });

    fs.writeFile(directory + "/" + fileName + ".log", content, function (err) {
        if (err) {
            console.log(err);

        }
    });
    fs.writeFile(directory + "/" + fileName + ".map.json", JSON.stringify(map), function (err) {
        if (err) {
            console.log(err);

        }
    });

    this.callback(null, content, map);

}
