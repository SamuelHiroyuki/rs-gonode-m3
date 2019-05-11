const routes = require('express').Router()
const validate = require('express-validation')
const handle = require('express-async-handler')

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
  handle(Controllers.SessionController.create)
)

routes.use(authMiddleware)

// Users
routes.post(
  '/users',
  validate(Validators.User),
  handle(Controllers.UserController.create)
)

// Ad
routes.get('/ads', handle(Controllers.AdController.get))
routes.get('/ads/:id', handle(Controllers.AdController.getById))
routes.post(
  '/ads',
  validate(Validators.Ad),
  handle(Controllers.AdController.create)
)
routes.put(
  '/ads/:id',
  validate(Validators.Ad),
  handle(Controllers.AdController.update)
)
routes.delete('/ads/:id', handle(Controllers.AdController.delete))

// Purchase
routes.post(
  '/purchases',
  validate(Validators.Purchase),
  handle(Controllers.PurchaseController.create)
)

module.exports = routes
