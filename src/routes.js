const routes = require('express').Router()

// Controllers
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
//

routes.post('/users', UserController.create)
routes.post('/tokens', SessionController.create)

module.exports = routes
