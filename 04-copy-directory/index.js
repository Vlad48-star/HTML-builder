const fs = require('fs').promises;
const path = require('path');
const foldOrigin = path.join(__dirname, 'files');
const foldSecond = path.join(__dirname, 'files-copy');

const copyDir = async () => {
    try {
        await fs.mkdir(foldSecond, { recursive: true });
        const originFold = await fs.readdir(foldOrigin);
        const copyFold = await fs.readdir(foldSecond);

        for (const file of copyFold) {
            await fs.rm(path.join(foldSecond, file));
        }

        for (const file of originFold) {
            const origFold = path.join(foldOrigin, file);
            const copyFile = path.join(foldSecond, file);
            await fs.copyFile(origFold, copyFile);
        }
    } catch (err) {console.log(err)};
}
copyDir();