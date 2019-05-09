const routes = require('express').Router()

// Controllers
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
//

// Middlewares
const authMiddleware = require('./app/middlewares/auth')
//

routes.post('/tokens', SessionController.create)

routes.use(authMiddleware)

routes.post('/users', UserController.create)

module.exports = routes
