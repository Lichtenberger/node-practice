const fs = require('fs');
const process = require('process')
const axios = require('axios')

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf-8', function(err) {
            if (err) {
                console.log(`Error writing ${out}: ${err}`)
                process.exit(1)
            }
        })
    }
    console.log(text)
}

function cat(path) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if(err) {
            console.log(err)
        } 
        handleOutput(data, out)
    })
}

async function webCat(url, out) {
    try {
        let res = await axios.get(url)
        handleOutput(res.data, out)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`)
        process.exit(1)
    }
}

let path
let out

if (process.argv[2] === '--out') {
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out)
} else {
    cat(path, out)
}