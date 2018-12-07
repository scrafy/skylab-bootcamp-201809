'use strict'

const Factory = use("Factory")
const { test, trait } = use('Test/Suite')('Login User')
trait('Test/ApiClient')

test('Login should ok on correct data', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username,
        password: "1234"

    }).end()

    response.assertStatus(200)
    

})


test('Login should fails on incorrect credentials', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username,
        password: "12345"

    }).end()

    response.assertStatus(404)
    

})


test('Login should fails on empty username', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: "",
        password: "12345"

    }).end()

    response.assertStatus(422)
    

})


test('Login should fails on undefined username', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

       password: "12345"

    }).end()

    response.assertStatus(422)
    

})

test('Login should fails on empty password', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username,
        password: ""

    }).end()

    response.assertStatus(422)
    

})

test('Login should fails on undefined password', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username       

    }).end()

    response.assertStatus(422)
    

})

