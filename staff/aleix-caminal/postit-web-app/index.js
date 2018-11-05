require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')

const { argv: [, , port = process.env.PORT || 3000] } = process
const formBodyParser = bodyParser.urlencoded({extended: false})

/* const mySession = session({
    secret: 'my super secret',
    cookie: { maxAge: 60 * 60 * 24 },
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        path: './.sessions'
    })
})
app.use(mySession) */

app.use(express.static('public'))
app.set('view engine', 'pug')

let auth = {username: 'aleis'}
let boards = [
    {
        id: 1,
        title: 'TODO',
        posts: []
    },
    {
        id: 2,
        title: 'WIP',
        posts: [
            {
                id: 1,
                title: 'Migrate to Pug'
            },
            {
                id: 2,
                title: 'Logic'
            }
        ]
    },
    {
        id: 3,
        title: 'DONE',
        posts: [
            {
                id: 3,
                title: 'Styles'
            }
        ]
    }
]

function parseData(data) {
    let result = {}
    data.split('&').forEach(keyValue => {
        const [key, value] = keyValue.split('=')
        result[key] = value
    })

    return result
}

app.get('/', (req, res) => {
    res.redirect(auth && Object.keys(auth).length > 0 ? '/home' : '/login')
})

app.get('/register', (req, res) => {
    if (!auth || Object.keys(auth).length === 0) {
        res.render('register', { auth })
    } else {
        res.redirect('/home')
    }
})

app.get('/login', (req, res) => {
    if (!auth || Object.keys(auth).length === 0) {
        res.render('login', { auth })
    } else {
        res.redirect('/home')
    }
})

app.get('/logout', (req, res) => {
    auth = {}
    res.redirect('/login')
})

app.get('/home', (req, res) => {
    if (auth && Object.keys(auth).length > 0) {
        res.render('home', { auth, boards })
    } else {
        res.redirect('/login')
    }
})

app.post('/register', (req, res) => {
    let data = ''

    req.on('data', chunk => data += chunk)

    req.on('end', () => {
        const register = parseData(data)
        const user = {
            id: Date.now(),
            name: register.name,
            surname: register.surname,
            username: register.username,
            password: register.password
        }

        users.push(user)
        res.redirect('/login')
    })
})

app.post('/login', (req, res) => {
    let data = ''

    req.on('data', chunk => data += chunk)

    req.on('end', () => {
        const login = parseData(data)
        auth = users.find(user => user.username === login.username && user.password === login.password) || {}
        res.redirect('/home')
    })
})

app.listen(port, () => console.log(`Server up and running on port ${port}`))
