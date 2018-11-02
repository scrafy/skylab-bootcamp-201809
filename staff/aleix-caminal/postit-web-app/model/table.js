class Table {
    _find(table) {
        this.table = JSON.parse(sessionStorage.getItem(table)) || []
        return this
    }

    _save(table, entity) {
        const index = this.table.findIndex(element => element.id === entity.id)
        index < 0 ? this.table.push(entity) : this.table[index] = entity
        sessionStorage.setItem(table, JSON.stringify(this.table))
        return entity
    }

    _delete(table, entity) {
        sessionStorage.setItem(table, JSON.stringify(this.table.filter(element => element.id !== entity.id)))
        return true
    }

    where(query) {
        const filter = this.table => this.table.filter(entity => entity[key] == query[key])
        for (var key in query) this.table = filter(this.table)
        return this
    }

    all() {
        return this.table
    }

    first() {
        return this.table[0]
    }

    get(id) {
        return this.find().where({id}).first())
    }
}

module.exports = Table
