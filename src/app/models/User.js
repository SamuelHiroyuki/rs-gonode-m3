const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
  return next()
})

UserSchema.methods.comparePassword = function (pass, cb) {
  return bcrypt.compare(pass, this.password)
}

module.exports = mongoose.model('User', UserSchema)
