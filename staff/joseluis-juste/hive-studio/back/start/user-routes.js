const Route = use('Route')

Route.get('/getuserdata', 'UserController.getUserData').prefix('user').middleware(['auth'])
Route.get('/getprofileimg', 'UserController.getprofileImg').prefix('user').middleware(['auth'])
Route.post('/', 'UserController.create').prefix('user').formats(['json']).validator('user/CreateUser')
Route.post('/auth', 'UserController.login').prefix('user').formats(['json']).validator('user/AuthUser')
Route.put('', 'UserController.update').prefix('user').formats(['json']).middleware(['auth','getUserFromAuth']).validator('user/UpdateUser')
Route.post('/uploadimg', 'UserController.uploadImg').prefix('user').middleware(['auth'])
Route.post('/uploadimgregister', 'UserController.uploadImgRegister').prefix('user')
