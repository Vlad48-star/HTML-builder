const path = require('path');
const fs = require('fs');
const file = path.join(__dirname, 'text.txt');
const read = fs.createReadStream(file, 'utf-8');

read.on('data', chunk => console.log(chunk));