const fs = require('fs');
const process = require('process')

function cat(path) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if(err) {
            console.log(err)
        } 
        console.log(data)
    })
}

cat(process.argv[2])