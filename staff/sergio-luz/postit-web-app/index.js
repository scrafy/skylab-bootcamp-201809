require('dotenv').config()
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const logic = require('./logic')
const package = require('./package.json')

const { argv: [, , port = process.env.PORT || 8080] } = process

const app = express()

app.use(express.static('./public'))
app.set('view engine', 'pug')

const formBodyParser = bodyParser.urlencoded({ extended: false })

const buildView = require('./helpers/build-view')


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
    req.session.error=null

    res.render('landing')
})

app.get('/register', (req, res) => {
    res.render('register', {error:req.session.error})
})

app.post('/register', formBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        logic.registerUser(name, surname, username, password)
            .then(() => {
                req.session.error = null

                res.render('register-confirm', { name })
            })
            .catch(({ message }) => {
                req.session.error = message

                res.redirect('/register')
            })
    } catch ({ message }) {
        error = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    res.render('login', { error: req.session.error })

})

app.post('/login', [formBodyParser, mySession], (req, res) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(id => {
                debugger
                req.session.userId = id
                req.session.error = null

                res.redirect('/home')
            })
            .catch(({ message }) => {
                req.session.error = message

                res.redirect('/login')
            })

    } catch ({ message }) {
        error = message

        res.redirect('/login')
    }
})

app.get('/home', mySession, (req, res) => {
    const id = req.session.userId
debugger
    if (id) {

        try {
            logic.retrieveUser(id)
                .then(user => {
                    debugger
                    const {name, postits}=user
                    const text=postits.map(post=> post.text)
                    return res.render('home', { name, text })})
                .then(({ message }) => {
                    req.session.error = message

                    res.redirect('/')
                })
        } catch ({ message }) {
            req.session.error = message

            res.redirect('/')
        }
    }
        else{
            res.redirect('/')
        }

})

app.get('/logout', mySession, (req, res) => {
    req.session.userId = null

    res.redirect('/')
})

app.get('/home/createNewPostit', mySession, (req, res) => {
    res.send(buildView(`
    <form action="/home/createNewPostit" method='POST'>
        <input name='text' placeholder='Write text here...'>
        <button type='submit'>Save postit</button>
    </form>`))
})

app.post('/home/createNewPostit', [formBodyParser, mySession], (req, res) => {
    const { text } = req.body
    debugger
    const id = req.session.userId
    logic.updatePostits(id, text)
    res.redirect('/home')
})


app.listen(port, () => console.log(`Server up and running on port ${port}`))