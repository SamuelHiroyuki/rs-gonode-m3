const User = require('../models/User')

class SessionController {
  async create (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }

    if (!(await user.comparePassword(password))) {
      return res.status(400).json({
        error: 'Invalid password'
      })
    }

    return res.json({ user, token: User.generateToken(user._id) })
  }
}

module.exports = new SessionController()
