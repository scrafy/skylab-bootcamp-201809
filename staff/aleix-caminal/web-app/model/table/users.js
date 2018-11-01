const Table = require('../table')
const User = require('../entity/user')

class UsersTable extends Table {
    newEntity(query) {
        return new User(query)
    }
}

module.exports = UsersTable
