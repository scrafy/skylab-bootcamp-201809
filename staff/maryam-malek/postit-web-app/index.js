require('dotenv').config()
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const buildView = require('./helpers/build-view')
const logic = require('./logic')
const package = require('./package.json')


const { argv: [, , port = process.env.PORT || 8080] } = process

const app = express()

app.use(express.static('./public'))

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

app.use(mySession)

app.get('/', (req, res) => {
    req.session.error = null

    res.send(buildView(`<a href="/login">Login</a> or <a href="/register">Register</a>`))
})

app.get('/register', (req, res) => {
    const error = req.session.error
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
            .then(() => {
                req.session.error = null

                res.send(buildView(`<p>Ok! user ${name} registered.</p>
                        <a href="/">go back</a>`))
            })
            .catch(({ message }) => {
                req.session.error = message
                res.redirect('/register')
            })

    } catch ({ message }) {

        req.session.error = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    const error = req.session.error

    res.send(buildView(`<form action="/login" method="POST">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Login</button>
        </form>
        ${error ? `<p class="error">${error}</p>` : ''}
        <a href="/">go back</a>`))
})

app.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body
    try {
        logic.authenticateUser(username, password)
            .then(id => {
                req.session.userId = id

                req.session.error = null

                res.redirect('/home')
            })
            .catch(({ message }) => {
                req.session.error = message

                res.redirect('/login')
            })

    } catch ({ message }) {
        req.session.error = message

        res.redirect('/login')
    }
})

app.get('/home', (req, res) => {
    const id = req.session.userId
    if (id) {
        try {
            logic.retrieveUser(id)
                .then(user => {
                    res.send(buildView(`<p>Welcome ${user.name}!</p>
                                    <a href="/postits">Go to my Postits</a>
                                    <a href="/logout">logout</a>`))
                })
                .catch(({ message }) => {
                    req.session.error = message
                    
                    res.redirect('/')
                })
        } catch ({ message }) {
            req.session.error = message

            res.redirect('/')
        }
    } else res.redirect('/')
})
app.get('/postits', (req, res) => {
    const id = req.session.userId
    const error = req.session.error

    if (id) {
        try {
            logic.retrieveUser(id)
                .then(user => {
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
                })
                .catch(({ message }) => {
                    req.session.error = message
                    res.redirect('/')
                })
        } catch ({ message }) {
            req.session.error = message

            res.redirect('/')
        }

    } else res.redirect('/')
})

app.get('/deletePostit:id', (req, res) => {
    const { postitId } = req.params.id

    const userId = req.session.userId

    try {
        logic.deletePostit(userId, postitId)
            .then(() => {
                res.redirect('/postits')
            })
            .catch(({ message }) => {
                req.session.error = message
                res.redirect('/postits')
            })

    } catch ({ message }) {

        req.session.error = message

        res.redirect('/postits')
    }

})

app.post('/postits', formBodyParser, (req, res) => {
    const { body } = req.body

    const userId = req.session.userId

    try {
        logic.savePostit(userId, body)
            .then(() => {
                res.redirect('/postits')
            })
            .catch(({ message }) => {
                req.session.error = message
                res.redirect('/postits')
            })

    } catch ({ message }) {

        req.session.error = message

        res.redirect('/postits')
    }
})

app.get('/logout', (req, res) => {
    req.session.userId = null

    res.redirect('/')
})

app.listen(port, () => console.log(`Server ${package.version} up and running on port ${port}`))