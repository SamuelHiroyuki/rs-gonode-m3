const routes = require('express').Router()

// Controllers
const UserController = require('./app/controllers/UserController')
//

routes.post('/users', UserController.create)

module.exports = routes
