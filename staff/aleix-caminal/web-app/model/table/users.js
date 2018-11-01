const Table = require('../table')
const User = require('../entity/user')

class UsersTable extends Table {
    newEntity(query) {
        return new User(query)
    }

    find(table) {
        return this._find('users')
    }

    save(table) {
        return this._save('users')
    }

    delete(table) {
        return this._delete('users')
    }
}

module.exports = UsersTable
