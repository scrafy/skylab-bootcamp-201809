const Route = use('Route')

Route.delete('/:hiveId', 'HiveController.delete').prefix('hive').middleware(['auth'])
Route.post('', 'HiveController.create').prefix('hive').formats(['json']).middleware(['auth'])//.validator('farm/Farm')
Route.put('/:hiveId', 'HiveController.update').prefix('hive').formats(['json']).middleware(['auth'])//.validator('farm/Farm')
Route.get('/:hiveId', 'HiveController.find').prefix('hive').formats(['json']).middleware(['auth'])
Route.post('/sensor', 'HiveController.getDataFromSensor').prefix('hive').formats(['json'])//.middleware(['auth'])
