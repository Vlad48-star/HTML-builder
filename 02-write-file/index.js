const path = require('path');
const fs = require('fs');
const file = path.join(__dirname, 'result.txt');
const writeStream = fs.createWriteStream(file);

process.stdout.write('Please enter text!\n');

process.on('SIGINT', exit);
process.stdin.on('data', item => {
    let text = item.toString().trim();
    if (text === 'exit') {
        exit();
    } else {
        writeStream.write(item);
    }
})

function exit() {
    process.stdout.write('Input completed');
    process.exit();
}
