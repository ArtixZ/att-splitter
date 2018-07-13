const User = require('./User')
const _ = require('lodash')

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
}