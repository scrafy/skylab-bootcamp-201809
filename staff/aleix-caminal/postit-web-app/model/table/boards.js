const Table = require('../table')
const Board = require('../entity/board')

class BoardsTable extends Table {
    constructor() {
        super('boards')
        this.hasMany('posts')
        this.belongsTo({ users: 'userId' })
    }

    newEntity(query) {
        return new Board(query)
    }
}

module.exports = BoardsTable
