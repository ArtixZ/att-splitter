const User = require('./User')
const _ = require('lodash')
const xl = require("excel4node")

module.exports = class FamilyPlan {
    constructor() {
        this.users = []
    }

    addUser(number) {
        var newUser = new User(number)
        this.users.push(newUser)
        return newUser
    }
    findUser(number) {
        const user = this.users.find(usr => usr.getNumber() === number)
        if(user) return user
        return null
    }

    exportExcel() {
        console.log(this.users)
        const wb = new xl.Workbook()
        const ws = wb.addWorksheet("Sheet 1")
        let monthAry = []
        let columnNum
        for(let i=0; i<this.users.length; i++) {
            const user = this.users[i]
            ws.cell(i+2, 1).string(user.number)
            for(let date in user.monthlyMoney) {
                if(!monthAry.includes(date)) {
                    columnNum = monthAry.length + 2
                    monthAry.push(date)
                    ws.cell(1, columnNum).string(date)
                } else {
                    columnNum = monthAry.findIndex((d) => d === date) + 2
                }

            ws.cell(i+2, columnNum).number(user.monthlyMoney[date])

            }

        }

        wb.write('FamilyPlan.xlsx');

    }
}