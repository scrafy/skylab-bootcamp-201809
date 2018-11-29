const Route = use('Route')

Route.get('/find/:farmId', 'FarmController.find').prefix('farm').middleware(['auth'])
Route.put('/:farmId', 'FarmController.update').prefix('farm').formats(['json']).middleware(['auth']).validator('farm/Farm')
Route.delete('/:farmId', 'FarmController.delete').prefix('farm').middleware(['auth'])
Route.post('', 'FarmController.create').prefix('farm').formats(['json']).middleware(['auth']).validator('farm/Farm')



