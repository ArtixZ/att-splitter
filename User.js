module.exports = class {
    constructor(number) {
        this.number = number
        this.monthlyMoney = {}
    }

    setMoneyToMonth(dateRage, money) {
        this.monthlyMoney[dateRage] = money
    }
    
    getNumber() {
        return this.number
    }
    getMonthlyMoney() {
        return this.monthlyMoney
    }
}