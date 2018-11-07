const Table = require('../table')

class UsersTable extends Table {
    constructor() {
        super('users')
        this.hasMany('boards')
    }
}

module.exports = UsersTable
