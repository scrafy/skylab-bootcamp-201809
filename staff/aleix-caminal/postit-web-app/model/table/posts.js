const Table = require('../table')
const Post = require('../entity/post')

class PostsTable extends Table {
    constructor(query) {
        super(query)
    }
    
    newEntity(query) {
        return new Post(query)
    }

    save(post) {
        return this._save('posts', post)
    }

    delete(post) {
        return this._delete('posts', post)
    }
}

module.exports = PostsTable
