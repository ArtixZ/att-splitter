const fs = require('fs');
const FamilyPlan = require('./FamilyPlan')
const loadAmonth = require('./loadAMonth')


const fp = new FamilyPlan()
// global['fp'] = fp
const folderName = './billings/';

async function readFilesFromFolder(folderName) {
    const reqArray = fs.readdirSync(folderName).map(file => {
        let dataBuffer = fs.readFileSync(`${folderName}${file}`)
        return loadAmonth(dataBuffer, fp)
    })
    await Promise.all(reqArray)
    console.log(fp)

}

readFilesFromFolder(folderName)