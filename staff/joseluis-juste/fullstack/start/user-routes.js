const Route = use('Route')

Route.get('/', 'UserController.index').prefix('users')
Route.get('/:id', 'UserController.find').prefix('user')
Route.post('/', 'UserController.create').prefix('user').formats(['json']).validator('user/CreateUser')
Route.post('/auth', 'UserController.login').prefix('user').formats(['json']).validator('user/AuthUser')
Route.get('/logout', 'UserController.logout').prefix('user')
Route.put('/', () => 'Hello Adonis').prefix('user').formats(['json'])
Route.delete('/:id', 'UserController.delete').prefix('user')