const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret, ttl: expiresIn } = require('../../config/auth')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  user.password = await bcrypt.hash(user.password, 8)
})

UserSchema.methods = {
  comparePassword (pass) {
    return bcrypt.compare(pass, this.password)
  }
}

UserSchema.statics = {
  generateToken ({ _id }) {
    return jwt.sign({ _id }, secret, { expiresIn })
  }
}

module.exports = mongoose.model('User', UserSchema)
