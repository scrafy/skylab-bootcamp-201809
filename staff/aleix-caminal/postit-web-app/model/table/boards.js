const Table = require('../table')
const Board = require('../entity/board')

class BoardsTable extends Table {
    constructor(query) {
        super(query)
    }
    
    newEntity(query) {
        return new Board(query)
    }

    save(board) {
        return this._save('boards', board)
    }

    delete(board) {
        return this._delete('boards', board)
    }
}

module.exports = BoardsTable
