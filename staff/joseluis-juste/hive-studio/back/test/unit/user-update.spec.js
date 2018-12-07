'use strict'

const Factory = use("Factory")
const { test, trait } = use('Test/Suite')('Update User')
trait('Test/ApiClient')

test('Update user on correct data', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username,
        password: "1234"

    }).end()

    response.assertStatus(200)

    let { data: { token } } = JSON.parse(response.text)

    response = await client.put(`api/user`).header("Authorization", `Bearer ${token}`).send({

        name: "modified",
        surname: "modified",
        email: "modified@terra.es",
        phone: "modified",
        username: "modified",
        password: "1234"

    }).end()

    response.assertStatus(200)
    response.assertJSON({

        status: "OK",
        data: null,
        error: null,
        validationErrors: null

    })

})

test('Update user should fails on incorrect token', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username,
        password: "1234"

    }).end()

    response.assertStatus(200)

    let { data: { token } } = JSON.parse(response.text)

    response = await client.put(`api/user`).header("Authorization", `Bearer ${token}88`).send({

        name: "modified",
        surname: "modified",
        email: "modified@terra.es",
        phone: "modified",
        username: "modified",
        password: "1234"

    }).end()

    response.assertStatus(401)

})

test('Update user should fails when newpassword is sent and it does not match with confirmpassword', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username,
        password: "1234"

    }).end()

    response.assertStatus(200)

    let { data: { token } } = JSON.parse(response.text)

    response = await client.put(`api/user`).header("Authorization", `Bearer ${token}`).send({
        
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        password: "1234",
        newpassword: "12345"

    }).end()

    response.assertStatus(422)
    response.assertJSONSubset({

        status: 422,
        data: null,
        error: "Exists validation errors",
        validationErrors: [{
            message: "The newpassword does not match with confirmpassword value",
            field: "newpassword",
            validation: "equalTo"
        }
        ]

    })

})


test('Update user should fails when password is incorrect', async ({ assert, client }) => {

    const user = await Factory.model('App/Models/User').create()

    let response = await client.post(`api/user/auth`).send({

        username: user.username,
        password: "1234"

    }).end()

    response.assertStatus(200)

    let { data: { token } } = JSON.parse(response.text)

    response = await client.put(`api/user`).header("Authorization", `Bearer ${token}`).send({
        
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        password: "12345"
       

    }).end()

    response.assertStatus(422)
    response.assertJSONSubset({

        status: 422,
        data: null,
        error: "Exists validation errors",
        validationErrors: [{
            message: "The user´s password is incorrect",
            field: "password",
            validation: "passwordCorrect"
        }
        ]

    })

})