/**
 * Created by m.huber on 05/10/2015.
 */

exports.lcovHack = function (lcovFilePath, outputPath, marker) {

    var fs = require('fs');

    var data = fs.readFileSync(lcovFilePath, 'utf-8');

    var regexString = "SF:(.*?)" + marker;

    var regex = new RegExp(regexString, "g");

    var newValue = data.replace(regex, 'SF:');

    fs.writeFileSync(outputPath, newValue, 'utf-8');

}
