const Table = require('../table')
const User = require('../entity/user')

class UsersTable extends Table {
    constructor() {
        super('users')
    }

    newEntity(query) {
        return new User(query)
    }
}

module.exports = UsersTable
