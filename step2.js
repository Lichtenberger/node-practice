const fs = require('fs');
const process = require('process')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if(err) {
            console.log(err)
        } 
        console.log(data)
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(url)
        console.log(res.data)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`)
    }
}
let path = process.argv[2]

if (path.slice(0, 4) === 'http') {
    webCat(path)
} else {
    cat(path)
}