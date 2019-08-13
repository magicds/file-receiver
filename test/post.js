const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

module.exports = function(url, serverPath, file) {
    const form = new FormData();
    form.append('serverPath', serverPath);
    form.append('file', fs.createReadStream(path.resolve(file)));
    axios
        .post(url, form, {
            headers: {
                ...form.getHeaders()
            },
            maxContentLength: Infinity
        })
        .then(
            res => {
                console.log(res.data);
            },
            err => {
                console.error(err);
            }
        );
};
// form.append('serverPath', 'D:/Code/so/file-receiver/testOutput');
// form.append('file', fs.createReadStream(path.resolve(__dirname, './tmp.zip')));
// axios
//     .post(
//         'http://localhost:2001/',
//         form,
//         {
//             headers: {
//                 ...form.getHeaders()
//             },
//             maxContentLength: Infinity
//         }

//         // form.getBuffer(),
//         // form.getHeaders(),
//         // function(error, response, body) {
//         //     console.error('error:', error); // Print the error if one occurred
//         //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         //     console.log('body:', body); // Print the HTML for the Google homepage.
//         // }
//     )
//     .then(
//         res => {
//             console.log(res.data);
//         },
//         err => {
//             console.error(err);
//         }
//     );
