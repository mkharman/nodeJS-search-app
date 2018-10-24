console.log('App is Up\n');

// Loading File System module
const fs = require('fs');

// Loading Path module
const path = require('path');

// Flag to signal if the file is found after searching the root directory and sub-directories
let isFound = false;

// Function for getting the arguments the user has entered in the command line
// The arguments which concern the search function are the file extension and name
const getArguments = () => {
    const args = process.argv.slice(2);
    return args;
};

// Main function for file searching
// @param: directory - the directory in which the search is being conducted
const search = directory => {
    const fields = getArguments();

    // In case the user entered a wrong number of parameters, a message will be displayed
    if (fields.length <= 1 || fields.length > 2) {
        console.log('In order to search for a file, please enter the following format:');
        console.log('USAGE: node search [EXT] [TEXT]\n');
        isFound = true;
    }
    else {
        const extension = '.' + fields[0];
        const fileName = fields[1];

        // Gets all the files in the current directory
        const files = fs.readdirSync(directory); 

        files.forEach(file => {
            // In case this is a sub-directory, call the search function again 
            // recursively with the sub-directory as an argument
            if (fs.statSync(`${directory}\\${file}`).isDirectory()) {
                search(`${directory}\\${file}`);
            }
            else if (path.extname(file) === extension && file.includes(fileName)) {
                console.log(`${directory}\\${file}`);
                isFound = true;
            }
        });
    }
};

// Program Run
search(__dirname); // __dirname is the root directory in which the program is running
if (!isFound) console.log('No file was found');