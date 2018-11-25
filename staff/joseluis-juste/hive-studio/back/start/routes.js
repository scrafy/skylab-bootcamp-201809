'use strict'

const Route = use('Route')

Route.group(() => {

    require('./user-routes')
    require('./farm-routes')
    require('./hive-routes')

}).prefix('api/')