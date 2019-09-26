const fs = require('fs');

const params = process.argv.slice(2);

const file = params[0] || showError('Missing original file: No file was specified.\nYour command should look like: node app.js [path/to/original/file] [path/to/new/file] [your group]');
const resultFile =  params[1] || showError('Missing output file: No file was specified.\nYour command should look like: node app.js [path/to/original/file] [path/to/new/file] [your group]');
const toFilter = params[2] || 1;

if (params[2] == null) {
    showInfo('No group was specified. Default is 1');
}

const metadata = [];
const vEvents = [];
const newvEvents = [];

function showError(err) {
    console.log(`\x1b[31mERROR:\x1b[0m ${err}`);
    process.exit();
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
    const lines = data.split('\n');
    showInfo('Reading file');
    let status = 0; // 0: metadata | 1: new vEvent
    let newvEvent = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].split('\r')[0];
        if (status == 0) {
            if (line != 'BEGIN:VEVENT') {
                metadata.push(line);
            } else {
                status = 1;
                newvEvent.push(line);
            }
        } else if (status = 1) {
            if (line != 'END:VEVENT') {
                newvEvent.push(line);
            } else {
                newvEvent.push(line);
                vEvents.push(newvEvent);
                newvEvent = [];
                // status = 0;
            }
        } else {
            showError('The file is not in iCalendar format');
        }
    }
    vEvents.forEach((ve, i) => {
        for (let j = 0; j < ve.length; j++) {
            const line = ve[j];
            if (line.includes('groep') || line.includes('group')) {
                const groups = extractGroups(line);
                if (inGroups(groups)) {
                    newvEvents.push(vEvents[i]);
                }
            }
        }
    });
    buildNewFile();
}

function extractGroups(data) {
    const groups = data.match(/(groep: ).{1,}(\\n)|(group: ).{1,}(\\n)/gmi)[0].split('\\n')[0].replace(/\\/g, '');
    return groups.split(':')[1].trimLeft().split(',');
}

function inGroups(groups) {
    let inGroup = false;

    for(let i = 0; i < groups.length; i ++) {
        const g = groups[i];
        if(g.match(/\d-\d/)) {
            const range = g.split('-');
            if(toFilter >= parseInt(range[0]) && toFilter <= parseInt(range[1])) {
                return true;
            }
        } else if (g == '-') {
            return true;
        } else {
            if(toFilter == parseInt(g)) {
                return true;
            }
        }
    }

    return inGroup;
}

function buildNewFile() {
    let fileContents = "";
    metadata.forEach(line => {
        fileContents += line + '\n';
    });
    newvEvents.forEach(event => {
        for(let i = 0; i < event.length; i++) {
            fileContents += event[i] + '\n';
        }
    });
    fileContents += 'END:VCALENDAR';
    fs.writeFile(resultFile, fileContents, (err) => {
        if (err) {
            showError('Something went wrong\nPlease notify me by mail (lenny@lennyclaes.be) with the details below\n', err);
        };
        console.log('\x1b[32mSUCCESS\x1b[0m You can see your file at: ' + resultFile);
    })
}