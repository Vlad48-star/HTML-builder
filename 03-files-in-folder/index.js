const path = require("path");
const fs = require("fs");
const file = path.join(__dirname, "secret-folder");


fs.readdir(file, { withFileTypes: true }, (err, files) => {
    if(err){
        console.log(err);
        return;
    } 
    console.log("Directory:");
      
    files.forEach( file => {
        if (file.isFile() === false) {
            return;
        }
        const nameFile = path.parse(file.name).name;
        const nameForm = path.extname(file.name).slice(1);
        const filePath = path.join(__dirname, "secret-folder", file.name);   

        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            }   
            console.log(`${nameFile} - ${nameForm} - ${stats.size}b`);
        });
    });
});

