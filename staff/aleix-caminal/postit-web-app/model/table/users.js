const { Table } = require('lilli')

class UsersTable extends Table {
    constructor() {
        super('users')
        this.hasMany('boards')
    }
}

module.exports = UsersTable
