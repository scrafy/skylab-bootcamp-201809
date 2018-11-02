const Table = require('../table')
const User = require('../entity/user')

class UsersTable extends Table {
    newEntity(query) {
        return new User(query)
    }

    find() {
        return this._find('users')
    }

    save(user) {
        return this._save('users', user)
    }

    delete(user) {
        return this._delete('users', user)
    }
}

module.exports = UsersTable
