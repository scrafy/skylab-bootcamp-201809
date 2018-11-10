const Route = use('Route')

Route.get('/', 'UserController.index').prefix('users')
Route.get('/:id', 'UserController.find').prefix('user')
Route.post('/', 'UserController.create').prefix('user').formats(['json']).validator('user/CreateUser')
Route.post('/auth', 'UserController.login').prefix('user').formats(['json']).validator('user/AuthUser')//.middleware(['auth'])
Route.get('/logout', 'UserController.logout').prefix('user')
Route.put('/:id', 'UserController.update').prefix('user').formats(['json']).validator('user/UpdateUser')
Route.delete('/:id', 'UserController.delete').prefix('user')