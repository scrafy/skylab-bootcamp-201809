const Route = use('Route')

Route.put('/collaborator/:postitId([0-9]+)/:collabId([0-9]+)', 'PostitController.addCollaborator').prefix('postit').middleware(['auth'])
Route.post('/', 'PostitController.create').prefix('postit').formats(['json']).validator('postit/PostIt').middleware(['auth'])
Route.put('/:postitId([0-9]+)', 'PostitController.update').prefix('postit').formats(['json']).validator('postit/PostIt').middleware(['auth'])
Route.get('/:postitId([0-9]+)', 'PostitController.find').prefix('postit').formats(['json']).middleware(['auth'])
Route.delete('/:postitId([0-9]+)', 'PostitController.delete').prefix('postit').middleware(['auth'])