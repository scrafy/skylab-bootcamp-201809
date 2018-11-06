const Table = require('../table')
const User = require('../entity/user')

class UsersTable extends Table {
    constructor(query) {
        super(query)
    }
    
    newEntity(query) {
        return new User(query)
    }

    save(user) {
        return this._save('users', user)
    }

    delete(user) {
        return this._delete('users', user)
    }
}

module.exports = UsersTable
