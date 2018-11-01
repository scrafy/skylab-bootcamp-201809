class Table {
    find(table) {
        this.table = JSON.parse(sessionStorage.getItem(table)) || []
        return this
    }

    where(query) {
        const filter = this.table => this.table.filter(entity => entity[key] == query[key])
        for (var key in query) this.table = filter(this.table)
        return this
    }

    save(table) {
        let elements = this.all()
        const index = elements.findIndex(element => element.id === this.id)
        index < 0 ? elements.push(this) : elements[index] = this
        sessionStorage.setItem(table, JSON.stringify(elements))
        return this
    }

    delete(table) {
        sessionStorage.setItem(table, JSON.stringify(this.all().filter(element => element.id !== this.id)))
    }

    all() {
        forEach()
        for (var key in elements[0]) this[key] = elements[0][key]
        return this
    }

    first(elements) {
        for (var key in elements[0]) this[key] = elements[0][key]
        return this
    }

    get(id) {
        return this.first(this.find({id: id}))
    }
}

module.exports = Table
