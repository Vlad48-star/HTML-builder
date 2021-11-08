const fs = require('fs').promises;
const path = require('path');
const foldStyles = path.join(__dirname, 'styles');
const foldJoin = path.join(__dirname, 'project-dist', 'bundle.css');

const merge = async () => {
    try {
        const unit = await fs.readdir(foldStyles, { withFileTypes: true });
        const mass = [];

        for (const file of unit) {
            const exten = file.name.split('.').pop();
            if (file.isFile() && exten == 'css') {
                const fileStyles = path.join(foldStyles, file.name);
                const data = await fs.readFile(fileStyles, 'utf-8');
                mass.push(data);
            }
        }
        await fs.writeFile(path.join(foldJoin), mass);
    } catch (err) {console.log(err)}
}
merge();