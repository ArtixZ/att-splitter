module.exports = class {
    constructor() {
        this.monthlyMoney = {}
    }

    setMoneyToMonth(month, money) {
        this.monthlyMoney[month] = money
    }
}