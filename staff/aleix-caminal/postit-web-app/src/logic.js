const { sha256 } = require('js-sha256')
const { UsersTable } = require('./model/table/users')
const { BoardsTable } = require('./model/table/posts')
const { PostsTable } = require('./model/table/boards')

const LOGIC = {
    auth: JSON.parse(sessionStorage.getItem('auth')) || {},

    addBoard(form, user_id) {
        if (typeof form !== 'object' || form.tagName !== 'FORM') throw Error('no form passed as argument')

        if (this.validate(form, ['title'])) {
            const boardsTable = new BoardsTable()
            let board = boardsTable.newEntity({
                title: form.querySelector('input[name="title"]').value,
                user_id: user_id
            })
            boardsTable.save(board)
        }

        setTimeout(function() {
            form.querySelector('input[name="title"]').classList.remove('is-invalid')
        }, 3000)

        form.querySelector('input[name="title"]').value = ''
        const boardsTable = new BoardsTable()

        return boardsTable.find().where({
            user_id: user_id
        }).all()
    },

    deleteBoard(id) {
        if (!id) throw Error('id is not valid')
        const boardsTable = new BoardsTable()

        let board = boardsTable.get(id)
        boardsTable.delete(board)
        return boardsTable.find().where({
            user_id: board.user_id
        }).all()
    },

    updateBoard(id, title) {
        if (!id) throw Error('id is not valid')
        if (!title) throw Error('title is not valid')
        const boardsTable = new BoardsTable()

        let board = boardsTable.get(id)
        board.title = title
        boardsTable.save(board)
        return boardsTable.find().where({
            user_id: board.user_id
        }).all()
    },

    addPost(input, board_id) {
        if (typeof input !== 'object' || input.tagName !== 'INPUT') throw Error('no input passed as argument')
        const postsTable = new PostsTable()

        if (!input) return false

        let post = postsTable.newEntity({
            title: input.value,
            board_id: board_id
        })
        postsTable.save(post);

        input.value = '';
        return postsTable.find().where({board_id}).all()
    },

    deletePost(id) {
        if (!id) throw Error('id is not valid')
        const postsTable = new PostsTable()

        const post = postsTable.get(id)
        postsTable.delete(post)
        return postsTable.find().where({
            board_id: post.board_id
        }).all()
    },

    register(form, callback) {
        if (typeof form !== 'object' || form.tagName !== 'FORM') throw Error('no form passed as argument')

        if (this.validate(form, ['name', 'username', 'password', 'confirm_password'])) {
            if (form.querySelector('input[name="password"]').value === form.querySelector('input[name="confirm_password"]').value) {
                const usersTable = new UsersTable()
                let user = usersTable.newEntity({
                    name: form.querySelector('input[name="name"]').value,
                    username: form.querySelector('input[name="username"]').value,
                    password: sha256(form.querySelector('input[name="password"]').value)
                })
                usersTable.save(user)
                callback()
            } else {
                this.error('Passwords do not match');
                form.querySelector('input[name="password"]').classList.add('is-invalid')
                form.querySelector('input[name="confirm_password"]').classList.add('is-invalid')
            }
        } else {
            this.error('Fields in red are mandatory')
        }
    },

    login(form, callback) {
        if (typeof form !== 'object' || form.tagName !== 'FORM') throw Error('no form passed as argument')

        if (this.validate(form, ['username', 'password'])) {
            let auth = this.findAuth(form.querySelector('input[name="username"]').value, sha256(form.querySelector('input[name="password"]').value))
            if (auth) {
                sessionStorage.setItem('auth', JSON.stringify(auth))
                this.auth = auth
                callback(auth)
            } else {
                this.error('Username or password are invalid')
                form.querySelector('input[name="username"]').classList.add('is-invalid')
                form.querySelector('input[name="password"]').classList.add('is-invalid')
            }
        } else {
            this.error('Fields in red are mandatory')
        }
    },

    logout(callback) {
        sessionStorage.removeItem('auth')
        this.auth = {}
        callback()
    },

    findAuth(username, password) {
        if (!username) throw Error('username is not valid')
        if (!password) throw Error('password is not valid')

        try {
            const usersTable = new UsersTable()
            return usersTable.find().where({
                username: username,
                password: password
            }).first()
        } catch (e) {
            return false
        }
    },

    isAuthenticated() {
        return this.auth && Object.keys(this.auth).length > 0
    },

    validate(form, inputs) {
        if (typeof form !== 'object' || form.tagName !== 'FORM') throw Error('no form passed as argument')
        if (!Array.isArray(inputs) || inputs.length < 1) throw Error('array is not valid')

        var result = 1;
        for (var i in inputs) {
            var input = form.querySelector('input[name="' + inputs[i] + '"]');
            if (!input.value) {
                input.classList.add('is-invalid');
                result = 0;
            } else {
                input.classList.remove('is-invalid');
            }
        }

        return result;
    },

    error(message) {
        if (!message) throw Error('message is not valid')

        alert(message)
    }
}

module.exports = LOGIC
