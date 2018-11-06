const Table = require('../table')
const Board = require('../entity/board')

class BoardsTable extends Table {
    constructor() {
        super('boards')
    }

    newEntity(query) {
        return new Board(query)
    }
}

module.exports = BoardsTable
