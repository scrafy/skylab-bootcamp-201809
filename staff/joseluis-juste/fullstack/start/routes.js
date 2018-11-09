'use strict'

const Route = use('Route')

Route.group(() => {

    require('./user-routes')

}).prefix('api/')



