const Route = use('Route')

Route.delete('/:hiveId', 'HiveController.delete').prefix('hive').middleware(['auth'])
Route.post('', 'HiveController.create').prefix('hive').formats(['json']).middleware(['auth']).validator('hive/Hive')
Route.put('/:hiveId', 'HiveController.update').prefix('hive').formats(['json']).middleware(['auth']).validator('hive/Hive')
Route.get('/:hiveId([0-9]+)', 'HiveController.find').prefix('hive').formats(['json']).middleware(['auth'])
Route.post('/sensor', 'HiveController.getDataFromSensor').prefix('hive').formats(['json']).middleware(['auth'])
Route.get('/sensor', 'HiveController.getInfoForSensor').prefix('hive').formats(['json']).middleware(['auth'])
Route.patch('/:hiveId', 'HiveController.enableMonitor').prefix('hive').formats(['json']).middleware(['auth'])
