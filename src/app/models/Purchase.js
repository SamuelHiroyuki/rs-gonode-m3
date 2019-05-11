const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ad',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Purchase', PurchaseSchema)
