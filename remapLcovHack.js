/**
 * Created by m.huber on 05/10/2015.
 */

var fs = require('fs');

var lcovFilePath = process.argv[2]

var data = fs.readFileSync(lcovFilePath.toString(), 'utf-8');

var newValue = data.replace(/SF:(.*?)::delete::/g, 'SF:');

fs.writeFileSync('lcovHacked.info', newValue, 'utf-8');

console.log('readFileSync complete');



