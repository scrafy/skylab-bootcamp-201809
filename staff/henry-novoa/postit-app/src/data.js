// Model (domain) - Data

export const storage = sessionStorage
// const storage = localStorage

if (!storage.getItem('postits'))
    storage.setItem('postits', JSON.stringify([]))

if (!storage.getItem('people'))
storage.setItem('people', JSON.stringify([]))

// function Postit(text) {
//     this.text = text
//     this.id = Date.now()
// }

export class Postit {
    constructor(text) {
        this.text = text
        this.id = Date.now()
    }
}

export class User {
    constructor(name, surname, username, password) {
        this.name = name
        this.surname = surname
        this.username = username
        this.password =password
        this.id = Date.now()
    }
}
