const fs = require('fs');

const params = process.argv.slice(2);

const file = params[0] || null;

function showError(err) {
    console.log(`\x1b[31mERROR:\x1b[0m ${err}`);
}

function showInfo(info) {
    console.log(`\x1b[34mINFO:\x1b[0m ${info}`);
}

fs.readFile(file, (err, data) => {
    if (err) {
        showError(`File '${file}' not found!`);
    } else {
        showInfo('File loaded');
        splitData(data.toString());
    }
});

function splitData(data) {
    showInfo('Reading file');
    console.log(data);
}