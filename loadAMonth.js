
const pdf = require('pdf-parse');

const User = require('./User')

// const fp = global['fp']
module.exports = function loadAMonth(dataBuffer, fp) {
    return pdf(dataBuffer).then(function(data) {
 
        var pages = data.text.split('\n').filter(item => !!item)
        const daterange = pages[0].match(/\d{2}(\/\d{2}){2}\s-\s\d{2}(\/\d{2}){2}/)[0].replace(/\s/g, '')
        var content = pages[0].substring(data.text.indexOf('Service Summary'), data.text.indexOf('Total New Charges'))
        var re = /\d*?\.\d*?\s\d{3}\s\d{3}-\d{4}\w*?/
        var splitted = content.split('$').filter(item => re.test(item))
        var mReg = /\d*\.\d*/
        var nReg = /\d{3}\s\d{3}-\d{4}/
        for(let i=0; i<splitted.length; i++) {
            const number = splitted[i].match(nReg)[0].replace(' ', '-')
            const money = splitted[i].match(mReg)[0]
            let user = fp.findUser(number)
            if(!user) user = fp.addUser(number)
            user.setMoneyToMonth(daterange, money)
        }
    
    
    });
}


