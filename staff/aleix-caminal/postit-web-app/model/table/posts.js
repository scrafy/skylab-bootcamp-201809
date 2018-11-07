const Table = require('../table')

class PostsTable extends Table {
    constructor() {
        super('posts')
        this.belongsTo({ boards: 'boardId' })
    }
}

module.exports = PostsTable
