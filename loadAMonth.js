
const pdf = require('pdf-parse');

const User = require('./User')

// const fp = global['fp']
module.exports = function loadAMonth(dataBuffer, fp) {
    return pdf(dataBuffer).then(function(data) {
 
        var pages = data.text.split('\n').filter(item => !!item)
        const dataRoamingPlan = data.text.match(/Wireless\s+?Group\s+?1\s+?-\s+?Usage Summary [-]?\s+\w*\s?\d?\d?(?: thru )?\w*\s?\d?\d? ([a-zA-Z &]+)\s+-/)[1].trim()
        const dataRoamingPlanMoney = data.text.match(new RegExp(dataRoamingPlan+'\\s+(\\d+\\.\\d\\d)'))[1]
        const daterange = pages[0].match(/\d{2}(\/\d{2}){2}\s-\s\d{2}(\/\d{2}){2}/)[0]
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
            const moneyNMoney = Number(money) + Number(dataRoamingPlanMoney) / splitted.length
            user.setMoneyToMonth(daterange, moneyNMoney)
        }
    
    
    });
}


