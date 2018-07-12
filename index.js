// var rp = require('request-promise')

// var options = {
//     method: 'POST',
//     uri: 'https://myattdx05.att.com/commonLogin/igate_wam/multiLogin.do',
//     body: {
//         some: 'payload'
//     },
// };

const fs = require('fs');
const pdf = require('pdf-parse');

const User = require('./User')

let dataBuffer = fs.readFileSync('./ATT_512104114746_20180614.pdf');
 
pdf(dataBuffer).then(function(data) {
 
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text); 
    var content = data.text.substring(data.text.indexOf('Service Summary'), data.text.indexOf('Total New Charges'))
});

