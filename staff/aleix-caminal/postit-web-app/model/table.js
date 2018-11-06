require('dotenv').config()
const fs = require('fs')

class Table {
    constructor(table) {
        this.table = table
        this.database = process.env.DB + table + '.json'
        this.query = JSON.parse(fs.readFileSync(this.database, 'utf8')) || []
        this.data = Object.freeze(this.query)
        this.primaryKey = 'id'
        this.foreignKeys = {}
    }

    hasMany(table) {
        this.hasMany[table] = require('./table/' + table)
    }

    belongsTo(table) {
        this.foreignKeys = Object.assign(this.foreignKeys, table)
    }

    contains(table) {
        this.query.forEach((element, index) => {
            const foreignTable = new this.hasMany[table]
            this.query[index][table] = foreignTable.where({
                [foreignTable.foreignKeys[this.table]]: element[this.primaryKey]
            }).all()
        })

        return this
    }

    where(query) {
        for (var key in query) {
            this.query = this.query.filter(element => element[key] == query[key])
        }

        return this
    }

    save(entity) {
        let data = this.data.slice()
        const index = data.findIndex(element => element[this.primaryKey] === entity[this.primaryKey])
        index < 0 ? data.push(entity) : data[index] = entity
        fs.writeFile(this.database, JSON.stringify(data), 'utf-8', err => {
            if (err) throw err;
        })

        return entity
    }

    delete(entity) {
        let data = this.data.slice()
        data = data.filter(element => element[this.primaryKey] !== entity[this.primaryKey])
        fs.writeFile(this.database, JSON.stringify(data), 'utf-8', err => {
            if (err) throw err;
        })

        return true
    }

    all() {
        return this.query
    }

    first() {
        return this.query[0]
    }

    get(value) {
        return this.where({ [this.primaryKey]: value }).first()
    }
}

module.exports = Table
