const routes = require('express').Router()

// Controllers
const Controllers = require('./app/controllers')
//

// Middlewares
const authMiddleware = require('./app/middlewares/auth')
//

routes.post('/tokens', Controllers.SessionController.create)

routes.use(authMiddleware)

// Users
routes.post('/users', Controllers.UserController.create)

// Ad
routes.get('/ads', Controllers.AdController.get)
routes.get('/ads/:id', Controllers.AdController.getById)
routes.post('/ads', Controllers.AdController.create)
routes.put('/ads/:id', Controllers.AdController.update)
routes.delete('/ads/:id', Controllers.AdController.delete)

module.exports = routes
