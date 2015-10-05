/**
 * Created by m.huber on 05/10/2015.
 */

exports.lcovHack = function (lcovFilePath, outputPath) {

    var fs = require('fs');

    var data = fs.readFileSync("./remapIstanbul/remappedLcov.info", 'utf-8');

    var newValue = data.replace(/SF:(.*?)::delete::/g, 'SF:');

    fs.writeFileSync(outputPath, newValue, 'utf-8');

}
