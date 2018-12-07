'use strict'

const Factory = use("Factory")
const { test, trait } = use('Test/Suite')('Register User')
trait('Test/ApiClient')

test('Register user on correct data', async ({ assert, client }) => {

  const name = "test"
  const surname = "test"
  const email = "test@terra.es"
  const phone = "627206369"
  const username = "test"
  const password = "1234"

  const response = await client.post(`api/user`).send({

    name: name,
    surname: surname,
    email: email,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({

    status: "OK",
    error: null,
    validationErrors: null

  })

})

test('Fails register user on empty name', async ({ assert, client }) => {

  const name = ""
  const surname = "test"
  const email = "test@terra.es"
  const phone = "627206369"
  const username = "test"
  const password = "1234"

  const response = await client.post(`api/user`).send({

    name: name,
    surname: surname,
    email: email,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(422)
  response.assertJSONSubset({

    status: 422,
    data: null,
    error: "Exists validation errors",
    validationErrors: [{
      message: "The name field is required",
      field: "name",
      validation: "required"
    }
    ]

  })

})

test('Fails register user on undefined name', async ({ assert, client }) => {

    const name = ""
    const surname = "test"
    const email = "test@terra.es"
    const phone = "627206369"
    const username = "test"
    const password = "1234"

    const response = await client.post(`api/user`).send({

      surname: surname,
      email: email,
      phone: phone,
      username: username,
      password: password

    }).end()

    response.assertStatus(422)
    response.assertJSONSubset({

      status: 422,
      data: null,
      error: "Exists validation errors",
      validationErrors: [{
        message: "The name field is required",
        field: "name",
        validation: "required"
      }
      ]

    })

})

test('Fails register user on empty surname', async ({ assert, client }) => {

  const name = "name"
  const surname = ""
  const email = "test@terra.es"
  const phone = "627206369"
  const username = "test"
  const password = "1234"

  const response = await client.post(`api/user`).send({

    name: name,
    surname: surname,
    email: email,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(422)
  response.assertJSONSubset({

    status: 422,
    data: null,
    error: "Exists validation errors",
    validationErrors: [{
      message: "The surname field is required",
      field: "surname",
      validation: "required"
    }
    ]

  })

})

test('Fails register user on undefined surname', async ({ assert, client }) => {

  const name = "name"
  const surname = "test"
  const email = "test@terra.es"
  const phone = "627206369"
  const username = "test"
  const password = "1234"

  const response = await client.post(`api/user`).send({

    name: name,
    email: email,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(422)
  response.assertJSONSubset({

    status: 422,
    data: null,
    error: "Exists validation errors",
    validationErrors: [{
      message: "The surname field is required",
      field: "surname",
      validation: "required"
    }
    ]

  })

})

test('Fails register user on empty email', async ({ assert, client }) => {

  const name = "name"
  const surname = "surname"
  const email = ""
  const phone = "627206369"
  const username = "test"
  const password = "1234"

  const response = await client.post(`api/user`).send({

    name: name,
    surname: surname,
    email: email,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(422)
  response.assertJSONSubset({

    status: 422,
    data: null,
    error: "Exists validation errors",
    validationErrors: [{
      message: "The email field is required",
      field: "email",
      validation: "required"
    }
    ]

  })

})

test('Fails register user on undefined email', async ({ assert, client }) => {

  const name = "name"
  const surname = "test"
  const email = "test@terra.es"
  const phone = "627206369"
  const username = "test"
  const password = "1234"

  const response = await client.post(`api/user`).send({

    surname: surname,
    name: name,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(422)
  response.assertJSONSubset({

    status: 422,
    data: null,
    error: "Exists validation errors",
    validationErrors: [{
      message: "The email field is required",
      field: "email",
      validation: "required"
    }
    ]

  })

})

test('Fails register user on incorrect email format', async ({ assert, client }) => {

  const name = "name"
  const surname = "test"
  const email = "testterra.es"
  const phone = "627206369"
  const username = "test"
  const password = "1234"

  const response = await client.post(`api/user`).send({

    surname: surname,
    name: name,
    email: email,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(422)
  response.assertJSONSubset({

    status: 422,
    data: null,
    error: "Exists validation errors",
    validationErrors: [{
      message: "The email has not the correct format",
      field: "email",
      validation: "email"
    }
    ]

  })

})


test('Fails register user on using an existing email', async ({ assert, client }) => {

  const user = await Factory.model('App/Models/User').create()

  const name = "name"
  const surname = "test"
  const email = user.email
  const phone = "627206369"
  const username = "test"
  const password = "1234"

  const response = await client.post(`api/user`).send({

    surname: surname,
    name: name,
    email: email,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(422)
  response.assertJSONSubset({

    status: 422,
    data: null,
    error: "Exists validation errors",
    validationErrors: [{
      message: "Email address in use",
      field: "email",
      validation: "unique"
    }
    ]

  })

})

test('Fails register user on using a password with less of 4 characters', async ({ assert, client }) => {

  const name = "name"
  const surname = "test"
  const email = "test@terra.es"
  const phone = "627206369"
  const username = "test"
  const password = "123"

  const response = await client.post(`api/user`).send({

    surname: surname,
    name: name,
    email: email,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(422)
  response.assertJSONSubset({

    status: 422,
    data: null,
    error: "Exists validation errors",
    validationErrors: [{
      message: "The password field has to have four characters of minimun length",
      field: "password",
      validation: "min"
    }
    ]

  })

})


test('Fails register user on using a existing username', async ({ assert, client }) => {

  const user = await Factory.model('App/Models/User').create()

  const name = "name"
  const surname = "test"
  const email = "test@terra.es"
  const phone = "627206369"
  const username = user.username
  const password = "1234"

  const response = await client.post(`api/user`).send({

    surname: surname,
    name: name,
    email: email,
    phone: phone,
    username: username,
    password: password

  }).end()

  response.assertStatus(422)
  response.assertJSONSubset({

    status: 422,
    data: null,
    error: "Exists validation errors",
    validationErrors: [{
      message: "Exists an user with the same username",
      field: "username",
      validation: "unique"
    }
    ]

  })

})







