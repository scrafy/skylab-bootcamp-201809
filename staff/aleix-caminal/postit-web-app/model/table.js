require('dotenv').config()
const fs = require('fs')

class Table {
    constructor(table) {
        this.database = process.env.DB + table + '.json'
        this.table = JSON.parse(fs.readFileSync(this.database, 'utf8')) || []
        this.primaryKey = 'id'
    }

    save(entity) {
        const index = this.table.findIndex(element => element.id === entity.id)
        index < 0 ? this.table.push(entity) : this.table[index] = entity
        fs.writeFile(this.database, JSON.stringify(this.table), 'utf-8', err => {
            if (err) throw err;
        })

        return entity
    }

    delete(entity) {
        this.table.filter(element => element.id !== entity.id)
        fs.writeFile(this.database, JSON.stringify(this.table), 'utf-8', err => {
            if (err) throw err;
        })

        return true
    }

    where(query) {
        for (var key in query) {
            this.table = this.table.filter(entity => entity[key] == query[key])
        }

        return this
    }

    all() {
        return this.table
    }

    first() {
        return this.table[0]
    }

    get(id) {
        return this.where({id}).first()
    }
}

module.exports = Table
