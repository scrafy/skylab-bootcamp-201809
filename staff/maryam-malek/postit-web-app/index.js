require('dotenv').config()
const express = require('express')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const sessionFileStore = require('session-file-store')
const FileStore = sessionFileStore(session)
const bodyParser = require('body-parser')
const buildView = require('./helpers/build-view')
const logic = require('./logic')

const { argv: [, , port = process.env.PORT || 8080] } = process

const app = express()

app.use(express.static('./public'))

let error = null

const formBodyParser = bodyParser.urlencoded({ extended: false })

const mySession = session({
    secret: 'my super secret',
    cookie: { maxAge: 60 * 60 * 24 },
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        path: './.sessions'
    })
})

app.get('/', (req, res) => {
    error = null

    res.send(buildView(`<a href="/login">Login</a> or <a href="/register">Register</a>`))
})

app.get('/register', (req, res) => {
    res.send(buildView(`<form action="/register" method="POST">
            <input type="text" name="name" placeholder="Name">
            <input type="text" name="surname" placeholder="Surname">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Register</button>
        </form>
        ${error ? `<p class="error">${error}</p>` : ''}
        <a href="/">go back</a>`))
})

app.post('/register', formBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        logic.registerUser(name, surname, username, password)

        error = null

        res.send(buildView(`<p>Ok! user ${name} registered.</p>
                <a href="/">go back</a>`))
    } catch ({ message }) {
        error = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {

    res.send(buildView(`<form action="/login" method="POST">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Login</button>
        </form>
        ${error ? `<p class="error">${error}</p>` : ''}
        <a href="/">go back</a>`))
})

app.post('/login', [formBodyParser, mySession], (req, res) => {
    const { username, password } = req.body
    try {
        const id = logic.authenticateUser(username, password)

        req.session.userId = id

        error = null

        res.redirect('/home')
    } catch ({ message }) {
        error = message

        res.redirect('/login')
    }
})

app.get('/home', mySession, (req, res) => {
    const id = req.session.userId

    if (id) {
        const user = logic.retrieveUser(id)

        res.send(buildView(`<p>Welcome ${user.name}!</p>
                        <a href="/postits">Go to my Postits</a>
                        <a href="/logout">logout</a>`))
    } else res.redirect('/')
})
app.get('/postits', mySession, (req, res) => {
    const id = req.session.userId

    if (id) {
        const user = logic.retrieveUser(id)

        res.send(buildView(`<p>${user.name}'s postits!</p>
        <form action="/postits" method="POST">
            <input type="text" name="body" placeholder="Write here...">
            <button type="submit">Create postit</button>
        </form>
        ${error ? `<p class="error">${error}</p>` : ''}
        <ul>
        ${user.postits.map(postit => `<li>${postit.body}</li><a href="/deletePostit${postit.id}">Delete</a>`).join('')}
        </ul>
        <a href="/home">Go to home</a>
        <a href="/logout">logout</a>`))

    } else res.redirect('/')
})

app.get('/deletePostit:id', mySession, (req, res) => {
    debugger
    const { postitId } = req.params.id

    const userId = req.session.userId

    try{
        logic.deletePostit(userId, postitId)

        res.redirect('/postits')
    } catch ({message}) {
        
        error = message

        res.redirect('/postits')
    }

})

app.post('/postits', [formBodyParser, mySession], (req, res) => {
    const { body } = req.body

    const userId = req.session.userId

    try {
        logic.savePostit(userId, body)

        res.redirect('/postits')
    } catch ({ message }) {

        error = message

        res.redirect('/postits')
    }


})
app.get('/logout', mySession, (req, res) => {
    req.session.userId = null

    res.redirect('/')
})

app.get('/users', (req, res) => {
    res.send(buildView(`<ul>
            ${logic._users.map(user => `<li>${user.id} ${user.name} ${user.surname}</li>`).join('')}
        </ul>
        <a href="/">go back</a>`))
})

app.listen(port, () => console.log(`Server up and running on port ${port}`))