const Table = require('../table')
const Board = require('../entity/board')

class BoardsTable extends Table {
    newEntity(query) {
        return new Board(query)
    }

    find() {
        return this._find('boards')
    }

    save(board) {
        return this._save('boards', board)
    }

    delete(board) {
        return this._delete('boards', board)
    }
}

module.exports = BoardsTable
