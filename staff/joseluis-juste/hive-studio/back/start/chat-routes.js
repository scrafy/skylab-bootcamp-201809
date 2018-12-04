const Route = use('Route')

Route.post('/:chatId', 'ChatController.storeMessage').prefix('chat').middleware(['auth'])
Route.get('/:chatId', 'ChatController.getMessages').prefix('chat').middleware(['auth'])

