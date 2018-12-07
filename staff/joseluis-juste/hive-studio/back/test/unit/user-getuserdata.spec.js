'use strict'

const Factory = use("Factory")
const { test, trait } = use('Test/Suite')('GetUserData User')
trait('Test/ApiClient')

test('Get user data using a correct token', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username,
        password: "1234"

    }).end()

    response.assertStatus(200)

    let { data: { token } } = JSON.parse(response.text)

    response = await client.get(`api/user/getuserdata`).header("Authorization", `Bearer ${token}`).send().end()

    response.assertStatus(200)
    response.assertJSONSubset({

        status: "OK"      

    })

})

test('Get user data should fails using an incorrect token', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username,
        password: "1234"

    }).end()

    response.assertStatus(200)

    let { data: { token } } = JSON.parse(response.text)

    response = await client.get(`api/user/getuserdata`).header("Authorization", `Bearer ${token}88`).send().end()

    response.assertStatus(401)
  

})

