const fs = require('fs').promises;;
const path = require('path');
const foldJoin = path.join(__dirname, 'project-dist');
const templFile = path.join(__dirname, 'template.html');
const foldCompon = path.join(__dirname, 'components');
const foldStyles = path.join(__dirname, 'styles');
const origFolder = path.join(__dirname, 'assets');
const copyFolder = path.join(__dirname, 'project-dist', 'assets');

const createPage = async () => {
    try {
        const arr = await fs.readdir('06-build-page', { withFileTypes: true });
        const isFold = arr.some( item => item.name === 'project-dist');
        if (isFold) {
            await fs.rm(foldJoin, { force: true, recursive: true });
        }
        const data = await fs.readFile(templFile, 'utf-8');
        const comp = await fs.readdir(foldCompon, { withFileTypes: true });
        await fs.mkdir(foldJoin);
        await fs.writeFile(path.join(foldJoin, 'index.html'), data);

        for (const file of comp) {
            const name = `{{${file.name.split('.')[0]}}}`;
            const exten = file.name.split('.').pop();
            if (file.isFile() && exten === 'html') {
                const compHtml = path.join(foldCompon, file.name);
                const createData = await fs.readFile(compHtml, 'utf-8');
                const newFile = await fs.readFile(path.join(foldJoin, 'index.html'), 'utf-8');
                await fs.writeFile(path.join(foldJoin, 'index.html'), newFile.replace(name, createData));
            }
        }
    } catch (err) {console.log(err)}
}

const copyDir = async (origFolder, copyFolder) => {
    try {
        await fs.mkdir(copyFolder);
        const originFold = await fs.readdir(origFolder, { withFileTypes: true });

        for (const file of originFold) {
            const origFold = path.join(origFolder, file.name);
            const copyFold = path.join(copyFolder, file.name);

            if (file.isFile()) {
                await fs.copyFile(origFold, copyFold);
            } else {
                await copyDir(origFold, copyFold);
            }
        }
    } catch (err) {console.log(err)}
}

const merge = async () => {
    try {
        const unit = await fs.readdir(foldStyles, { withFileTypes: true });
        const mass = [];

        for (const file of unit) {
            const exten = file.name.split('.').pop();
            if (file.isFile() && exten === 'css') {
                const fileStyles = path.join(foldStyles, file.name);
                const data = await fs.readFile(fileStyles, 'utf-8');
                mass.push(data);
            }
        }
        await fs.writeFile(path.join(foldJoin, 'style.css'), mass);
    } catch (err) {console.log(err);}
}

const buildPage = async () => {
    try {
        await createPage();
        await merge();
        await copyDir(origFolder, copyFolder);
    } catch (err) {console.log(err)}
}
buildPage();