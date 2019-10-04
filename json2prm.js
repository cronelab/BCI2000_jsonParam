const fs = require('fs');
let data = ''
let file = fs.readFileSync('example.json');
console.log(JSON.parse(file).Application["Application%20Window"].ApplicationWindow.WindowBackgroundColor.DataType)
fs.writeFileSync('exampe_converted.prm', JSON.stringify(data));