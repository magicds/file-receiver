const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// const post = require('./post.js');
const post = require('./post.js');

const outputFile = path.join(__dirname, 'tmp.zip');

const output = fs.createWriteStream(outputFile);
output.on('close', function() {
    console.log('output close');

    post('/', 'D:/Code/so/file-receiver/testOutput', outputFile);
});

output.on('end', function() {
    console.log('output end');
});

const zip = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

zip.on('warning', function(ev) {
    console.log(ev);
});

zip.on('end', function() {
    console.log('zip end');
});

zip.pipe(output);

zip.directory(path.resolve('D:\\Code\\so\\article\\docs\\.vuepress\\dist'), false);
zip.finalize()
    .then(() => {
        console.log('finalize');
    })
    .catch(err => {
        console.error(err);
    });
