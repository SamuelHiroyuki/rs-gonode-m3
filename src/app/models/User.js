const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    password_hash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

UserSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  user.password_hash = await bcrypt.hash(user.password_hash, 8)
  return next()
})

UserSchema.methods.comparePassword = function (password, cb) {
  return bcrypt.compare(password, this.password_hash)
}

module.exports = mongoose.model('User', UserSchema)
