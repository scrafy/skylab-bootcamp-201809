class Table {
    _find(table) {
        this.table = JSON.parse(sessionStorage.getItem(table)) || []
        return this
    }

    _save(table) {
        const index = this.table.findIndex(element => element.id === this.id)
        index < 0 ? this.table.push(this) : this.table[index] = this
        sessionStorage.setItem(table, JSON.stringify(this.table))
        return this
    }

    _delete(table) {
        sessionStorage.setItem(table, JSON.stringify(this.all().filter(element => element.id !== this.id)))
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
