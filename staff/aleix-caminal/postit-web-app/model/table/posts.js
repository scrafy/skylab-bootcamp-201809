const Table = require('../table')
const Post = require('../entity/post')

class PostsTable extends Table {
    newEntity(query) {
        return new Post(query)
    }

    find() {
        return this._find('posts')
    }

    save(post) {
        return this._save('posts', post)
    }

    delete(post) {
        return this._delete('posts', post)
    }
}

module.exports = PostsTable
