const Route = use('Route')

Route.get('/:userId', 'PostitController.index').prefix('postits')
Route.post('/', 'PostitController.create').prefix('postit').formats(['json']).validator('postit/PostIt')
Route.put('/:postitId', 'PostitController.update').prefix('postit').formats(['json']).validator('postit/PostIt')
Route.delete('/:postitId', 'PostitController.delete').prefix('postit')