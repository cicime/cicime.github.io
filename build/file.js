var fs = require('fs');
var path = require('path');
var data = require('../src/data')

module.exports = fs.writeFileSync('./static/diary.json', JSON.stringify(data));