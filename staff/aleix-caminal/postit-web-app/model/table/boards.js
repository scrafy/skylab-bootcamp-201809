const Table = require('../table')

class BoardsTable extends Table {
    constructor() {
        super('boards')
        this.hasMany('posts')
        this.belongsTo({ users: 'userId' })
    }
}

module.exports = BoardsTable
