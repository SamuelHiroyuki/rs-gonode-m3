const routes = require('express').Router()
const validate = require('express-validation')

const Validators = require('./app/validators')

// Controllers
const Controllers = require('./app/controllers')
//

// Middlewares
const authMiddleware = require('./app/middlewares/Auth')
//

routes.post(
  '/tokens',
  validate(Validators.Session),
  Controllers.SessionController.create
)

routes.use(authMiddleware)

// Users
routes.post(
  '/users',
  validate(Validators.User),
  Controllers.UserController.create
)

// Ad
routes.get('/ads', Controllers.AdController.get)
routes.get('/ads/:id', Controllers.AdController.getById)
routes.post('/ads', validate(Validators.Ad), Controllers.AdController.create)
routes.put('/ads/:id', validate(Validators.Ad), Controllers.AdController.update)
routes.delete('/ads/:id', Controllers.AdController.delete)

// Purchase
routes.post(
  '/purchases',
  validate(Validators.Purchase),
  Controllers.PurchaseController.create
)

module.exports = routes
